import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";
import Colors from "../constants/Colors";

const ProductsNavigator=createStackNavigator({
    ProductsOverview:ProductOverviewScreen
},{
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:Colors.primaryColor
        },
        headerTintColor:'white'
    }
});

export default createAppContainer(ProductsNavigator);