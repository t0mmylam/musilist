import React from 'react'

import {Route, Routes} from 'react-router-dom'

import AlbumList from './components/albumList'

const App = () => {
    return (
        <div>
            <h1>ALBUMS</h1>
            <Routes>
                <Route exact path ="/" element={<AlbumList />} />
            </Routes>
        </div>
    )
}

export default App