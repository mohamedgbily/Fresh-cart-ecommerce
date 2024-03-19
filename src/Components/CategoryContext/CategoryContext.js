import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

 export const categoryContext = createContext()
  
export default function CategoryContextProvider( { children } ) {
  const { id } = useParams()
    const [allCategories, setAllCategories] = useState(null)
   async function getAllCategories(){
 const res = await axios.get( `https://ecommerce.routemisr.com/api/v1/categories` )
   .then((res)=>{
    console.log(' category ID' ,res.data.data);
    setAllCategories(res.data.data)
    // return res.data
   })
   .catch((err)=>{
  // console.log('from category' ,err);
  //  return err
   })

  
    }
    //---------------get specific category----

   function getSpecificCategory(){
  axios.get( `https://ecommerce.routemisr.com/api/v1/categories/${id}` )
   }
  
    useEffect(()=>{
      getAllCategories();
       },[])


  return  <categoryContext.Provider value={{ getAllCategories, allCategories ,setAllCategories }} >
  {  children }  
  
  </categoryContext.Provider>
}
