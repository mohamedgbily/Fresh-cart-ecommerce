

import React, { useState } from 'react'
import axios from 'axios';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ColorRing } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Register() {

//   function onSubmit(e){
//  e.preventDefault();
//     console.log('Hello');
//   }
// const mySchema = Yup.object({
//  name: Yup.string().required('Name must be req..').min( 3, 'at least 3 characters..').max(10 ,'not more than 10 characters..'),
//  phone: Yup.string().required('Phone is req...').matches(/^01[0125][0-9]{8}$/) ,
//  email: Yup.string().required('not valid email').email(),
//  password: Yup.string().required('pass must be from 6 to 12 char').min(6).max(12),
//  repassword: Yup.string().required('repass dont matches pass').oneOf([Yup.ref("password"),] )


// })


const userData = {
name: '',
email: '',
phone: '',
password: '',
rePassword: ''

}
const [isSuccess, setIsSuccess] = useState(false)
const [errorMessage, setErrorMessage] = useState( null ) 
const [isLoading, setIsLoading] = useState(false)

const navigateToLogin = useNavigate()
  // func to get data then send it to back-end
  // async function sendUserData(userData){
  //   const {data}= await axios.post( `https://ecommerce.routemisr.com/api/v1/auth/signup`, userData )
  //  console.log(data);
  //  }
//
async function mySubmit(values){
  console.log(values);
  setIsLoading( true )
  axios.post( `https://ecommerce.routemisr.com/api/v1/auth/signup` , values )
.then(function (res) {
  console.log('in case of seccuss' , res);
  setIsSuccess( true );
  setIsLoading( false )
  setTimeout(function(){
    setIsSuccess( false ); 
    navigateToLogin( '/login' );
  },2000)
})
.catch(function(err){
  
  setErrorMessage(err.response.data.message);
  console.log( 'in case of error' ,err);
  console.log(values);
  setIsLoading( false )
  setTimeout(function(){
    setErrorMessage( null );
  },2000)
})
 
}
// 

const myFormik = useFormik(
{

initialValues: userData,

onSubmit: mySubmit,


validate: function (values) {
  const errors = {};
 const nameRegex = /^[a-zA-Z\-]+$/;
 const phoneRegex = /^01[0125][0-9]{8}$/;
//  const passRegex = /^[A-Za-z0-9]{6,12}$/
 if(nameRegex.test(values.name) === false){
  errors.name = "Name must be in patern ( a-z , A-z , can use sep ( - ) )"
 }
 if( values.email.includes('@') !== true || values.email.includes('.') !== true){
  errors.email = "Email not valid"
 }
if( phoneRegex.test(values.phone)  === false ){
  errors.phone = "Enter valid phone num";
}
if( values.password.length < 6 ||  values.password.length > 15 ){
  errors.password = "Password must be from 6 to 15 charater";
}
if ( values.rePassword !== values.password ){
  errors.rePassword = "repassword not match";
}
  return errors;
}


// validationSchema: mySchema,

}
)

// to change in design after render you must think in state as rerender
  return<>
  
  <Helmet>
    <title>Registeration</title>
  </Helmet>


  <div className='w-75 m-auto p-5 '>
    { isSuccess ? <div className='alert alert-success text-center'>Congrtulations your account has been created</div> : ""}
    { errorMessage ? <div className='alert alert-danger text-center'>{errorMessage}</div> : ''}
    <h2>Register Now:</h2>
    <form onSubmit={ myFormik.handleSubmit } className=' main-bg p-5 bg-form'>
      <label htmlFor="name">name:</label>
      <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={ myFormik.values.name}  type="text" id='name' autoComplete="name" className='form-control mb-3' placeholder='name'/>
     {myFormik.errors.name  && myFormik.touched.name ?  <div className="alert alert-danger">{myFormik.errors.name}</div> : "" }
      <label htmlFor="logemail">email:</label>
      <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={ myFormik.values.email}  type="logemail" id='email' autoComplete="email" className='form-control' placeholder='email'/>
      {myFormik.errors.email && myFormik.touched.email ?  <div className="alert alert-danger">{myFormik.errors.email}</div> : "" }
      <label htmlFor="phone">phone:</label>
      <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={ myFormik.values.phone}  type="text" id='phone' autoComplete="phone" className='form-control mb-3' placeholder='phone'/>
      {myFormik.errors.phone && myFormik.touched.phone ?  <div className="alert alert-danger">{myFormik.errors.phone}</div> : "" }
      <label htmlFor="password">password:</label>
      <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={ myFormik.values.password}  type="password" id='password' autoComplete="current-password" className='form-control mb-3' placeholder='password'/>
      {myFormik.errors.password && myFormik.touched.password ?  <div className="alert alert-danger">{myFormik.errors.password}</div> : "" }
      <label htmlFor="repassword">repassword:</label>
      <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={ myFormik.values.rePassword}  type="password" id='rePassword' autocomplete="current-password"  className='form-control mb-3' placeholder='rePassword'/>
      {myFormik.errors.rePassword && myFormik.touched.rePassword ?  <div className="alert alert-danger">{myFormik.errors.rePassword}</div> : "" }
      <button  type="submit" className='btn bg-main text-white'>
        {isLoading ?     <ColorRing
        visible={true}
        height="35"
        width="35"
        ariaLabel='color-ring-loading'
        wrapperStyle={{}}
        wrapperClass='color-ring-wrapper'
        colors={ ['#3cd' ,'#3cd' ,'#3cd' ,'#3cd' ,'#3cd'] }
          /> : ' Register' }
       
    
        </button>
    </form>
  </div>
  
  </>
}
