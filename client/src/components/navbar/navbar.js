import React from 'react';
import { MenuItems } from "./items"
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
          <h1 className="navbar-logo"><i className="fa-solid fa-music"></i> MusiList</h1>
          <ul className='nav-menu'>
            {MenuItems.map((item, index) => {
              return (
                <li key={index}>
                  <a href={item.url} className='nav-links'>
                    {item.title}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
        <div className={this.state.clicked ? 'navbox active' : 'navbox'}>

        </div>
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