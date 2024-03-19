import React from 'react'

export default function Footer() {
  return <>
  <div className=' container-fluid my-bg text-black p-4 align-items-center'>
    <h3 className='ms-5'>Get FreshCart App </h3>
    <p className='ms-5 text-black-50'>we will send you a like, open it on your phone to download the app. </p>
   <div className='d-flex justify-content-center align-items-center py-4'>
   <input  type="email" className='w-75 form-control me-4' placeholder='Email' id='email'/>
    <button className='btn bg-main'>share app link</button>
   </div>
  <div className=" d-flex justify-content-start py-2 align-items-center border-top border-1 border-secondary-subtle border-bottom">
    <h3 className='mx-5'>Payment Partners</h3>
    <figure>
      <img style={{width:'50px' , marginRight: '10px'}} src={require('../../images/amazonpay.jpg')} alt="amazon pay" />
      <img style={{width:'50px' , marginRight: '10px'}} src={require('../../images/master-card-icon_31835.png')} alt="master card" />
      <img style={{width:'50px' , marginRight: '10px'}} src={require('../../images/8365-american-express_102492.png')} alt="amrecan express" />
      <img style={{width:'50px' , marginRight: '10px'}} src={require('../../images/paypal_logo_icon_170865.png')} alt="amazon express" />
    </figure>
  </div>
  </div>
  </>
}
