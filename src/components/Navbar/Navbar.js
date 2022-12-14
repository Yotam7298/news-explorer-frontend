import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import signOutSaved from '../../images/logout.svg';
import signOutHome from '../../images/logout-white.svg';
import menuHome from '../../images/mobile-menu.svg';
import menuSaved from '../../images/mobile-menu_saved.svg';

export default function Navbar(props) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  function signButton() {
    setIsMenuOpen(false);
    props.setIsOpen(true);
  }

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <nav
      className={`navbar ${props.saved ? 'navbar_saved' : ''} ${
        isMenuOpen ? 'navbar_menu-open' : ''
      }`}
    >
      <Link to='/' className='navbar__logo'>
        NewsExplorer
      </Link>
      <NavLink
        exact
        to='/'
        className='navbar__linkbox'
        activeClassName='navbar__linkbox_selected'
      >
        <p className='navbar__link'>Home</p>
      </NavLink>
      <NavLink
        exact
        to='/saved-news'
        className='navbar__linkbox'
        activeClassName='navbar__linkbox_selected'
      >
        <div className='navbar__link'>Saved Articles</div>
      </NavLink>
      <button onClick={() => props.setIsOpen(true)} className='navbar__signin'>
        Sign In
      </button>
      <button className='navbar__signout'>
        Elise
        <img
          className='navbar__signout-icon'
          alt='Icon for logging out'
          src={props.saved ? signOutSaved : signOutHome}
        />
      </button>
      <img
        src={props.saved ? menuSaved : menuHome}
        alt='menu toggle button'
        onClick={toggleMenu}
        className='navbar__menu-button'
      />
      <div className='navbar__menu navbar__menu_open'>
        <NavLink to='/' className='navbar__menu-link'>
          Home
        </NavLink>
        <NavLink to='/saved-news' className='navbar__menu-link'>
          Saved News
        </NavLink>
        <button onClick={signButton} className='navbar__signin'>
          Sign In
        </button>
      </div>
    </nav>
  );
}
