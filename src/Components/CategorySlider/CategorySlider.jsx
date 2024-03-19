import axios from "axios";
import React from "react";
import { BallTriangle } from "react-loader-spinner";
import { useQuery } from "react-query";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CategorySlider() {

  function getCategory(){
   return axios.get( `https://ecommerce.routemisr.com/api/v1/categories` );
  }
 const { data , isLoading } = useQuery( 'getCategorySlider' , getCategory );
  // console.log( 'data:' , data );

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
  };
 if( isLoading ){
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

  return (
    <Slider {...settings}>
      {data.data.data.map(( category , idx )=> <div className="my-4" key={idx}>
        <img style={{height: '190px'}} className="w-100" src={category.image} alt={category.name } />
         <h5 className="text-center text-success">{category.name}</h5>
      </div>
      ) }
    </Slider>
  );
}