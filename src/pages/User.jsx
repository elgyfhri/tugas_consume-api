import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import axios from "axios";


export default function User() {

    const dataThParent = [
        "#",
        "UserName",
        "Email",
        "Role",
        "Action"
    ];

    const [users, setUsers] = useState({});

    useEffect(() => {
            axios.get('http://localhost:8000/users', {
                headers: {
                    'Authorization': 'bearer ' + localStorage.getItem('access_token'),
                }
            })
            .then(res => {
                const sortedUsers = res.data.data.sort((a, b) => a.email.localeCompare(b.email));
                setUsers(sortedUsers);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const coloumDataBase = {
        "username" : null,
        "email" : null,
        "role": null,
    }

    const button = [
        "edit",
        "delete",
        "create"
    ]

    const endpoints = {
        "detail" : "http://localhost:8000/users/{id}",
        "delete" : "http://localhost:8000/users/delete/{id}",
        "update" : "http://localhost:8000/users/update/{id}",
        "store" : "http://localhost:8000/users/store",
    }
    const columDetailModalDelete = 'username'

    const judulModalEdit = 'Users'

    const inputData = {
        "username": {
            "type": "text",
            "options": null,
        },
        "email": {
            "type": "text",
            "options": null,
        },
        "password": {
            "type": "password",
            "options": null,
        },
        "role": {
            "type": "select",
            "options": ['staff', 'admin'],
        },
    }

    return (
        <>
            <Navbar/>
            <div className="p-10">
            <Table 
            dataTh={dataThParent} 
            dataTd={users} 
            coloumDB={coloumDataBase} 
            buttonData={button} 
            endpoints={endpoints} 
            columDetail={columDetailModalDelete} 
            judulModalEdit={judulModalEdit} 
            inputData={inputData}>
            </Table>
            </div>
        </>
);
}