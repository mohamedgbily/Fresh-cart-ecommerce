import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Components/Layout/Layout';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Products from './Components/Products/Products';
import NotFound from './Components/NotFound/NotFound';
import Category from './Components/Category/Category';
import { AuthContext, AuthContextProvider } from './Context/AuthStore';
import Brands from './Components/Brands/Brands';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Cart from './Components/Cart/Cart';
import CartContextProvider from './Context/CartContext';
import { Toaster } from 'react-hot-toast';
import WishList from './Components/WishList/WishList';
import Payment from './Components/Payment/Payment';
import AllOrders from './Components/AllOrder/AllOrders';
import Profile from './Components/Profile/Profile';
import { Offline } from 'react-detect-offline';
import CategoryContextProvider from './Components/CategoryContext/CategoryContext';
import CategoryDetails from './Components/CategoryDetails/CategoryDetails';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import WishListContextProvider from './Components/WishListContext/WishListContext';



const myRouter = createBrowserRouter([
  { path: '/' , element: < Layout />,children: [
    { index: true, element: < Register />  }, //Route
    { path: 'login', element: < Login /> } ,
    { path: 'register', element: < Register /> } ,
    { path: 'forgetPassword', element: < ForgetPassword /> } ,
    { path: 'resetPassword', element: < ResetPassword /> } ,
    { path: 'products' , element: <ProtectedRoute>  < Products /> </ProtectedRoute> },
    { path: 'cart' , element: <ProtectedRoute> < Cart /> </ProtectedRoute> },
    { path: 'payment' , element: <ProtectedRoute> < Payment /> </ProtectedRoute> },
    { path: 'brands' , element: <ProtectedRoute> < Brands />  </ProtectedRoute>},
    { path: 'profile' , element: <ProtectedRoute> < Profile  />  </ProtectedRoute>},
    { path: 'allorders' , element: <ProtectedRoute> < AllOrders />  </ProtectedRoute>},
    { path: 'wish list' , element: <ProtectedRoute> < WishList />  </ProtectedRoute>},
    { path: 'productDetails/:id' , element: <ProtectedRoute> < ProductDetails />  </ProtectedRoute>},
    { path: 'categoryDetails/:id' , element: <ProtectedRoute> < CategoryDetails />  </ProtectedRoute>},
    { path: 'category' , element:  <ProtectedRoute>  < Category/> </ProtectedRoute> },
    {  path: '*', element: < NotFound /> }
  ]},  //Route
]);



export default function App() {
 const myClient = new QueryClient();
  return <>
  <QueryClientProvider  client={myClient} >
  <AuthContextProvider>
 < WishListContextProvider>
  <CartContextProvider >
  <CategoryContextProvider >
 <RouterProvider router = {myRouter}/>
 </CategoryContextProvider >
 </CartContextProvider>
 </WishListContextProvider>
 </AuthContextProvider>
  </QueryClientProvider>
  <Toaster />

  <Offline>
    <div className=" bg-dark fixed-bottom text-white fit p-2 rounded-2"> your internet connection has been corrupted</div>
  </Offline>
  </>
}

