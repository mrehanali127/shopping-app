import React,{useState} from "react";
import {View,Text,Button,StyleSheet} from 'react-native';
import CartItemForCart from './CartItemForCart';
import Colors from '../constants/Colors';
import { color } from "react-native-reanimated";

const OrderItem=props=>{
    const [showDetails,setShowDetails]=useState(false);
    return(
        <View style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button color={Colors.primaryColor} 
            title={showDetails ? "Hide Details" : "Show Details" }
            onPress={()=>{
                setShowDetails(prevState=>!prevState);
            }}
            />
        {/* If show details state is true then render this*/}
        {showDetails && <View style={styles.detailItems}>
            {props.items.map(cartItem=>
            <CartItemForCart 
            key={cartItem.productId}
            quantity={cartItem.quantity}
            amount={cartItem.sum}
            title={cartItem.productTitle}

            />
            )}
            </View>}
        </View>
    )
}

const styles=StyleSheet.create({

    orderItem:{
        shadowColor:'black',
        shadowOpacity:0.26,
        shadowOffset:{width:0,height:2},
        shadowRadius:8,
        elevation:5,
        borderRadius:10,
        backgroundColor:'white',
        margin:20,
        padding:10,
        alignItems:'center'
    },
    summary:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%',
        margin:15
    },
    totalAmount:{
        fontSize:16
    },
    date:{
        fontSize:16,
        color:'#888'
    },
    detailItems:{
         width:'100%'
    }



});

export default OrderItem;