import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';


export default function AllOrders() {
    const [allOrders, setAllOrders] = useState(null)
    // const [orderProduct, setOrderProduct] = useState(null)
  
   function getUserOrder(){

    axios.get( `https://ecommerce.routemisr.com/api/v1/orders/user/${localStorage.getItem('userId')}`)
    .then( (res)=> {
    console.log( 'oreder resp:..' ,res.data);
    setAllOrders(res.data);
    // setOrderProduct(res.data.cartItems);
    } )
    .catch( (err)=>{

console.log('orddr err..' ,err);
    } )


 
}

useEffect( ()=>{

getUserOrder();

},[] )
if( !allOrders ){
  return<><div className="d-flex justify-content-center align-items-center bg-primary bg-opacity-50 vh-100">
    
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
</>
}



  return <>

<Helmet>
<title>AllOrders</title>
</Helmet>
{ allOrders.length ?  <div className="container bg-secondary-subtle  py-4   my-4">
    <div className="row">
      {allOrders.map(( order, idx )=> <div key={idx} className="col-md-12 ">
        <div className="orderBody">
        <h5>payment method : <span className='text-main h4'> {order.paymentMethodType} </span></h5>
        <h4 className='text-main pb-3'> Order Price : {order.totalOrderPrice}</h4>
        
       <div className="row bg-main-light">
        <h3 className='p-2 m-2' style={{color: 'yellowgreen'}}>Products :</h3>
       { (order.cartItems)?.map(( cart ,idx2 )=><div key={idx2}   className="col-md-3">
            <div className="product text-center">
              <img src={cart.product.imageCover} alt={cart.product.title}className='w-100 mb-2'/>
              <h6>{cart.product.title}</h6>
          </div>
          </div> )}
         
       </div>
      
        
     
    
      </div>
      
      </div> )}
     
    </div>
    </div> : <div className='vh-100'>
     <div className="container">
      <div className='my-bg mt-5 py-5 text-center rounded-2 text-danger'>
        <h2>Order Shop</h2>
        <h3>your Order is empty</h3>
      </div>
     </div>
   </div> }

   
  
  
  
  
  </>
}
