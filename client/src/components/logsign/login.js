import React, { useState } from 'react'
import { useNavigate, useHistory } from 'react-router-dom'
import './logsign.css'

export default function Login() {
    const [form, setForm] = useState({
        username: "",
        password: "",
    })
    const navigate = useNavigate()

    function updateForm(value) {
        return setForm((prev) => {
            return {...prev, ...value}
        })
    }

    async function handleClick(e) {
        e.preventDefault()
        const newUser = {...form}
        let count = 0
        console.log(`http://localhost:4000/api/users?username=`+newUser.username+`&password=`+newUser.password)
        await fetch(`http://localhost:4000/api/users?username=`+newUser.username+`&password=`+newUser.password).then((response) => response.json())
        .then((data) => {
            // console.log(data)
            count = data.count
        })
        if (count === 0) {
            alert('Username or password incorrect')
            return
        }
        
        let user
        await fetch(`http://localhost:4000/api/users/`+newUser.username)
        .then((response) => response.json())
        .then((data) => {
            // console.log(data)
            user = data[0]
        })
        
        localStorage.setItem('user', JSON.stringify(user))
        setForm({username: "", password: ""})
        navigate("/")
        navigate(0)
    }

    return (
        <div className="form container">
            <h3>Login</h3>
            <form id="login" onSubmit={handleClick}>
                <input type="Username" placeholder="Username" className="ml-input" autoComplete="off" onChange={(e) => updateForm({ username : e.target.value})}></input>
                <input type="Password" placeholder="Password" className="ml-input" autoComplete="off" onChange={(e) => updateForm({ password : e.target.value})}></input>
            </form>
            <button type="submit" form="login" value="Submit">Login</button>
            <a href="/forgot" className="link-log">Forgot Password?</a>
            <a href="/signup" className="link-log">Not registered? Create an account</a>
        </div>
    )
}