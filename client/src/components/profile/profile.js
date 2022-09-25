import React, { useEffect, useState } from 'react'
import './profile.css';

const Album = (props) => (
    <tr>
        <td><img className="cover" alt="" src={"https://musilistimages.s3.amazonaws.com/albums/"+props.album.name.replace(' ', '')+props.album.artist.replace(' ', '')+".jpeg"}></img></td>
        <td>{props.album.name}</td>
        <td>{props.album.artist}</td>
        <td>{props.album.released.substring(0, 10)}</td>
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

    function albumList() {
        return albums.map((album) => {
            return (
                <Album 
                    album={album}
                    key={album.id}
                />
            )
        })
    }

    return (
        <div id="table">
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
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