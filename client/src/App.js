import React from 'react'

import {Route, Routes} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import Add from './components/add/add'
import Navbar from './components/navbar/navbar'
import Login from './components/logsign/login'
import SignUp from './components/logsign/signup'
import Profile from './components/profile/profile'
import './App.css'

const App = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route exact path ="/" element={<Profile />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/signup" element={<SignUp />} />
                <Route exact path="/add" element={<Add />} />
                <Route path="/user/:username" element={<Profile />} />
            </Routes>
        </div>
    )
}

export default App