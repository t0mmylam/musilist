import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Album = (props) => (
    <tr>
        <td>{props.album.name}</td>
        <td>{props.album.artist}</td>
        <td>{props.album.released}</td>
        <td>{props.album.rating}</td>
        <td>{props.album.language}</td>
    </tr>
)

export default function AlbumList() {
    const [albums, setAlbums] = useState([])

    useEffect(() => {
        async function getAlbums() {
            const response = await fetch(`http://localhost:4000/albums/`)

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`
                window.alert(message)
                return
            }
            const albums = await response.json()
            setAlbums(albums)
        }
        getAlbums()

        return
    }, [albums.length])

    async function deleteAlbum(id) {
        await fetch(`http://localhost:4000/${id}`, {
            method: "DELETE"
        })

        const newAlbums = albums.filter((el) => el._id !== id)
        setAlbums(newAlbums)
    } 

    function albumList() {
        return albums.map((album) => {
            return (
                <Album 
                    album={album}
                    deleteAlbums={() => deleteAlbum(album._id)}
                    key={album._id}
                />
            )
        })
    }

    return (
        <div>
            <h3>Album List</h3>
            <table className="table table-striped" style={{ marginTop: 20}}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Artist</th>
                        <th>Release Date</th>
                        <th>Rating</th>
                        <th>Language</th>
                    </tr>
                </thead>
                <tbody>{albumList()}</tbody>
            </table>
        </div>
    )
}