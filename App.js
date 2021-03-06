import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore,combineReducers,applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import ordersReducer from './store/reducers/orders';
import ShopNavigator from './navigation/ShopNavigator';
const rootReducer=combineReducers({
  products:productsReducer,
  cart:cartReducer,
  orders:ordersReducer
});

const store=createStore(rootReducer,applyMiddleware(ReduxThunk));

export default function App() {
  return (
   <Provider store={store}>
     <ShopNavigator />
   </Provider>
  );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
