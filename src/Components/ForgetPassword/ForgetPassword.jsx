

import React, { useContext, useState } from 'react'
import axios from 'axios';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ColorRing } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../../Context/AuthStore';
import { Helmet } from 'react-helmet';
export default function ForgetPassword() {
  const [isSuccess, setIsSuccess] = useState(false)
const [errorMessage, setErrorMessage] = useState( null ) 
const [isLoading, setIsLoading] = useState(false)
const [formStatus, setFormStatus] = useState(true)
//  const { setToken , getUserData } = useContext( authContext );
const nav = useNavigate()
let userCode = {
  resetCode: '',
}
let userData = {
  email: '',
  
  }
const myValidate2 = Yup.object({
   resetCode: Yup.string().required().matches(/^[0-9]{5,6}$/),
  
  
  
  })

  const myValidate = Yup.object({
    email: Yup.string().required().email('email not valid'),
   
   
   
   })





async function forgetMyPassword(values){
  // console.log(values);
  setIsLoading( true )
 axios.post( `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords` , values )
.then(function (res) {
    console.log('in case of seccuss' , res);
 if(res.data.statusMsg=== "success"){
    
    setIsSuccess( true );
    setIsLoading( false )
    setTimeout(function(){
      setIsSuccess( false ); 
     setFormStatus(false)
    },1000)
 }

})
.catch(function(err){
  // console.log( 'in case of error' ,err);
  setErrorMessage(err.response.data.message);
 
  console.log(values);
  setIsLoading( false )
  setTimeout(function(){
    setErrorMessage( null );
  },2000)
})
 
}
// ------
async function verifyCode(values){
    axios.post( `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode` ,values )
    .then((res)=>{
        // console.log( 'verfiy res.' ,res.data);
        if(res.data.status == 'Success'){
          setTimeout(() => {
            nav( '/resetpassword' )
          }, 2000);
           
   
        }
    })
    .catch((err)=>{
    setErrorMessage(err.response.data.message)
        console.log('verify err ', err);
       
        setTimeout(function(){
          setErrorMessage( null );
        },2000)
    })
}

const myFormik1 = useFormik(
{

initialValues: userData,

onSubmit: forgetMyPassword,

validationSchema: myValidate,

// validate: function (values) {
//   const errors = {};
//  if( values.email.includes('@') !== true || values.email.includes('.') !== true){
//   errors.email = "Email not valid"
//  }

//   return errors;
}





)


const myFormik2= useFormik(
    {
        initialValues: userCode,




   onSubmit: verifyCode,


//    validate: function(values){
//     const errors = {};
//     // const  resetCodeRedux =/^[0-9]{5,6}$/;
//  if( values.resetCode <5 || values.resetCode > 6){
//   errors.resetCode = "patern not valid";
//  }

//   return errors;
// }
validationSchema: myValidate2 ,

    }
   
   
   
    
)

  return <>
  
  <Helmet>
  <title>Forget password</title>
 </Helmet>

 

  <div className='w-75 m-auto p-5 '>
    {/* { isSuccess ? <div className='alert alert-success text-center'>Welcome Back</div> : ""} */}
    { errorMessage ? <div className='alert alert-danger text-center'>{errorMessage}</div> : ''}
    <h2>Forget Password:</h2>

    { formStatus ? <form onSubmit={ myFormik1.handleSubmit } className=' main-bg p-5 bg-form'>
      <label htmlFor="email">email:</label>
      <input onBlur={myFormik1.handleBlur} onChange={myFormik1.handleChange} value={ myFormik1.values.email}  type="email" id='email' className='form-control mb-3' placeholder='email'/>
      {myFormik1.errors.email && myFormik1.touched.email ?  <div className="alert alert-danger">{myFormik1.errors.email}</div> : "" }
      
      <button  type="submit" className='btn bg-main text-white'>
        {isLoading ?     <ColorRing
        visible={true}
        height="35"
        width="35"
        ariaLabel='color-ring-loading'
        wrapperStyle={{}}
        wrapperClass='color-ring-wrapper'
        colors={ ['#3cd' ,'#3cd' ,'#3cd' ,'#3cd' ,'#3cd'] }
          /> : ' Send' }
       
    
        </button>
    </form> :   <form onSubmit={myFormik2.handleSubmit} className=' main-bg p-5 bg-form'>
      <label htmlFor="resetCode">Enter code:</label>
      <input  onBlur={myFormik2.handleBlur} onChange={myFormik2.handleChange} value={myFormik2.values.resetCode}  type="text" id='resetCode' className='form-control mb-3 ' placeholder='code'/>
      {myFormik2.errors.resetCode && myFormik2.touched.resetCode ?  <div className="alert alert-danger">{myFormik2.errors.resetCode }</div> : "" }
      
      <button  type="submit" className='btn bg-main text-white'>
        {isLoading ?     <ColorRing
        visible={true}
        height="35"
        width="35"
        ariaLabel='color-ring-loading'
        wrapperStyle={{}}
        wrapperClass='color-ring-wrapper'
        colors={ ['#3cd' ,'#3cd' ,'#3cd' ,'#3cd' ,'#3cd'] }
          /> : ' Verify code' }
       
    
        </button>
    </form>}
    



  
  </div>
  
  </>
  
 
}
