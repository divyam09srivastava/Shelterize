import React from "react";
import firebase from "../firebase/base";
const Header = (props) => {
  return (
    <header id="header" className="header-scrolled">
      <div className="container main-menu">
        <div className="row align-items-center justify-content-between d-flex">
          <div id="logo">
            <a href="/">
              <h2>Shelterize</h2>
            </a>
          </div>
          <nav id="nav-menu-container">
            <ul className="nav-menu sf-js-enabled sf-arrows">
              <li className="menu-active">
                <a href="/">Home</a>
              </li>

              {props !== undefined &&
              props !== null &&
              props.currUser !== null ? (
                <li>
                  <a href="/profile">Profile</a>
                </li>
              ) : (
                <li>
                  <a href="/locate">Need help</a>
                </li>
              )}
              {props !== undefined &&
              props !== null &&
              props.currUser !== null ? (
                <></>
              ) : (
                <li>
                  <a href="/login">Want to help</a>
                </li>
              )}
              {props !== undefined &&
              props !== null &&
              props.currUser !== null ? (
                <button
                  onClick={() => {
                    firebase.logout();
                    window.location = "http://localhost:3000/";
                    //window.Location("/");
                  }}
                  className="form-btn"
                  style={{
                    borderRadius: "10px",
                    height: "30px",
                    lineHeight: " 0px",
                  }}
                >
                  Logout
                </button>
              ) : (
                <></>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
