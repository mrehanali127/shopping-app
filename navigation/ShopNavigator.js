import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";

import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrderScreen from "../screens/shop/OrdersScreen";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import Colors from "../constants/Colors";


const ProductsNavigator=createStackNavigator({
    ProductsOverview:ProductOverviewScreen,
    ProductDetail:ProductDetailScreen,
    Cart:CartScreen
},{
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:Colors.primaryColor
        },
        headerTintColor:'white'
    }
});

const OrdersNavigator=createStackNavigator({
    Orders:OrderScreen
},{
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:Colors.primaryColor
        },
        headerTintColor:'white'
    }
});

const AdminNavigator=createStackNavigator({
    UserProducts:UserProductsScreen,
    EditProduct:EditProductScreen
},{
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:Colors.primaryColor
        },
        headerTintColor:'white'
    }
});


const ShopNavigator=createDrawerNavigator({
    Products:ProductsNavigator,
    Orders:OrdersNavigator,
    Admin:AdminNavigator
},{
    contentOptions:{
        activeTintColor:Colors.primaryColor
    }
})

export default createAppContainer(ShopNavigator);