import axios from 'axios';
import React, { createContext, useState } from 'react'
import { useContext } from 'react';
import { authContext } from './../../Context/AuthStore';
import { useEffect } from 'react';

export const wishListContext =  createContext();

export default function WishListContextProvider( {children} ) {
  const [idWishArry, setIdWishArry] = useState(null)
  const {token} = useContext( authContext );
  const [allProductsWishList, setAllProductsWishList] = useState(null);

  const [wishListProId, setWishListProId] = useState(null);
  
  async function addProductToWishList(productId){
    try{
    const { data } = await axios.post( `https://ecommerce.routemisr.com/api/v1/wishlist` , {
      "productId": productId
    } ,{ headers: {token: localStorage.getItem('tkn') }} )
  
    console.log(data);
    getUserWishList()
    return data
   
  }
    catch(err){
  
  
      console.log( 'in case of error' , err);
      return err
    }
  
  
   }
   //---------------function to get product wishlist---------

   async function getUserWishList(){

   const res = await axios.get( `https://ecommerce.routemisr.com/api/v1/wishlist` ,{ headers: { token: localStorage.getItem('tkn') } } )
    .then( ( res ) => {
  //  console.log( 'wishlist result :' ,res.data.data);
   setAllProductsWishList(res.data.data);
   setIdWishArry(allProductsWishList?.map((elem)=>elem.id))
  
    } )
    .catch( (err) => {
//  console.log( 'wishlist err :' ,err);
 
    } )
  }


  //-------------------getlocked user wishlist-------------

// function getLokedUserID(){
// axios.get( `https://ecommerce.routemisr.com/api/v1/wishlist` , { headers: { token: localStorage.getItem('tkn') } } )
// .then((res)=>{
// // console.log( 'wishpage res' ,res.data);

// setWishListProId( res.data.data )
// console.log( 'kareem' , wishListProId );
// })
// .catch((err)=>{
//   // console.log('wishpage err' ,err);
// })

// }

  //--------------------------

  //func to delete specifec -product-------------
 async function deleteProductFromWishList(id){

  const res = await axios.delete( `https://ecommerce.routemisr.com/api/v1/wishlist/${id}` ,{ headers:{ token : localStorage.getItem('tkn')} })
   .then((res)=>{
    getUserWishList();
   setAllProductsWishList(res.data.data);
  
   setIdWishArry(allProductsWishList?.map((elem)=>elem.id))
 
   return true
   })
  .catch((err)=>{
    return false
  })
 return res
  }
 
 useEffect(()=>{
  setIdWishArry(allProductsWishList?.map((elem)=>elem.id))
 },[allProductsWishList])
 
 useEffect(()=>{
 
   getUserWishList();
   
  
 
 },[token])
 //-------------------------------------------------------------------

  return   <wishListContext.Provider value={{  addProductToWishList , idWishArry ,setIdWishArry,allProductsWishList ,getUserWishList ,deleteProductFromWishList ,wishListProId  }} >
  {  children }  
  
  </wishListContext.Provider>
}
