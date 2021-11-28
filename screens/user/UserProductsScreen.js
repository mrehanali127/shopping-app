import React from "react";
import {View,Text,StyleSheet,Button,FlatList} from 'react-native';
import ProductItem from '../../components/ProductItem';
import { HeaderButtons,Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/HeaderButton";
import { useSelector,useDispatch } from "react-redux";
import * as productsActions from '../../store/actions/products';
import Colors from "../../constants/Colors";

const UserProductsScreen=props=>{
    const dispatch=useDispatch();
    const userProducts=useSelector(state=>state.products.userProducts)

    const editProductHandler=id=>{
        props.navigation.navigate('EditProduct',{productId:id});
    }

    return<FlatList 
    data={userProducts}
    renderItem={itemData=>
        (
            <ProductItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onSelect={()=>editProductHandler(itemData.item.id)}
            >
                 <Button color={Colors.primaryColor} 
            title="Edit" 
            onPress={()=>editProductHandler(itemData.item.id)}/>
            <Button color={Colors.primaryColor} 
            title="Delete " 
            onPress={()=>{
                dispatch(productsActions.deleteProduct(itemData.item.id)); 
            }}/>
            </ProductItem>
        )
    }
    />
}

UserProductsScreen.navigationOptions=navData=>{
    return{
        headerTitle:'Your Products',
        headerLeft:(
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                title="Menu"
                iconName={"md-menu"}
                onPress={()=>{
                    navData.navigation.toggleDrawer();
                }}
                />
            </HeaderButtons>
        ),
        headerRight:(
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                title="Add"
                iconName={"md-create"}
                onPress={()=>{
                    navData.navigation.navigate('EditProduct');
                }}
                />
            </HeaderButtons>
        )
    }
}



export default UserProductsScreen;