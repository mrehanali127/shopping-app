import Product from "../../models/product";

export const DELETE_PRODUCT='DELETE_PRODUCT';
export const CREATE_PRODUCT='CREATE_PRODUCT';
export const UPDATE_PRODUCT='UPDATE_PRODUCT';
export const SET_PRODUCTS='SET_PRODUCTS';


export const fetchProducts=()=>{
    return async dispatch=>{
        const response=await fetch('https://shop-app-b27e4-default-rtdb.firebaseio.com/products.json');
        const resData=await response.json();
        const loadedProducts=[];
        for(const key in resData){
            loadedProducts.push(
                new Product(key,'u1',resData[key].title,resData[key].imageUrl,resData[key].description,resData[key].price)
            )
        }
        dispatch({type:SET_PRODUCTS,products:loadedProducts});
    }
}

export const deleteProduct=productId=>{
    return{
        type:DELETE_PRODUCT,
        pid:productId
    }
}

export const createProduct=(title,description,imageUrl,price)=>{
    // dispatch is a function
    return async dispatch=>{
        //any async code
        const response=await fetch('https://shop-app-b27e4-default-rtdb.firebaseio.com/products.json',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                title,
                description,
                imageUrl,
                price
            })
        });

        const resData=await response.json();
        console.log(resData);

        dispatch({
        type:CREATE_PRODUCT,
        productData:{
            is:resData.name,
            title:title,
            description:description,
            imageUrl,
            price
        }
         
        });
    }
}


export const updateProduct=(id,title,description,imageUrl,price)=>{
    return{
        type:UPDATE_PRODUCT,
        pid:id,
        productData:{
            title:title,
            description:description,
            imageUrl,
            price
        }
    }
}