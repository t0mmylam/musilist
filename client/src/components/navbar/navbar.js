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
        <div className={this.state.clicked ? 'menu-icon active' : 'menu-icon'} onClick={this.handleClick}>
          <ul className={this.state.clicked ? 'nav-box active' : 'nav-box'}>
          <li className="linkitem"><a className='fa-solid fa-house link' href="/"></a></li>
          <li><a className='fa-solid fa-magnifying-glass link' href="/"></a></li>
          <li><i className={this.state.clicked ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'}></i></li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Navbar