import React, {createContext, useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes,Route, useNavigate} from "react-router-dom"
import Login from "./pages/auth/login/login";
import AdminDashboard from "./pages/dashboard/admin/admin-dashboard";
import RegularUserDashboard from "./pages/dashboard/regular-user/regular-user-dashbaord";
import Register from "./pages/auth/register/register";
import {UserModelType} from "./models/userModel";
import Update from "./pages/auth/update/update";
import UpdateUser from "./pages/auth/update/update";


export type AppContextType = {
  isUserAuthenticated?: boolean;
  setIsUserAuthenticated?: (isUserAuthenticated:boolean) => void;
  isAdmin?: boolean;
  setIsAdmin?: (isAdmin:boolean) => void;
  email?: string;
  setEmail?: (email:string) => void;
}


export const AppContext:React.Context<AppContextType> = createContext({});

function App() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const appContextType: AppContextType = {
      isUserAuthenticated: isUserAuthenticated,
      isAdmin: isAdmin,
      setIsAdmin: setIsAdmin,
      setIsUserAuthenticated: setIsUserAuthenticated,
      email: email,
      setEmail: setEmail,
  };

  useEffect(() =>{
      const url = new URL(window.location.href);
      const  path = url.pathname;
      if(!isUserAuthenticated && path !== '/register'){
          navigate("/login")
      }
  },[isAdmin,isUserAuthenticated])
  return (

     <AppContext.Provider value={appContextType}>
         <div className="container">

                 <Routes>
                     <Route path="login" element={<Login/>}/>
                     <Route path="register" element={<Register/>} />
                     <Route path="update-user" element={<UpdateUser/>} />
                     <Route path="regular-user-dashboard" element={<RegularUserDashboard/>} />
                     <Route path="admin-dashboard" element={<AdminDashboard/>} />
                 </Routes>


         </div>
     </AppContext.Provider>

  );
}



export default App;
