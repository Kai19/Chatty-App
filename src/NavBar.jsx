import React, {Component} from 'react';

// Class NavBar renders nav-bar of page which includes logo and count of online users
class NavBar extends Component {
  render() {
    return(
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty </a>
        <span className="online-users">{this.props.clientCount} users online</span>
      </nav>
    )
  }
}

export default NavBar;
