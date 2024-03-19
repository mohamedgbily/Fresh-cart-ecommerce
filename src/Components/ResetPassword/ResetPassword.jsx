import axios from 'axios';
import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { toast } from 'react-hot-toast';

export default function ResetPassword() {
const navUserAfterReset = useNavigate();


const userval = {
   email: "",
   newPassword: "",
    }



  const mySchemaRest = Yup.object({
    email: Yup.string().required('email req').email('enter vaild email'),
    newPassword: Yup.string().required('pass req').min(5).max(6),
   })




      async function resetUserPass(values){
      axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword` , values)
      .then((res)=>{
  console.log('from resetpass'  ,res.data);
  
  if(res.token){
   navUserAfterReset('/login')
  }
      })
      .catch((err)=>{
         console.log('from resetpass err'  , err);
     toast.error('error has occurred...', {position: "top-center"})

      })

    }
 const  myForm = useFormik({
        initialValues: userval,
        onSubmit: resetUserPass,
        validationSchema: mySchemaRest ,
    })



   
    
  return <>
     <form onSubmit={myForm.handleSubmit} className=' vh-100 py-5' >
        <label className='ms-5' htmlFor="emaill">email</label>
        <input onBlur={myForm.handleBlur} onChange={myForm.handleChange}  className=' form-control mx-5' value={myForm.values.email} type="email" id='emaill'  placeholder='email'/>
        {myForm.errors.email && myForm.touched.email ?  <div className="alert alert-danger ms-5 ">{myForm.errors.email }</div> : "" }
        <label className='ms-5' htmlFor="newpassword">newwpassword</label>
        <input  onBlur={myForm.handleBlur} onChange={myForm.handleChange} name="" value={myForm.values.newPassword} className=' form-control mx-5' type="current-password" id='newpassword'  placeholder='newpassword'/>
        {myForm.errors.newPassword && myForm.touched.newPassword ?  <div className="alert alert-danger mx-5">{myForm.errors.newPassword }</div> : "" }
        <button type='submit' className='btn btn-success px-3 mt-3 mx-5 '>Update</button>
     </form>
     


  
  
  </>
}
