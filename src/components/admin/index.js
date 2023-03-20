import axios from "axios";
import React from "react";
import ActiveAdmin from "./activeAdmin";
import { Button } from '@mui/material';

export default function Admin() {
    const [session, setSession] = React.useState(false)
    const [status, setStatus] = React.useState(true);
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        if (status) {
            axios.post('http://127.0.0.1:1000/getUsers').then((result) => {
                console.log(result);
                makeElement(result.data);
            })
            setStatus(false);
        }
    }, [status])

    const DeleteById = (item) => {
        axios.post("http://127.0.0.1:1000/deleteUserById", { id: item._id }).then((result) => {
            alert("User Removed");
            setStatus(true);
        })
    }

    const makeElement = (list) => {
        if (list.length === 0)
            setData(<h3 style={{ fontFamily: 'monospace', color: 'red' }}> No user have registered</h3>);
        else {
            setData(list.map((item) => (
                <tr scope='row'>
                    <td><h3>{item.fullname}</h3></td>
                    <td><h3>{item.email}</h3></td>
                    <td><h3>{item.phone}</h3></td>
                    <td><Button onClick={() => { DeleteById(item) }} variant="standard">Remove</Button></td>
                </tr>
            )))
        }
    }

    if (!session) {
        return (
            <ActiveAdmin session={setSession} />
        )
    }
    else {
        return (
            <div>
                <h1 style={{ marginTop: '20px', textAlign: 'center' }}>Welcome Admin</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Full Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Contact Details</th>
                            <th scope="col">Remove</th>
                        </tr>
                    </thead>
                    <tbody style={{textAlign:'center'}}>
                        {data}
                    </tbody>

                </table>
            </div>
        )
    }
}