import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { authContext } from './AuthStore';


 export const cartContext =  createContext();


export default function CartContextProvider( { children } ) {
 const {token} = useContext( authContext );
  //variables states
  const [allProducts, setAllProducts] = useState([]);
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [totalCartPrice, setTolCartPrice] = useState(0);
  const [cartIdNum, setCartIdNum] = useState(null)
  

 async function addProductToMycart(productId){
  try{
  const { data } = await axios.post( `https://ecommerce.routemisr.com/api/v1/cart` , {
    "productId": productId
  } ,{ headers: {token: localStorage.getItem('tkn') }} )
  getUserCart() 
  console.log(data);
  return data
}
  catch(err){


    console.log( 'in case of error' , err);
    return err
  }


 }

//---------funce get cart-------------
 function getUserCart(){

   axios.get( `https://ecommerce.routemisr.com/api/v1/cart` ,{ headers: { token: localStorage.getItem('tkn') } } )
   .then( ( res ) => {
  console.log( 'cart result :' ,res.data);
  setAllProducts(res.data.data.products);
  setNumOfCartItems(res.data.numOfCartItems);
  setTolCartPrice( res.data.data.totalCartPrice );
  setCartIdNum(res.data.data._id)
  localStorage.setItem( 'userId' , res.data.data.cartOwner )
   } )
   .catch( (err) => {
console.log( 'cart err :' ,err);

   } )
 }


useEffect(()=>{

  getUserCart()



},[token])


//-------------function update cart------
async function updateCountCart( id ,newCount ){
 const flage = await axios.put( `https://ecommerce.routemisr.com/api/v1/cart/${id}` , { "count": newCount } , { headers: {token : localStorage.getItem( 'tkn' )}  })
  .then( (res)=>{
    console.log(  'updatecount' ,res);
    setAllProducts(res.data.data.products);
    setNumOfCartItems(res.data.numOfCartItems);
    setTolCartPrice(res.data.data.totalCartPrice);
    return true
  } )
  .catch( (err)=> {
    console.log( 'updatcarterr',err);
    return false
  } )

  return flage
 }
//func to delete specifec -product-------------
 async function deleteProductFromCart(id){

 const res = await axios.delete( `https://ecommerce.routemisr.com/api/v1/cart/${id}` ,{ headers:{ token : localStorage.getItem('tkn')} })
  .then((res)=>{
  setAllProducts(res.data.data.products);
  setNumOfCartItems(res.data.numOfCartItems);
  setTolCartPrice(res.data.data.totalCartPrice);
  return true
  })
 .catch((err)=>{
   return false
 })
return res
 }


 //function clear cart-------------------
 async function clearCart(){

  const res = await axios.delete( `https://ecommerce.routemisr.com/api/v1/cart` ,{ headers:{ token : localStorage.getItem('tkn')} })
   .then((res)=>{
    console.log(res.data);
    setAllProducts([]);
   setNumOfCartItems(0);
   setTolCartPrice(0);
   return true ;
   })
  .catch((err)=>{
    return false;
  })
 return res;
  }
 


  return <cartContext.Provider value={{ addProductToMycart, allProducts ,totalCartPrice , numOfCartItems , updateCountCart , getUserCart ,deleteProductFromCart ,clearCart ,cartIdNum }} >
  {  children }  
  
  </cartContext.Provider>
}
