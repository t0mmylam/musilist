import React, { useState, useEffect } from 'react';
import './navbar.css';

export default function Navbar() {
  const [user, setUser] = useState("")
  const [state, setState] = useState({clicked:false})
  
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user")
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      console.log(foundUser)
      setUser(foundUser);
    }
  }, []);

  const handleClick = () => {
    setState({ clicked: !state.clicked })
  }

  if (user) {
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
            <a href={"/user/" + user.username} className="nav-links"><img width="25" alt='' src={user.image}></img></a>
          </div>
        </nav>
        <i className={state.clicked ? 'hide' : 'fa-solid fa-bars'} onClick={handleClick}></i>
        <ul className={state.clicked ? 'nav-box active' : 'nav-box'}>
          <li><a className={state.clicked ? 'fa-solid fa-magnifying-glass link' : 'none'} href="/"></a></li>
          <li><a className={state.clicked ? 'fa-solid fa-house link' : 'none'} href="/"></a></li>
          <li><i className={state.clicked ? 'fa-solid fa-xmark' : 'hide'} onClick={handleClick}></i></li>
        </ul>
      </div>
    )
  } else {
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
        <i className={state.clicked ? 'hide' : 'fa-solid fa-bars'} onClick={handleClick}></i>
        <ul className={state.clicked ? 'nav-box active' : 'nav-box'}>
          <li><a className={state.clicked ? 'fa-solid fa-magnifying-glass link' : 'none'} href="/"></a></li>
          <li><a className={state.clicked ? 'fa-solid fa-house link' : 'none'} href="/"></a></li>
          <li><i className={state.clicked ? 'fa-solid fa-xmark' : 'hide'} onClick={handleClick}></i></li>
        </ul>
      </div>
    )
  }
}