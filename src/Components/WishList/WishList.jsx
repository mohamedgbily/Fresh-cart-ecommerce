import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Helmet } from 'react-helmet'
import { wishListContext } from '../WishListContext/WishListContext'
import toast from 'react-hot-toast'
import { BallTriangle } from 'react-loader-spinner'
import axios from 'axios'
import { cartContext } from '../../Context/CartContext'
import { useNavigate } from 'react-router-dom'

export default function WishList() {
   const { allProductsWishList , getUserWishList , deleteProductFromWishList ,idWishArry , setIdWishArry} = useContext(wishListContext)
    const { addProductToMycart } = useContext(cartContext);
  const [allWishList, setAllWishList] = useState(null)

const navFromWish = useNavigate();
//------------------------------
async function addProductToCartFromWishListPage(id){
  const res = await addProductToMycart(id);
  if(res.status === 'success'){
    // console.log('Product add successfuly to your cart' , res);
    toast.success(' prooduct add successfuly.....' , { duration: 1500 , position: 'top-center' ,style:{backgroundColor: 'green' ,color: 'white'} })
    setTimeout(() => {
      deleteProductFromWishList(id);
      getLokedUserWishList(id);
    }, 2500);
  }
  else{
    toast.error(' error occurred....' , { duration: 1500 , position: 'top-center' ,style:{backgroundColor: 'red' ,color: 'white'} })
  }
 }

//---------------------get loged user product wishlist------------
function getLokedUserWishList(){
axios.get( `https://ecommerce.routemisr.com/api/v1/wishlist` , { headers: { token: localStorage.getItem('tkn') } } )
.then((res)=>{
// console.log( 'wishpage res' ,res.data);
setAllWishList(res.data.data);

})
.catch((err)=>{
  // console.log('wishpage err' ,err);
})

}

useEffect(()=>{


  getLokedUserWishList();
},[])

//--------------------------------------------------
async function callDeleteProductFromWhisList(id){
  const res = await deleteProductFromWishList(id); 
  if(res){
    console.log(res);
    toast.success('product deleted successfuly.....' , {position: 'top-center' ,style:{backgroundColor: 'green' ,color: 'white'}})
  getLokedUserWishList()
  setIdWishArry( allProductsWishList?.map((ele)=>ele.id) )
  }
  else{
    toast.error('An error occurred.......' ,{position: 'top-center' ,style:{backgroundColor: 'red' ,color: 'white'}})
  }
}

if(allWishList == 0 ){
  setTimeout(() => {
    navFromWish( '/products' );
  }, 1500);
}
//  
if( !allWishList ){

  return <div className="d-flex justify-content-center align-items-center bg-primary bg-opacity-50 vh-100">
      
  <BallTriangle
   height={100}
   width={100}
   radius={5}
   color="#4fa94d"
   ariaLabel="ball-triangle-loading"
   wrapperStyle={{}}
   wrapperClass=""
   visible={true}
   />
  
  
  
   </div> 
  
  
  }

  return <>
   <Helmet>
    <title>WishList</title>
  </Helmet>


  { allWishList.length ? <div className="container my-bg pt-3 my-5">
   <div className="d-flex justify-content-between align-items-center ">
    <div> <h2>My Wish List</h2>
   </div>
   </div>
    
   { allWishList.map( (product ,idx)=>   <div key={idx} className="row mb-1 align-items-center border-1 border-bottom border-dark-subtle  py-4">
    <div className="col-md-2">
      <figure>
        <img className='w-100' src={product.imageCover} alt={product.title} />
      </figure>
    </div>
    <div className="col-md-8">
      <article>
        <h5>{product.title}</h5>
        <h6 className='text-main'>Price: {product.price}</h6>
        {/* <p>ID: { product.product.id }</p> */}
        <div role='button'onClick={(id)=> callDeleteProductFromWhisList(product.id)}>
          <i className='fa-solid fa-trash text-danger'></i> <span className='text-danger'>Remove</span>
        </div>
      </article>
    </div>
    <div className="col-md-2">
      <div className="d-flex justify-content-between clearfix align-items-center ">
      <button onClick={(id)=> addProductToCartFromWishListPage(product.id) } className='btn btn-outline-success'>add to cart </button>
      <span>{product.count}</span>
      
      </div>
     
    </div>
   </div> ) }
   
    
   </div> : <div className='vh-100'>
     <div className="container">
      <div className='my-bg mt-5 py-5 text-center rounded-2 text-danger'>
        <h2>Cart Shop</h2>
        <h3>your wish list is empty</h3>
      </div>
     </div>
   </div> }


  </>
}
