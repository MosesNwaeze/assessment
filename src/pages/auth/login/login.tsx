import React, {useState, useContext} from 'react';
import {useNavigate} from "react-router-dom";
import {UserRole} from "../../../models/userModel"
import {AppContext} from "../../../App";
import db from "../../../utils//db.json"

function Login() {
    const [email, _setEmail] = useState("");
    const [password, setPassword] = useState("");
    const[errorMessage, setErrormessage] = useState("");
    const navigate = useNavigate();
    const {setIsAdmin,setIsUserAuthenticated,setEmail } = useContext(AppContext);

    const handleSubmit = (event: any): void => {
        event.preventDefault();

       const user =   db.find(user=> user.email === email && user.password === password);

       if(user && setIsUserAuthenticated && setEmail){

           if(user.role === "ADMIN" && setIsAdmin){
               setIsAdmin(true);
               setIsUserAuthenticated(true);
               setEmail(email);
               navigate("/admin-dashboard")
           }else{
               setIsUserAuthenticated(true) ;
               setEmail(email);
               navigate("/regular-user-dashboard")
           }

       }else{
           setErrormessage("User login credential is wrong");
       }

    }
    return (
        <div className="d-flex justify-content-center align-items-center">
            <form className="text-center mt-5" onSubmit={handleSubmit}>
                {
                    errorMessage && (<h3 className="text-danger">{errorMessage}</h3>)
                }
             <h3>User Login</h3>
             <div className="col-12 mb-4">

                 <label>
                     Email:
                     <input type="email" placeholder="Email" onChange={(event)=>_setEmail(event.target.value)}/>
                 </label>
             </div>

             <div className="col-12 mb-4">

                 <label>
                     Password:
                     <input type="password" placeholder="Password" onChange={(event)=>setPassword(event.target.value)}/>
                 </label>
             </div>

             <button type="submit" className="btn btn-primary">LOGIN</button>
         </form>
        </div>
    );
}

export default Login;