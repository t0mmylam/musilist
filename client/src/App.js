import React from 'react'

import {Route, Routes} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import AlbumList from './components/albumList'
import Create from './components/create'
import Navbar from './components/navbar/navbar'

const App = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route exact path ="/" element={<AlbumList />} />
                <Route path="/create" element={<Create />} />
            </Routes>
        </div>
    )
}

export default App