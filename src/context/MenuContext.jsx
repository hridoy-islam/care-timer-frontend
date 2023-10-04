"use client";
import { createContext, useState } from "react";

export const MenuContext = createContext();

const MenuContextProvider = ({ children }) => {
   // let [tokenDetails, setTokenDetails] = localStorage.getItem("details")
   // ? JSON.parse(localStorage.getItem("details"))
   // : null;

   // const [tokenDetails, setTokenDetails] = JSON.parse(localStorage.getItem('details'));
   const [tokenDetails, setTokenDetails] = useState(JSON.parse.localStorage?.getItem('details'));
   // const [token, setToken] = localStorage.getItem('timertoken');



  const info = {
   tokenDetails, setTokenDetails,


}
return <MenuContext.Provider value={info}>
   {children}
   </MenuContext.Provider>;
};

export default MenuContextProvider;
