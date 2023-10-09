"use client";
// import { createContext, useState } from "react";

// export const MenuContext = createContext();

// const MenuContextProvider = ({ children }) => {

//    // let [tokenDetails, setTokenDetails] = localStorage.getItem("details")
//    // ? JSON.parse(localStorage.getItem("details"))
//    // : null;

//    // const [tokenDetails, setTokenDetails] = JSON.parse(localStorage.getItem('details'));
//    const [tokenDetails, setTokenDetails] = useState(JSON.parse.localStorage?.getItem('details'));
//    // const [tokenDetails, setTokenDetails] = localStorage.getItem('details');



//   const info = {
//    tokenDetails, setTokenDetails,


// }
// return <MenuContext.Provider value={info}>
//    {children}
//    </MenuContext.Provider>;
// };

// export default MenuContextProvider;
import { createContext, useState } from 'react';
 
import { useEffect } from "react";
export const userContext = createContext();


const MainContext = ({ children }) => {
   
    // const [tokenDetails, setTokenDetails] = useState(JSON.parse.localStorage?.getItem('details'));
    

    const [tokenDetails, setTokenDetails] = useState({}); 
    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
          let tokenDetails = JSON.parse(localStorage.getItem('details'));
          
          setTokenDetails(tokenDetails);
        }
      }, []);
      
      const [token, setToken] = useState();
      //  const [token, setToken] = localStorage.getItem('timertoken');   
    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
          let token = localStorage.getItem('timertoken')
          
          setToken(token);
        }
      }, []);


 

    const info = {
      tokenDetails, setTokenDetails,
      token, setToken

    }
    return (
        <userContext.Provider value={info}>
            {children}
        </userContext.Provider>
    );
};

export default MainContext;
