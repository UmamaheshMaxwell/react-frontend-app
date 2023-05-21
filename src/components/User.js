import React, { useState, useEffect } from 'react'
import { userApi } from '../ApiStore/User'

const User = () => {
    const [userList, setUserList] = useState([])
    const [user, setUser] = useState({
        id: "",
        waddress: "",
        claimed: "",
        signature: ""
    })

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = () => {
        userApi.get("/user")
            .then(response => {
                console.log(response.data)
                setUserList(response.data)
            })
    }

    const addUser = () => {
        const postRequest = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                waddress: user.waddress,
                claimed: user.claimed,
                signature: user.signature
            })
        }

        fetch("https://node-api-service-3imv474m7a-uc.a.run.app/api/user", postRequest)
            .then(response => response.json())
            .then(data => {
                clearFields()
                getUsers()
            })
    }

    const clearFields = () => {
        setUser({...user,
            waddress: '',
            claimed: '',
            signature: ''
        })
        
    }

    const editUser = user => {
        console.log(user)
        setUser({waddress: user.waddress})

    }

    const updateUser = () => {
        const putRequest = {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                city: this.state.city
            })
        }

        fetch(`http://localhost:3001/api/students/${this.state._id}`, putRequest)
            .then(() => {
                clearFields()
                getUsers()
            })
    }

    const deleteUser = studentId => {
        fetch(`http://localhost:3001/api/students/${studentId}`, { method: "DELETE" })
            .then(() => getUsers())
    }

    return (
        <div>
            <h1>User List</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>WAddress</th>
                        <th>Claimed</th>
                        <th>Signature</th>
                        <th colSpan={2}>Actions</th>
                    </tr>
                    <tr>
                        <th>
                            <input type="text"
                                value={user.waddress}
                                onChange={(event) => setUser({...user, waddress: event.target.value })}
                            />
                        </th>
                        <th>
                            <input type="text"
                                value={user.claimed}
                                onChange={(event) => setUser({...user, claimed: event.target.value })}
                            />
                        </th>
                        <th>
                            <input type="text"
                                value={user.signature}
                                onChange={(event) => setUser({...user, signature: event.target.value })}
                            />
                        </th>
                        <th>
                            <button className="btn btn-primary"
                                onClick={() => addUser()}
                            >Add</button>
                        </th>
                        <th>
                            <button className="btn btn-warning"
                                onClick={() => updateUser()}
                            >Update</button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userList.map(user => (
                            <tr key={user.id}>
                                <td>{user.waddress}</td>
                                <td>{user.claimed}</td>
                                <td>{user.signature}</td>
                                <td>
                                    <button className="btn btn-warning" onClick={() => editUser(user)}>Edit</button>
                                </td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => deleteUser(user.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default User