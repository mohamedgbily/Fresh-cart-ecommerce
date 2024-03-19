import React from 'react'
import { Helmet } from 'react-helmet'
import error from '../../images/error.svg'
export default function NotFound() {
  return <>
   <Helmet>
    <title>NotFound</title>
  </Helmet>
<div className="container ">
 <figure className=' text-center'>
 <img className='w-50 my-4' src={error} alt="notfoundpage" />
 </figure>
</div>
  </>
}
