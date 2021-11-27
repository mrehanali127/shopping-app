import React from "react";
import { FlatList,Text } from "react-native";
import { useSelector} from "react-redux";
import ProductItem from "../../components/ProductItem";

const ProductOverviewScreen=props=>{
    
    const productsData=useSelector(state=>state.products.availableProducts);

 return(
     <FlatList data={productsData}
     renderItem={itemData=><ProductItem
        image={itemData.item.imageUrl}
        title={itemData.item.title}
        price={itemData.item.price}
        onViewDetail={()=>{}} 
        onAddToCart={()=>{}}/>}/>
 )
}

ProductOverviewScreen.navigationOptions={
    headerTitle:'All Products'
}

export default ProductOverviewScreen;