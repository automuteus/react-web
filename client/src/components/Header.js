import React from "react";

import { Navbar, Nav } from "react-bootstrap";

import "./Header.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faGithub } from "@fortawesome/free-brands-svg-icons";

import logo from "../assets/img/logo_embed.png";
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <Navbar bg="transparent" variant="dark" expand="lg">
        <Navbar.Toggle aria-controls="primary-navbar-nav" />
        <Link to={"/"}>
          <Navbar.Brand>
            <img
              src={logo}
              width="50"
              height="50"
              className="d-inline-block align-top"
              alt="AutoMuteUs"
            />
          </Navbar.Brand>
        </Link>
        <Navbar.Collapse id="primary-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="https://discord.gg/vwWXs8Z" target="_blank">
              Discord Support Server
            </Nav.Link>
            <Nav.Link href="https://github.com/denverquane/automuteus#commands">
              Commands
            </Nav.Link>
            <Nav.Link href="https://youtu.be/kO4cqMKV2yI">Tutorials</Nav.Link>
            <Nav.Link
              href="https://github.com/denverquane/automuteus"
              target="_blank"
            >
              <FontAwesomeIcon icon={faGithub} size="lg" className="mr-2" />
              GitHub
            </Nav.Link>
          </Nav>
          <hr className="d-lg-none border border-white" />
          <Nav className="d-none">
            <Nav.Link to={"./auth"}>
              <FontAwesomeIcon icon={faDiscord} size="lg" className="mr-2" />
              Log In
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;