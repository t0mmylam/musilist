import React from 'react'
import './logsign.css'

export default function Login() {
    return (
        <div className="form container">
            <h3>Login</h3>
            <form id="login">
                <input type="Username" placeholder="Username" className="ml-input" autoComplete="off"></input>
                <input type="Password" placeholder="Password" className="ml-input" autoComplete="off"></input>
            </form>
            <button type="submit" form="login" value="Submit">Login</button>
            <a href="/forgot" className="link-log">Forgot Password?</a>
            <a href="/signup" className="link-log">Not registered? Create an account</a>
        </div>
    )
}