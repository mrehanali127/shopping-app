import React,{useState,useEffect,useCallback,useReducer}  from "react";
import {View,Text,ScrollView,TextInput,StyleSheet,Alert,KeyboardAvoidingView} from 'react-native';
import { HeaderButtons,Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/HeaderButton";
import { useSelector,useDispatch } from "react-redux";
import * as productActions from '../../store/actions/products';

const FORM_INPUT_UPDATE='UPDATE';

//create UseReducer
const formReducer=(state,action)=>{
    if(action.type===FORM_INPUT_UPDATE){
        const updatedValues={
            ...state.inputValues,
            [action.input]:action.value
        };
        const updatedValidities={
            ...state.inputValidities,
            [action.input]:action.isValid
        };

        let updatedFormIsValid=true;
        for(const key in updatedValidities){
            formIsValid=updatedFormIsValid && updatedValidities[key];
        }
        
        return{
            formIsValid:updatedFormIsValid,
            inputValidities:updatedValidities,
            inputValues:updatedValues
        }

    }
    return state;
}

const EditProductScreen=props=>{
    const dispatch=useDispatch();

    // For Edit Mode
    const prodId=props.navigation.getParam('productId');
   const editedProduct=useSelector(state=>
    state.products.userProducts.find(prod=>prod.id===prodId)
    );

    const [formState,dispatchFormState]=useReducer(formReducer,{
        inputValues:{
            title:editedProduct ? editedProduct.title : '',
            imageUrl:editedProduct ? editedProduct.imageUrl : '',
            price:editedProduct ? editedProduct.price : '',
            description:editedProduct ? editedProduct.description : ''
        },
        inputValidities:{
            title:editedProduct?true:false,
            imageUrl:editedProduct?true:false,
            price:editedProduct?true:false,
            description:editedProduct?true:false,

        },
        formIsValid:editedProduct?true:false

    })

    
    const [titleIsValid,setTitleIsValid]=useState(false);
    
    const submitHandler=useCallback(()=>{
        if(!formState.formIsValid){
            Alert.alert('Wrong Input','Please check the errors in the form',[{text:'OK'}])
            return;
        }
         //console.log('Submitting');
         if(editedProduct){
            dispatch(productActions.updateProduct(
                prodId,
                formState.inputValues.title,
                formState.inputValues.description,
                formState.inputValues.imageUrl,
                +formState.inputValues.price
            ))
         }
         else{
             dispatch(productActions.createProduct(
                formState.inputValues.title,
                formState.inputValues.description, 
                formState.inputValues.imageUrl,
                +formState.inputValues.price
             ))
         }
         console.log("Operation Finished");
         props.navigation.goBack(); 
        
    },[dispatch,prodId,formState]); 

    useEffect(()=>{
        props.navigation.setParams({submit:submitHandler});
    },[submitHandler]);

    const textChangeHandler=(inputIdentifier,text)=>{
        let isValid=false;
        if(text.trim().length>0){
           isValid=true;
        }
      dispatchFormState({
          type:FORM_INPUT_UPDATE,
          value:text,
          isValid:isValid,
          input:inputIdentifier
        });
    }

    return(
        
        <ScrollView>
        <View style={styles.form}>
        <View style={styles.formControl}>
            <Text style={styles.label}>Title</Text>
            <TextInput style={styles.input}
            value={formState.inputValues.title}
            onChangeText={textChangeHandler.bind(this,'title')}
            />
        {!formState.inputValidities.title && <Text>Please enter a valid title!</Text>}
        </View>
        <View style={styles.formControl}>
            <Text style={styles.label}>Image URL</Text>
            <TextInput style={styles.input}
            value={formState.inputValues.imageUrl}
            onChangeText={textChangeHandler.bind(this,'imageUrl')}/>
        </View>
        <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput style={styles.input}  
            value={formState.inputValues.price}

            onChangeText={textChangeHandler.bind(this,'price')}/>
        </View>
        <View style={styles.formControl}>
            <Text style={styles.label}>Description</Text>
            <TextInput style={styles.input}
            value={formState.inputValues.description}

            onChangeText={textChangeHandler.bind(this,'description')}/>
        </View>
        </View> 
        </ScrollView>
       
    )
}

EditProductScreen.navigationOptions=navData=>{
    const submitFn=navData.navigation.getParam('submit');
    return{
        headerTitle:navData.navigation.getParam('productId')
        ?'Edit Product':'Add Product',
        headerRight:(
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                title="Save"
                iconName={"md-checkmark"}
                onPress={submitFn}
                />
            </HeaderButtons>
        )

        
    }
}

const styles=StyleSheet.create({
    form:{
        margin:20,

    },
    formControl:{
        width:'100%'
    },
    label:{
        marginVertical:8

    },
    input:{
        paddingHorizontal:2,
        paddingVertical:5,
        borderBottomColor:'#ccc',
        borderBottomWidth:1

    }

})

export default EditProductScreen;