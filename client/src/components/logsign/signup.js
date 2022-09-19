import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './logsign.css'

export default function Signup() {
    const [form, setForm] = useState({
        username: "",
        password: "",
        access: "",
    })
    const navigate = useNavigate()

    function updateForm(value) {
        return setForm((prev) => {
            return {...prev, ...value}
        })
    }

    function generateToken(n) {
        var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var token = '';
        for(var i = 0; i < n; i++) {
            token += chars[Math.floor(Math.random() * chars.length)];
        }
        return token;
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        form.access = generateToken(30)
        const newUser = {...form}
        if (document.getElementById('confirmPassword').value !== newUser.password) {
            alert("Passwords do not match.")
            return
        }
        let count = 0
        fetch(`http://localhost:4000/api/username?username=`+newUser.username).then((response) => {
            response.json()
            count = response.count
        })
        if (count !== 0) {
            alert('Username already exists.')
            return
        }
        
        fetch("http://localhost:4000/api/users/add", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(newUser),
        })
        .catch(error => {
            window.alert(error)
            return
        })
        setForm({username: "", password: "", access: ""})
        navigate("/")
    }
    return (
        <div className="form container">
            <h3>Sign up to MusiList</h3>
            <form id="login" onSubmit={handleSubmit}>
                <input value={form.username} onChange={(e) => updateForm({ username : e.target.value})} required type="Text" placeholder="Username" className="ml-input" autoComplete="off"></input>
                <input value={form.password} onChange={(e) => updateForm({ password : e.target.value})} name="password" type="Password" placeholder="Password" className="ml-input" autoComplete="off"></input>
                <input id="confirmPassword" name="confirm_password" type="Password" placeholder="Confirm Password" className="ml-input" autoComplete="off"></input>
            </form>
            <button type="submit" form="login" value="Submit">Sign Up</button>
            <a href="/login" className="link-log">Sign Up</a>
            <a href="/reverify" className="link-log">Resend Verification Email</a>
        </div>
    )
}