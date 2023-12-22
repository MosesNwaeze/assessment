import React, {useState, useContext} from 'react';
import {UserRole,UserModelType} from "../../../../../models/userModel"
import {AppContext} from "../../../../../App";
import db from "../../../../../utils/db.json"
import {useNavigate} from "react-router-dom";

function AddUser() {
    const [name, setName] = useState("");
    const [email, _setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("")

    const navigate = useNavigate();

    const {setIsUserAuthenticated,setIsAdmin,setEmail} = useContext(AppContext);

    const handleSubmit = (event: any): void => {
        event.preventDefault();

        const user:UserModelType = {
            name,
            email,
            role : {role} as UserRole,
            password,
        }

        db.push({name: user.name, email: user.email, role: user.role.role, password: user.password })

        if(setIsUserAuthenticated && setEmail){
            if(role === "ADMIN" && setIsAdmin){
                setIsAdmin(true);
                setIsUserAuthenticated(true)
                setEmail(email)
            }else if(role === "REGULAR_USER"){
                setIsUserAuthenticated(true);
                setEmail(email);
            }

            navigate("/admin-dashboard")
        }


    }
    return (
        <div className="d-flex justify-content-center align-items-center">
            <form className="text-center mt-5" onSubmit={handleSubmit}>
                <h3>User Register</h3>
                <div className="col-12 mb-4">

                    <label>
                        Name:
                        <input type="text" placeholder="Name" onChange={(event)=>setName(event.target.value)}/>
                    </label>
                </div>
                <div className="col-12 mb-4">

                    <label>
                        Email:
                        <input type="email" placeholder="Username" onChange={(event)=>_setEmail(event.target.value)}/>
                    </label>
                </div>

                <div className="col-12 mb-4">

                    <label>
                        Password:
                        <input type="password" placeholder="Password" onChange={(event)=>setPassword(event.target.value)}/>
                    </label>
                </div>


                <div className="col-12 mb-4">

                    <label>
                        Role:
                        <select onChange={(event)=>setRole(event.target.value)}>
                            <option value="">:: USER ROLE ::</option>
                            <option value="ADMIN">ADMIN</option>
                            <option value="REGULAR_USER">REGULAR USER</option>
                        </select>
                    </label>
                </div>

                <button type="submit" className="btn btn-primary">Add User</button>
            </form>
        </div>
    );
}

export default AddUser;