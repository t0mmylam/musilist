import React, { Component } from "react";
import { Modal } from "./Modal/modal";
import Album from './Album/album'

export class Popup extends Component {
  state = { isShown: false };
  showModal = () => {
    this.setState({ isShown: true }, () => {
      this.closeButton.focus();
    });
    this.toggleScrollLock();
  };
  closeModal = () => {
    this.setState({ isShown: false }, () => {
      this.TriggerButton.focus();
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
  render() {
    return (
      <React.Fragment>
        <Album
          album={this.props.album}
          buttonRef={(n) => (this.Album = n)}
          index={this.props.index}
        />
        {this.state.isShown ? (
          <Modal
            onSubmit={this.props.onSubmit}
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

export default Popup