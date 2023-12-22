import React, {useState, useContext, useEffect} from 'react';
import {UserRole,UserModelType} from "../../../models/userModel"
import {AppContext} from "../../../App";
import db from "../../../utils//db.json"
import {useNavigate, useLocation} from "react-router-dom";

function UpdateUser() {
    const [name, setName] = useState("");
    const [_email, _setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const location = useLocation();
    const [param, setParam] = useState(location.state.email)

    const navigate = useNavigate();

    const {setIsUserAuthenticated,setIsAdmin,setEmail,} = useContext(AppContext);

    useEffect(()=>{
        const user = db.find((user)=> user.email === param );

        if(user){
            setName(user.name);
            setRole(user.role);
            setPassword(user.password);
            _setEmail(user.email)
        }

    },[param])

    const handleSubmit = (event: any): void => {
        event.preventDefault();

        const user:UserModelType = {
            name,
            email: _email,
            role : {role} as UserRole,
            password,
        }
        const index = db.findIndex(user => user.email === _email);
        db.splice(index,1,{role: user.role.role, email: user.email, name: user.name, password: user.password})

        if(setIsUserAuthenticated){
            if(role === "ADMIN" && setIsAdmin){
                setIsAdmin(true);
                setIsUserAuthenticated(true)

            }else if(role === "REGULAR_USER"){
                setIsUserAuthenticated(true);

            }
            navigate("/admin-dashboard")
        }

    }
    return (
        <div className="d-flex justify-content-center align-items-center">
            <form className="text-center mt-5" onSubmit={handleSubmit}>
                <h1 className="my-5">Update User</h1>
                <div className="col-12 mb-4">

                    <label>
                        Name:
                        <input type="text" placeholder="Name" value={name} onChange={(event)=>setName(event.target.value)}/>
                    </label>
                </div>
                <div className="col-12 mb-4">

                    <label>
                        Email:
                        <input type="email" placeholder="Username" value={_email} onChange={(event)=>_setEmail(event.target.value)}/>
                    </label>
                </div>

                <div className="col-12 mb-4">

                    <label>
                        Password:
                        <input type="password" placeholder="Password" value={password} onChange={(event)=>setPassword(event.target.value)}/>
                    </label>
                </div>


                <div className="col-12 mb-4">

                    <label>
                        Role:
                        <select value={role} onChange={(event)=>setRole(event.target.value)}>
                            <option value="">:: USER ROLE ::</option>
                            <option value="ADMIN">ADMIN</option>
                            <option value="REGULAR_USER">REGULAR USER</option>
                        </select>
                    </label>
                </div>

                <button type="submit" className="btn btn-primary">Update Record</button>
            </form>
        </div>
    );
}

export default UpdateUser;