import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from "../../../App";
import db from "../../../utils/db.json";
import {UserModelType, UserRole} from "../../../models/userModel";
import {useNavigate} from "react-router-dom";

const RegularUserDashboard = () => {
    const {email} = useContext(AppContext);
    const [user, setUser] = useState(db.find(user => user.email === email));

    const handleDelete = (event: any) => {
        event.preventDefault();

        const index = db.findIndex(user => user.email === email);
        db.splice(index, 1);
        setUser({role: '', email: '',name:'',password: ''});
    }

    const User = user?.email ? (<dl>
            <dt>Name:</dt>
            <dd>{user?.name}</dd>

            <dt>Email:</dt>
            <dd>{user?.email}</dd>

            <dt>Role:</dt>
            <dd>{user?.role}</dd>
        </dl>)
        :
        (<h2>No User</h2>)
    return (
        <div className="text-center">
            <h1 className="my-5">Regular User Dashboard</h1>

            {User}

            {
                user?.email && (<button type="button" className="btn text-white bg-danger my-5" onClick={handleDelete}>Delete
                    User</button>)
            }
        </div>
    );
};

export default RegularUserDashboard;
