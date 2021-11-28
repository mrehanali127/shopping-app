import React from "react";
import { FlatList,Text } from "react-native";
import { useSelector,useDispatch} from "react-redux";
import ProductItem from "../../components/ProductItem";
import { HeaderButtons,Item } from "react-navigation-header-buttons";
import * as cartActions from '../../store/actions/cart';
import CustomHeaderButton from "../../components/HeaderButton";

const ProductOverviewScreen=props=>{
    
    const productsData=useSelector(state=>state.products.availableProducts);
    const dispatch=useDispatch();

 return(
     <FlatList data={productsData}
     renderItem={itemData=><ProductItem
        image={itemData.item.imageUrl}
        title={itemData.item.title}
        price={itemData.item.price}
        onViewDetail={()=>{
            props.navigation.navigate('ProductDetail',{
                productId:itemData.item.id,
                productTitle:itemData.item.title
            });
        }} 
        onAddToCart={()=>{
            dispatch(cartActions.addToCart(itemData.item));
        }}/>}/>
 )
}

ProductOverviewScreen.navigationOptions=navData=>{
    return{
    headerTitle:'All Products',
    headerRight:(<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title="cart" iconName={'md-cart'} onPress={()=>{
            navData.navigation.navigate('Cart');
        }} />
    </HeaderButtons>),
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

export default ProductOverviewScreen;