import React, { useContext } from 'react'
import { cartContext } from '../../Context/CartContext'
import { BallTriangle } from 'react-loader-spinner';
import { toast } from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';


export default function Cart() {
const navigate = useNavigate();
 const { allProducts ,totalCartPrice , updateCountCart ,deleteProductFromCart ,clearCart} = useContext( cartContext );
 console.log(allProducts);
//loading screen
if( !allProducts ){

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

//------------------update call func----------------------
async function callMyUpdateCountFunc( id ,newCount ){
// id ,newCount
  const res = await updateCountCart( id ,newCount );
  if( res ){
    toast.success( 'Product updated successfully..' ,{ position: 'top-center' ,style:{backgroundColor: 'green' ,color: 'white'}});
  }
  else{
    toast.error( 'Error has been occurred...' ,{ position: 'top-center',style:{backgroundColor: 'red' ,color: 'white'}  });
  }
}
async function callDeleteProduct(id){
    const res = await deleteProductFromCart(id); 
    if(res){
      toast.success('product removed successfuly.....' , {position: 'top-center' ,style:{backgroundColor: 'green' ,color: 'white'}})
    }
    else{
      toast.error('An error occurred.......',{position: 'top-center' ,style:{backgroundColor: 'red' ,color: 'white'}})
    }
}
///clear call func-------

async function callClearCart(){
    const res = await clearCart(); 
    setTimeout(function(){
      navigate('/products')
    },2000)
    
    if(res){
      toast.success('cart has been cleard.....' , {position: 'top-center' ,style:{backgroundColor: 'green' ,color: 'white'}})
    
    }
    else{
      toast.error('An error occurred.......' , {position: 'top-center' ,style:{backgroundColor: 'red' ,color: 'white'}})
    
    }
}


  return <>

<Helmet>
  <title>UserCart</title>
 </Helmet>

  { allProducts.length ? <div className="container my-bg pt-3 ">
   <div className="d-flex justify-content-between align-items-center ">
    <div> <h2>Shop Cart</h2>
   <h4 className='text-main'>Total Cart Price : { totalCartPrice }</h4>
   </div>
    <Link to='/payment'><button className='btn btn-outline-success'>My Payment</button></Link>
   </div>
    
   { allProducts.map( (product ,idx)=>   <div key={idx} className="row mb-1 align-items-center border-1 border-bottom border-dark-subtle py-4">
    <div className="col-md-2">
      <figure>
        <img className='w-100' src={product.product.imageCover} alt={product.product.title} />
      </figure>
    </div>
    <div className="col-md-8">
      <article>
        <h5>{product.product.title}</h5>
        <h6 className='text-main'>Price: {product.price}</h6>
        {/* <p>ID: { product.product.id }</p> */}
        <div role='button' onClick={()=> callDeleteProduct(product.product.id)}>
          <i className='fa-solid fa-trash text-danger'></i> <span className='text-danger'>Remove</span>
        </div>
      </article>
    </div>
    <div className="col-md-2">
      <div className="d-flex justify-content-between clearfix align-items-center ">
      <button onClick={ ()=> callMyUpdateCountFunc( product.product.id , product.count + 1 ) } className='btn btn-outline-success'>+</button>
      <span>{product.count}</span>
      <button disabled={ product.count == 1 } onClick={  ()=> callMyUpdateCountFunc( product.product.id , product.count - 1 ) } className='btn btn-outline-success'>-</button>
      </div>
     
    </div>
   </div> ) }
   <button onClick={function(){callClearCart()}}  className="btn border-success border-2 d-block mx-auto my-3 text-dark px-3">Clear cart</button>
    
   </div> : <div className='vh-100'>
     <div className="container">
      <div className='my-bg mt-5 py-5 text-center rounded-2 text-danger'>
        <h2>Cart Shop</h2>
        <h3>your cart is empty</h3>
      </div>
     </div>
   </div> }

  
  
  
  
  
  </>
}
