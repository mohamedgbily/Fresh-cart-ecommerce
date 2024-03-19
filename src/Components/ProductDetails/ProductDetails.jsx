import axios from 'axios';
import React, { useContext } from 'react'
import { BallTriangle } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { Navigate, useParams } from 'react-router-dom'
import { cartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function ProductDetails() {

    const { addProductToMycart } = useContext( cartContext);
    // console.log(  'addProductToMycart:....' , addProductToMycart);
       //-------------------------------


    const { id } = useParams();
    // console.log(id);

    //-----------------fun to call addPoductToMyCart------
    async function addProduct(id){
      const res =  await addProductToMycart(id);
    //    console.log( 'click btn = data' ,res.data )
     if( res.status === "success" ){
        // console.log('your prooduct add successfuly..');
        toast.success(' prooduct add successfuly..' , { duration: 1500 , position: 'top-center' ,style:{backgroundColor: 'green' ,color: 'white'}})
    }
    else{
        toast.error(' error occurred..' , { duration: 1500 , position: 'top-center' ,style:{backgroundColor: 'red' ,color: 'white'} })
    }
    }
    function getProductDtailes(){
      return  axios.get( `https://ecommerce.routemisr.com/api/v1/products/${ id }` )
    }
    const { isLoading ,data ,isError } = useQuery( `getProductDetailesw-${id}`,getProductDtailes )
    

    // console.log('details...' , data);

    if(isLoading){
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
       if(isError){
        return <Navigate to='/products' />
       }
       const productDetail = data.data.data;
  return <>

   <Helmet>
    <title>{productDetail.title.split(' ').slice( 0,2 ).join(' ')} product </title>
   </Helmet>

       <div className="container">
        <div className="row align-items-center">
            <div className="col-md-3">
                <figure>
                    <img className='w-100' src={productDetail.imageCover} alt={productDetail.title} />
                </figure>
            </div>
            <div className="col-md-9">
                <article>
                    <h2>{productDetail.title}</h2>
                    <p >{productDetail.description}</p>
                    <h6>{productDetail.category.name}</h6>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h6>{productDetail.price + '  EGP'}</h6>
                        <p><span style={{color: 'yellowgreen'}}><i className='fa-solid fa-star'></i></span> {productDetail.ratingsAverage}</p>
                    </div>
                    {/* <p> Prod.ID:  { productDetail.id }</p> */}
                    <button onClick={()=> addProduct(productDetail.id) } className='btn bg-main text-white w-100'>+ add to cart</button>
                </article>
            </div>
        </div>
       </div>
  </>
    
 
}
