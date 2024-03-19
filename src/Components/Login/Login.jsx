

import React, { useContext, useState } from 'react'
import axios from 'axios';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ColorRing } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../../Context/AuthStore';
import { Helmet } from 'react-helmet';

export default function Login() {

 const { setToken , getUserData  ,setUserProfileData} = useContext( authContext );
 const [inputType, setInputType] = useState('password');
 const [icon, setIcon] = useState('eye-slash');

const navToForgetpass = useNavigate()

const userData = {
email: '',
password: '',
}
const [isSuccess, setIsSuccess] = useState(false)
const [errorMessage, setErrorMessage] = useState( null ) 
const [isLoading, setIsLoading] = useState(false)

const navigateToLogin = useNavigate()

async function myLoginSubmit(values){
  console.log(values);
  setIsLoading( true )
  axios.post( `https://ecommerce.routemisr.com/api/v1/auth/signin` , values )
.then(function (res) {
  console.log('in case of seccuss' , res);
  if(res.data.message == "success"){
    localStorage.setItem( 'tkn' , res.data.token );
   localStorage.setItem( 'userProObj' ,JSON.stringify(res.data.user))
    getUserData()
    setUserProfileData(res.data.user)
    setToken(res.data.token)
    setIsSuccess( true );
    setIsLoading( false )
    setTimeout(function(){
      setIsSuccess( false ); 
      navigateToLogin( '/products' );
    },2000)
  }

})
.catch(function(err){
  console.log( 'in case of error' ,err);
  setErrorMessage(err.response.data.message);
 
  // console.log(values);
  setIsLoading( false )
  setTimeout(function(){
    setErrorMessage( null );
  },2000)
})
 
}

// 

const myLoginFormik = useFormik(
{

initialValues: userData,

onSubmit: myLoginSubmit,


validate: function (values) {
  const errors = {};
 if( values.email.includes('@') !== true || values.email.includes('.') !== true){
  errors.email = "Email not valid"
 }
if( values.password.length < 6 ||  values.password.length > 15 ){
  errors.password = "Password must be from 6 to 15 charater";
}
  return errors;
}


// validationSchema: mySchema,

}
)


const handelToggel = ()=>{
  if( inputType === 'password' ){
    setInputType('text');
    setIcon('eye')
  }
  else{
    setInputType('password')
    setIcon('eye-slash')
  }
}

// to change in design after render you must think in state as rerender
  return<>
  
  <Helmet>
  <title>Login</title>
 </Helmet>

  <div className='w-75 m-auto p-5 '>
    { isSuccess ? <div className='alert alert-success text-center'>Welcome Back</div> : ""}
    { errorMessage ? <div className='alert alert-danger text-center'>{errorMessage}</div> : ''}
    <h2>Login Now:</h2>
    <form onSubmit={ myLoginFormik.handleSubmit } className=' main-bg p-5 bg-form'>
      <label htmlFor="email">email:</label>
      <input onBlur={myLoginFormik.handleBlur} onChange={myLoginFormik.handleChange} value={ myLoginFormik.values.email }  type="email" id='email' className='form-control mb-3' placeholder='email'/>
      {myLoginFormik.errors.email && myLoginFormik.touched.email ?  <div className="alert alert-danger">{myLoginFormik.errors.email}</div> : "" }
      <div className="position-relative">
      <label htmlFor="password">password:</label>
      <input  onBlur={myLoginFormik.handleBlur} onChange={myLoginFormik.handleChange} value={ myLoginFormik.values.password}  type={inputType} id='password' className='form-control mb-3 show' placeholder='password'/>
      {myLoginFormik.errors.password && myLoginFormik.touched.password ?  <div className="alert alert-danger">{myLoginFormik.errors.password}</div> : "" }
      <i  onClick={handelToggel } class={ `fa-regular fa-${icon} loginpos text-info` } ></i>
      </div>
 <div className="d-flex justify-content-between align-items-center">
 <button  type="submit" className='btn bg-main text-white'>
        {isLoading ?     <ColorRing
        visible={true}
        height="35"
        width="35"
        ariaLabel='color-ring-loading'
        wrapperStyle={{}}
        wrapperClass='color-ring-wrapper'
        colors={ ['#3cd' ,'#3cd' ,'#3cd' ,'#3cd' ,'#3cd'] }
          /> : ' Login' }
       
    
        </button>
        <p role='button' className=' ms-5 text-main' onClick={()=>{
  navToForgetpass('/forgetPassword')
    }}>Forget password?</p>
 </div>
    </form>
  
  </div>
  
  </>
}

