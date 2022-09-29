import React, { useState, useEffect } from "react";
import "./browse.css";

const AlbumCard = (props) => (
  <li className="card">
    <a
      className="card-image"
      href={"/album/" + props.album.id}
      data-image-full={props.album.image}
    >
      <img
        src={props.album.image}
        alt={props.album.name + " - " + props.album.artist}
      />
    </a>
    <a className="card-description" href={"/album/" + props.album.id}>
      <h2>{props.index + ". " + props.album.name + ' - '+props.album.artist}</h2>
      <p>{props.album.rating + ' | '+props.album.users}</p>
    </a>
  </li>
);

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
      return <AlbumCard album={album} index={index + 1} />;
    });
  }

  return (
    <div>
      <ul className="card-list">{albumCards()}</ul>
    </div>
  );
}
