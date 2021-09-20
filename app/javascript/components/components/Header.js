import React, { Component } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';


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
        {/* <meta content="width=device-width, initial-scale=1" name="viewport" /> */}
        <div className='nav-bar'>
        <ul><NavLink tag={RRNavLink} to="/" className='nav-link'>Home</NavLink>{" "}</ul>
        <ul><NavLink tag={RRNavLink} to="/aboutus" className='nav-link'>About Us</NavLink>{" "}</ul>
        <ul><NavLink tag={RRNavLink} to="/cryptoinfo" className='nav-link'>Crypto Basics</NavLink></ul>
        <ul>{ this.props.logged_in && <NavLink tag={RRNavLink} to="/portfolio" className='nav-link'>My Portfolio</NavLink>}</ul>
        <ul>{ this.props.logged_in && <NavLink tag={RRNavLink} to="https://github.com/Weeb-Developers/Weeb-Coin" className='nav-link'>Weeb Coin GitHub</NavLink>}</ul>
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

          <Navbar className='resposive-nav-bar' color="faded" light>
            <NavbarBrand href="/" className="mr-auto">Home</NavbarBrand>
            <NavbarToggler onClick={this.toggle} className="mr-2" />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav navbar>
                <NavItem>
                  <NavLink href="/aboutus">About Us</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/cryptoinfo">Crypto Basics</NavLink>
                </NavItem>
                {this.props.logged_in &&
                  <NavItem>
                    <NavLink href="/portfolio">My Portfolio </NavLink> 
                  </NavItem>
                }
                {logged_in && 
                  <NavItem> 
                    <NavLink href={sign_out_route} className="nav-link">Sign Out</NavLink>
                  </NavItem>
                }
                {!logged_in && 
                  <NavItem> 
                    <NavLink href={sign_in_route} className="nav-link">Sign in</NavLink>
                  </NavItem>
                }
                <NavItem>
                  <NavLink href="https://github.com/Weeb-Developers/Weeb-Coin">Weeb-Coin GitHub</NavLink>
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
