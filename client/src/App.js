import React from 'react'

import {Route, Routes} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import AlbumList from './components/albumList'
import Create from './components/create'
import Navbar from './components/navbar/navbar'
import Login from './components/logsign/login'
import SignUp from './components/logsign/signup'
import './App.css'

const App = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route exact path ="/" element={<AlbumList />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/signup" element={<SignUp />} />
                <Route path="/create" element={<Create />} />
            </Routes>
        </div>
    )
}

export default App