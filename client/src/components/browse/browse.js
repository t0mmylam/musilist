import React, { useState, useEffect } from "react";
import AlbumCard from '../albumcard/albumcard'
import "./browse.css";

export default function Browse() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    async function getAlbums() {
      const response = await fetch(`http://localhost:4000/albums/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const albums = await response.json();
      setAlbums(albums);
    }
    getAlbums();

    return;
  }, [albums.length]);

  function albumCards() {
    return albums.map((album, index) => {
      return (
      <li key={index}>
        <AlbumCard album={album} index={index+1}/>
      </li>
      );
    });
  }

  return (
    <div>
      <div className="card-list">{albumCards()}</div>
    </div>
  );
}
