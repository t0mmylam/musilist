import React from 'react';
import './navbar.css';

class Navbar extends React.Component {
  state = { clicked: false }

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked })
  }

  render() {
    return (
      <div>
        <nav className="NavbarItems">
          <h1 className="navbar-logo"><img width="25" alt='' src={require("./playlist.png")}></img> MusiList</h1>
          <ul className='nav-menu'>
            <li><a href="/" className="nav-links">Home</a></li>
            <li><a href="/" className="nav-links">Browse</a></li>
            <li><a href="/" className="nav-links">Forum</a></li>
          </ul>
          <div className="button-wrapper">
            <a href="/login" className="nav-links">Login</a>
            <a className="sign-up button" href="/signup">Sign Up</a>
          </div>
        </nav>
        <i className={this.state.clicked ? 'hide' : 'fa-solid fa-bars'} onClick={this.handleClick}></i>
        <ul className={this.state.clicked ? 'nav-box active' : 'nav-box'}>
          <li><a className={this.state.clicked ? 'fa-solid fa-magnifying-glass link' : 'none'} href="/"></a></li>
          <li><a className={this.state.clicked ? 'fa-solid fa-house link' : 'none'} href="/"></a></li>
          <li><i className={this.state.clicked ? 'fa-solid fa-xmark' : 'hide'} onClick={this.handleClick}></i></li>
        </ul>
      </div>
    )
  }
}

export default Navbar