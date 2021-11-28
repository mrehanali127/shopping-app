import React from "react";
import {View,FlatList,Text} from 'react-native';
import { HeaderButtons,Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";
import CustomHeaderButton from "../../components/HeaderButton";

const OrderScreen=props=>{
    const orders=useSelector(state=>state.orders.orders);

    return(
        <FlatList
        data={orders}
        renderItem={itemData=><Text>{itemData.item.totalAmount}</Text>}
        />
    )
};

OrderScreen.navigationOptions=navData=>{
    return{
    headerTitle:'Your Orders',
    headerLeft:(
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
            title="Menu"
            iconName={'md-menu'}
            onPress={()=>{
                navData.navigation.toggleDrawer();
            }}
            />
        </HeaderButtons>
    )
    }
}

export default OrderScreen;