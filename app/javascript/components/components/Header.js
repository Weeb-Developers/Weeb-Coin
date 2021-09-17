import React, { Component } from "react";
import { NavLink } from "react-router-dom";


class Header extends Component {
  render() {
    const { logged_in, sign_in_route, sign_out_route } = this.props;
    return (
      <>
        <header>
        <div className='nav-bar'>
        <ul><NavLink to="/" className='nav-link'>Home</NavLink>{" "}</ul>
        <ul><NavLink to="/aboutus" className='nav-link'>About Us</NavLink>{" "}</ul>
        <ul><NavLink to="/cryptoinfo" className='nav-link'>Crypto Basics</NavLink></ul>
        <ul>{ this.props.logged_in && <NavLink to="/portfolio" className='nav-link'>My Portfolio</NavLink>}</ul>
        <ul>
          {logged_in && (
            <a href={sign_out_route} className="nav-link">
              Sign Out
            </a>
          )}
        </ul>
        <ul>
          {!logged_in && (
            <a href={sign_in_route} className="nav-link">
              Sign In
            </a>
          )}
        </ul>
        </div>
        </header>
      </>
    );
  }
}
export default Header;
