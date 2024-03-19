import React, { useContext } from 'react'
import logo from '../../images/freshcart-logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../../Context/AuthStore';
import Brands from './../Brands/Brands';
import { cartContext } from '../../Context/CartContext';

export default function Navbar() {
  const { token, setToken , userData} = useContext( authContext );
  const { numOfCartItems } = useContext( cartContext )
  const navigate = useNavigate();
function logout(){
  setToken( null );
  localStorage.removeItem( 'tkn' );
  localStorage.removeItem( 'userProObj' );
 navigate( '/login' )

}
  return <>
 <nav className="navbar navbar-expand-lg my-bg pt-3" id="navbar-example">
  <div className="container">
    <Link className="navbar-brand" to="/">
        <img src={logo} alt="freshcart" />
    </Link>
    <button className="navbar-toggler remove-border" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <i className="fa-solid fa-bars fa-lg menu" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      { token ?  <ul className="navbar-nav m-auto mb-2 mb-lg-0 list-ince">
        <li className="nav-item ">
          <Link className="nav-link active hero-section" aria-current="page" to="/products">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/category">categories
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/brands">brands
          </Link>
        </li> <li className="nav-item">
          <Link className="nav-link" to="/wish list">wish list
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/AllOrders">allorders
          </Link>
        </li>
        <li className="nav-item position-relative">
          <Link className="nav-link" to="/cart">cart </Link>
         { numOfCartItems > 0 ?    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary ">
                 {  numOfCartItems  }
         <span class="visually-hidden">unread messages</span>
        </span> : '' } 
        </li>
       
       
      
    
      </ul> : "" }
     
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 list-ince">
      <li className="nav-item ">
        <ul className='m-2 list-unstyled d-flex '>
            <li><i className='me-2 fa-brands fa-facebook'></i></li>
            <li><i className='me-2 fa-brands fa-twitter'></i></li>
           <li> <i className=' me-2 fa-brands fa-instagram'></i></li>
            <li><i className=' me-2 fa-brands fa-linkedin-in'></i></li>
        </ul>
        </li>
        { token ? <>

          <li className="nav-item">
           
          <Link className="nav-link" to="/profile"><i class="fa-solid fa-user text-primary"> <span style={{ fontSize: '12px'  }}>{ userData.name.split('-').slice( 0,1 ).join('-')}</span></i>
          </Link> 
        </li>
          <li className="nav-item">
          <span onClick={logout} role='button' className="nav-link" to="/register">log out
          </span> 
        </li>
       
        
        </> : <>   <li className="nav-item ">
          <Link className="nav-link active hero-section" aria-current="page" to="/login">log in</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">register
          </Link>
        </li></> }
     
        
       
       
        
    
      </ul>
    </div>
  </div>
</nav>

  
  </>
}
