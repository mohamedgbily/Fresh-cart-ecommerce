import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react"


export const authContext = createContext();
export function AuthContextProvider( { children } ){
    const [token, setToken] = useState( null );
    const [userData, setUserData] = useState(null)
    const [userProfileData, setUserProfileData] = useState(null)
    useEffect( function(){
 const valueOfTkn = localStorage.getItem('tkn');
 if( valueOfTkn != null ){
   setToken( valueOfTkn )
   getUserData(); 
  // setUserData(  jwtDecode( valueOfTkn ) )
 }
    } ,[] )

    //func to get user data to profile----------
    function getUserData(){
     const userInfo =  jwtDecode( localStorage.getItem('tkn') );
    //  console.log( 'user information',userInfo);
     setUserData(userInfo)
    }

    return<authContext.Provider value={ { token ,setToken , userData , getUserData ,userProfileData ,setUserProfileData} }>
    {  children }
    
    </authContext.Provider>
}