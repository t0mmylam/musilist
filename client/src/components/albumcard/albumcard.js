import React, { Component } from "react";
import { Modal } from "./Modal/modal";
import Album from './Album/album'
import './albumcard.css'

export class AlbumCard extends Component {
  state = { isShown: false };
  showModal = () => {
    this.setState({ isShown: true }, () => {
      this.closeButton.focus();
    });
    this.toggleScrollLock();
  };
  closeModal = () => {
    this.setState({ isShown: false }, () => {
      this.Album.focus();
      this.toggleScrollLock();
    });
  };
  onKeyDown = (event) => {
    if (event.keyCode === 27) {
      this.closeModal();
    }
  };
  onClickOutside = (event) => {
    if (this.modal && this.modal.contains(event.target)) return;
    this.closeModal();
  };
  toggleScrollLock = () => {
    document.querySelector("html").classList.toggle("scroll-lock");
  };
  onSubmit = () => {

  }
  render() {
    return (
      <React.Fragment>
        <Album
          album={this.props.album}
          showModal={this.showModal}
          buttonRef={(n) => (this.Album = n)}
          index={this.props.index}
        />
        {this.state.isShown ? (
          <Modal
            album={this.props.album}
            modalRef={(n) => (this.modal = n)}
            buttonRef={(n) => (this.closeButton = n)}
            closeModal={this.closeModal}
            onKeyDown={this.onKeyDown}
            onClickOutside={this.onClickOutside}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

export default AlbumCard