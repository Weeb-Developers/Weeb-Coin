import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';


class Header extends Component {
  constructor(){
    super();
    this.state = {
      isOpen: false
    } 
  }

  toggle = () => {
    let newOpenState = !this.state.isOpen;
    this.setState({ isOpen: newOpenState });
  };

  render() {
    const { logged_in, sign_in_route, sign_out_route } = this.props;
    return (
      <>
        <header>
        <div className='nav-bar'>
          <div className="nav-home">
            <ul><NavLink to="/" className='nav-link'>Weeb Coin</NavLink>{" "}</ul>
          </div>
          <div className="nav-list">
            <ul><NavLink to="/aboutus" className='nav-link'>About Us</NavLink>{" "}</ul>
            <ul><NavLink to="/cryptoinfo" className='nav-link'>Crypto Basics</NavLink></ul>
            <ul>{ this.props.logged_in && <NavLink to="/portfolio" className='nav-link'>My Portfolio</NavLink>}</ul>
            <ul>{ this.props.logged_in && <a href="https://github.com/Weeb-Developers/Weeb-Coin" className='nav-link'>Weeb Coin GitHub</a>}</ul>
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
        </div>

          <Navbar className='resposive-nav-bar' color="faded" light>
            <NavbarBrand className="mr-auto"><NavLink to="/">Weeb Coin</NavLink></NavbarBrand>
            <NavbarToggler onClick={this.toggle} className="mr-2" />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav navbar>
                <NavItem>
                  <NavLink to="/aboutus">About Us</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/cryptoinfo">Crypto Basics</NavLink>
                </NavItem>
                {this.props.logged_in &&
                  <NavItem>
                    <NavLink to="/portfolio">My Portfolio </NavLink> 
                  </NavItem>
                }
                {logged_in && 
                  <NavItem> 
                    <a href={sign_out_route} className="nav-link">Sign Out</a>
                  </NavItem>
                }
                {!logged_in && 
                  <NavItem> 
                    <a href={sign_in_route} className="nav-link">Sign in</a>
                  </NavItem>
                }
                <NavItem>
                  <a href="https://github.com/Weeb-Developers/Weeb-Coin">Weeb-Coin GitHub</a>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
    
        </header>
      </>
    );
  }
}
export default Header;
