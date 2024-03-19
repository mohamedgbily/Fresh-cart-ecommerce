import axios, { all } from 'axios'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Helmet } from 'react-helmet'
import { BallTriangle } from 'react-loader-spinner'
import { categoryContext } from '../CategoryContext/CategoryContext'
import { Link } from 'react-router-dom';


export default function Category() {
const { allCategories , getAllCategories ,setAllCategories } = useContext( categoryContext );
const [searchVal, setSearchVal] = useState('');
const [categoryList, setCategoryList] = useState(null)

//------------



useEffect(()=>{

  setCategoryList( allCategories?.filter((elem)=>elem.name.toLowerCase().includes( searchVal.toLowerCase() ) ) )
},[searchVal])

useEffect( ()=>{
if(allCategories != null) {
   
  
    setCategoryList(allCategories)
}

},[allCategories])


     if( !categoryList){
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
    <title>Categories</title>
  </Helmet>
  
  <div className="container">
    <input type="text" className=' form-control my-5 w-75 m-auto' placeholder='search' onChange={(e)=>setSearchVal(e.target.value)} />
    <div className="row g-4 py-4">
      { categoryList.map(( Category ,idx )=> <div key={idx} className="col-md-4 ">
    <Link to={`/categoryDetails/${Category._id}`}>
    <div className="cart text-center cate-cart border-secondary-subtle categoryCart">
          <figure>
            <img className='w-100' src={Category.image} alt={Category.name} />
          </figure>
          <article>
            <p className='text-success mb-2 h3'>{Category.name}</p>
            {/* <p>cat.ID: {Category._id}</p> */}
          </article>
        </div>
    
    </Link>
        
      </div> ) }
      
      
    </div>
  </div>
  
  
 
  </>
}
