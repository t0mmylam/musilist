import React from 'react'

import {Route, Routes} from 'react-router-dom'

import AlbumList from './components/albumList'
import Create from './components/create'

const App = () => {
    return (
        <div>
            <h1>ALBUMS</h1>
            <Routes>
                <Route exact path ="/" element={<AlbumList />} />
                <Route path="/create" element={<Create />} />
            </Routes>
        </div>
    )
}

export default App