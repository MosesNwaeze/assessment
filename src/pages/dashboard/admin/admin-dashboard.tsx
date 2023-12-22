import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import db from "../../../utils/db.json"
import {UserModelType} from "../../../models/userModel";


const AdminDashboard = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState(db);

    let sn = 0;
    useEffect(()=>{},[users])
    const removeUser = (event:any, index: number) => {
        event.preventDefault();
        users.splice(index,1)
        setUsers([...users]);
    }

    const updateUser = (event:any,row:any) => {
        event.preventDefault();
        navigate("/update-user",{state: {email: row?.email}})
    };
    return (
        <div className="text-center">
            <h1 className="my-5">admin dashboard</h1>
            <div className="table-responsive">

                <table className="table">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>

                    <tbody>
                    {
                        users.map((row,index)=>(
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{row.name}</td>
                                <td>{row.email}</td>
                                <td>{row.role}</td>
                                <td>Active</td>
                                <td className="d-flex">
                                    <button className="btn text-white me-4 bg-success" type="button" onClick={(event)=>updateUser(event,row)}>
                                        Update
                                    </button>
                                    |
                                    <button type="button" className="btn text-white ms-4 bg-danger" onClick={(event) => removeUser(event,index)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
