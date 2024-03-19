import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BallTriangle } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';


export default function CategoryDetails() {

  const [specificCategory, setSpecificCategory] = useState(null)

   const {id} =  useParams();
   console.log(id);
  //---------------get specific category----

  function getSpecificCategory(){
    axios.get( `https://ecommerce.routemisr.com/api/v1/categories/${id}` )
   .then((res)=>{  
setSpecificCategory(res.data.data)
console.log( 'cate Detail..' , res );
   }) 
  .catch((err)=>{
// console.log('cateId',id);
// console.log( 'cate error..' , err);

  })




     }


     useEffect(()=>{

getSpecificCategory();

     },[])


     if( !specificCategory ){
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
  <div className="container">
    <div className="cateDetails my-3 w-50 m-auto">
    <div className="cart text-center cate-cart border-secondary-subtle categoryCart ">
          <figure>
            <img className='w-100' src={specificCategory.image} alt={specificCategory.name} />
          </figure>
          <article>
            <p className='text-success mb-2 h3'>{specificCategory.name}</p>
            <p> Created: {specificCategory.createdAt}</p>
          </article>
        </div>
    </div>
  </div>
  

  
  
  
  
  
  </>
}
