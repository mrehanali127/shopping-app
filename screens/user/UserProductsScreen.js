import React from "react";
import {View,Text,StyleSheet,FlatList} from 'react-native';
import ProductItem from '../../components/ProductItem';
import { HeaderButtons,Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/HeaderButton";
import { useSelector } from "react-redux";

const UserProductsScreen=props=>{

    const userProducts=useSelector(state=>state.products.userProducts)
    return<FlatList 
    data={userProducts}
    renderItem={itemData=>
        (
            <ProductItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onViewDetail={()=>{}}
            onAddToCart={()=>{}}
            />
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
        )
    }
}



export default UserProductsScreen;