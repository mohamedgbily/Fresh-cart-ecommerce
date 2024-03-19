import React, { useContext } from 'react'
import { authContext } from '../../Context/AuthStore'
import { BallTriangle } from 'react-loader-spinner'
import { Helmet } from 'react-helmet';

export default function Profile() {
   const { userData ,setuserProfileData} =  useContext( authContext )
   let profileus = JSON.parse(localStorage.getItem('userProObj'))
   if( localStorage.getItem( 'tkn' != null ) ){
    setuserProfileData( profileus )
   }
   console.log( 'profile', profileus);
   if( !userData ){
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
  <title>UserProfile</title>
 </Helmet>

  <div className="container  overflow-hidden my-5 ">
    <div className=" d-flex align-items-center justify-content-center  w-75  my-bg m-auto my-5 rounded-2 py-5 mainBorder profile-border">
      <div className=' mt-2'>
      <h5 className=''>{ userData.name }</h5>
      <p className=''>{profileus.email}</p>
      </div>
      <div style={{width: '100px' , height: "100px" }} className='mainBorder ms-4 rounded-circle bg-primary d-flex justify-content-center align-items-center my-3'>
      <p style={{fontSize: '45px'}} className='text-white'>{profileus.email.toUpperCase().slice(0,1)}</p>  
    </div>
    </div>
   
    
   
  </div>
  
  
  
  </>
}
