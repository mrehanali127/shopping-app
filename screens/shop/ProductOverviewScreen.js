import React from "react";
import { FlatList,Text,Button } from "react-native";
import { useSelector,useDispatch} from "react-redux";
import ProductItem from "../../components/ProductItem";
import { HeaderButtons,Item } from "react-navigation-header-buttons";
import * as cartActions from '../../store/actions/cart';
import CustomHeaderButton from "../../components/HeaderButton";
import Colors from "../../constants/Colors";


const ProductOverviewScreen=props=>{
    
    const productsData=useSelector(state=>state.products.availableProducts);
    const dispatch=useDispatch();

    const selectItemHandler=(id,title)=>{
        props.navigation.navigate('ProductDetail',{
            productId:id,
            productTitle:title
        });

    }

 return(
     <FlatList data={productsData}
     renderItem={itemData=><ProductItem
        image={itemData.item.imageUrl}
        title={itemData.item.title}
        price={itemData.item.price}
        onSelect={()=>{
            selectItemHandler(itemData.item.id,itemData.item.title);
        }} 
        onAddToCart={()=>{
            dispatch(cartActions.addToCart(itemData.item));
        }}>
            <Button color={Colors.primaryColor} 
            title="View Details" 
            onPress={()=>{
                selectItemHandler(itemData.item.id,itemData.item.title);
            }}/>
            <Button color={Colors.primaryColor} 
            title="Add To Cart" 
            onPress={()=>{
                dispatch(cartActions.addToCart(itemData.item));

            }}/>
        </ProductItem>}/>
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