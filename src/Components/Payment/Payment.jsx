import React, { useContext } from 'react'
import axios from 'axios';
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom';
import { cartContext } from './../../Context/CartContext';
import { toast } from 'react-hot-toast';
import { Helmet } from 'react-helmet';



export default function Payment() {




// const userData = {
// city: '',
// phone: '',
// details: '',
// }
//------------
const obj = {
 
        city: "",
        phone: "",
        details: ""
   
}
// const mySchema = yup.object().shape({
//     shippingAddress: yup.object({
//         city: yup.string().required('city must be req..').min( 3, 'at least 3 characters..').max(10 ,'not more than 10 characters..'),
//         phone: yup.string().required('phone must be req..').matches(/^01[0125][0-9]{8}$/),
//         details: yup.string().required('filed is req..').min( 3, 'at least 3 characters..').max(10 ,'not more than 10 characters..'),
//     })
// })
    
//----------

const { cartIdNum , getUserCart ,setAllProducts, setNumOfCartItems, setTolCartPrice } = useContext(cartContext);
console.log(cartIdNum );

 const navTo = useNavigate()

//------------online-------
async function confirmONlinePay(values){

  const shippingAddressObj = {
   "shippingAddress": values
  }
   console.log( 't3bt',shippingAddressObj);
   //----------
 console.log('inside',cartIdNum);

 axios.post( `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartIdNum}` , { shippingAddressObj}  ,
  { headers: { token: localStorage.getItem('tkn') } , params: { url: 'http://localhost:3000' }})
.then(function (res) {
 console.log('in case of seccuss' , res);
 if(res.data.status === "success"){
  // toast.success('Done.. Payment completed successfuly' ,{position:'top-center'})
  // getUserCart();
     window.open( res.data.session.url , '_self' )

  
 }

})
.catch(function(err){
 console.log( 'in case of error', err , values);
 toast.error('Sorry. error occurred' ,{position:'top-center'})
})

}




 //----------------------cash
async function confirmCashPay(values){

   const shippingAddressObj = {
    "shippingAddress": values
   }
    console.log( 't3bt',shippingAddressObj);
    //----------
  console.log('inside',cartIdNum);

  axios.post( `https://ecommerce.routemisr.com/api/v1/orders/${cartIdNum}` , { shippingAddressObj}  ,
   { headers: { token: localStorage.getItem('tkn') }})
.then(function (res) {
  console.log('in case of seccuss' , res);
  if(res.data.status === "success"){
   toast.success('Done.. Payment completed successfuly' ,{position:'top-center'})
 getUserCart();
   setTimeout(() => {
    navTo('/products')
   }, 1500);
   
  }

})
.catch(function(err){
  console.log( 'in case of error', err , values);
  toast.error('Sorry. error occurred' ,{position:'top-center'})
})
 
}
// 

const myPayFormik = useFormik(
{

initialValues:  obj ,
    

onSubmit: confirmCashPay,

validate: function (values) {
  const errors = {};
  const cityRegex = /^[a-z]{3,15}$/;
 const phoneRegex = /^01[0125][0-9]{8}$/;
 const detailsRegex = /^[a-z]{3,12}$/;
 if( cityRegex.test(values.city)  === false ){
    errors.city = "Enter valid phone num";
  }
 if( phoneRegex.test(values.phone)  === false ){
    errors.phone = "Enter valid phone num";
  }
  if( detailsRegex.test(values.details) === false ){
    errors.details = "enter  valid patern value";
  }
  return errors;
}


// validationSchema: mySchema,

}
)

// to change in design after render you must think in state as rerender
  return<>

<Helmet>
    <title>Payment</title>
  </Helmet>
  
  <div className='w-75 m-auto p-5 '>
  
    <form onSubmit={ myPayFormik.handleSubmit } className=' main-bg p-5 bg-form'>
      <label htmlFor="city">city:</label>
      <input onBlur={myPayFormik.handleBlur} onChange={myPayFormik.handleChange} value={ myPayFormik.values.city}  type="text" id='city' className='form-control mb-3' placeholder='city..'/>
      {myPayFormik.errors.city && myPayFormik.touched.city   ?<div className="alert alert-danger">{myPayFormik.errors.city}</div> : "" }
      <label htmlFor="phone">phone:</label>
      <input onBlur={myPayFormik.handleBlur} onChange={myPayFormik.handleChange} value={ myPayFormik.values.phone}  type="text" id='phone' className='form-control mb-3' placeholder='phone'/>
      {myPayFormik.errors.phone && myPayFormik.touched.phone ?  <div className="alert alert-danger">{myPayFormik.errors.phone}</div> : "" }
      <label htmlFor="details">details:</label>
      <textarea onBlur={myPayFormik.handleBlur} onChange={myPayFormik.handleChange} value={ myPayFormik.values.details}  type="text" id='details' className='form-control mb-3' placeholder='details'/>
      {myPayFormik.errors.details && myPayFormik.touched.details ?  <div className="alert alert-danger">{myPayFormik.errors.details}</div> : "" }
      <button  type="submit" className='btn bg-main text-white me-5'>Cash Pay </button>
      <button onClick={ function(){ confirmONlinePay()} } type="button" className='btn bg-main text-white'> Online Pay </button>

    </form>
  </div>
  
  </>
}
