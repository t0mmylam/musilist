import React from "react";
const Album = (props) => (
  <div className="card">
    <div
      className="card-image"
      href={"/album/" + props.album.id}
      data-image-full={props.album.image}
    >
      <img
        src={props.album.image}
        alt={props.album.name + " - " + props.album.artist}
      />
    </div>
    <div className="card-description" href={"/album/" + props.album.id}>
      <h2>
        {props.index + ". " + props.album.name + " - " + props.album.artist}
      </h2>
      <p>{props.album.rating + " | " + props.album.users}</p>
    </div>
  </div>
);
export default Album;
