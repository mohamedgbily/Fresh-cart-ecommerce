import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { BallTriangle } from 'react-loader-spinner'

export default function Brands() {
const [allBrands, setAllBrands] = useState(null)
const [id, setId] = useState('')


function getAllBrands(){
axios.get( `https://ecommerce.routemisr.com/api/v1/brands` )
.then((res)=>{
console.log('brands res..' ,  res.data);
setAllBrands(res.data.data)
})
.catch((err)=>{
console.log('brands err..' , err);

})
}
useEffect(()=>{

getAllBrands();

},[])


//-----------
// function getspecibrand(){
//  axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
//  .then((res)=>{
//   console.log( 'speci brand res' , res.data.data);


//  })
// .catch((err)=>{

//   console.log( 'speci brand err', err);
// })

// }

if( !allBrands){
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
  <title>Brands</title>
 </Helmet>
  {}
  <div className="container">
    <div className="row g-4 py-4">
    { allBrands.map((brand , idx)=>   <div key={idx} className="col-md-3">
        <div className="brand cate-cart text-center border-secondary-subtle categoryCart p-3">
          <figure>
            <img className='w-100' src={brand.image} alt={ brand.name } />
          </figure>
          <p>{brand.name}</p>
          {/* <p>{brand._id}</p> */}
        </div>
      </div> ) }
    
    </div>
  </div>
  
  
  
  
  
  
  
  
 </>
}
