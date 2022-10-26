import React from 'react';
import { Link } from 'react-router-dom';
import signOutImage from '../../images/logout.svg'

export default function Navbar() {
    return (
        <div className='navbar'>
            <button className='navbar__logo'>NewsExplorer</button>
            <Link to='/' className='navbar__linkbox'>
                <p className='navbar__link'>Home</p>
            </Link>
            <Link to='saved-news' className='navbar__linkbox navbar__linkbox_selected'>
                <div className='navbar__link'>Saved Articles</div>
            </Link>
            <button className='navbar__signin'>Sign In</button>
            {/* <button className='navbar__signout'>
                Elise
                <img className='navbar__signout-icon' alt='Icon for logging out' src={signOutImage} />
            </button> */}
        </div>
    )
}