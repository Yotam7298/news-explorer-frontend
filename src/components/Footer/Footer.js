import React from 'react';
import githubIcon from '../../images/github.svg';
import facebookIcon from '../../images/facebook.svg';

export default function Footer() {
  return (
    <div className='footer'>
      <p className='footer__copyright'>© 2022 Supersite, Powered by News API</p>
      <nav className='footer__navigation'>
        <a href='/' target='_blank' rel='noreferrer' className='footer__link'>
          Home
        </a>
        <a
          href='https://www.practicum.com/'
          target='_blank'
          rel='noreferrer'
          className='footer__link'
        >
          Practicum
        </a>
        <a
          href='https://www.github.com/'
          target='_blank'
          rel='noreferrer'
          className='footer__icon'
        >
          <img
            src={githubIcon}
            alt='github icon linking to their webpage'
            className='footer__icon-image'
          />
        </a>
        <a
          href='https://www.facebook.com/'
          target='_blank'
          rel='noreferrer'
          className='footer__icon'
        >
          <img
            src={facebookIcon}
            alt='github icon linking to their webpage'
            className='footer__icon-image'
          />
        </a>
      </nav>
    </div>
  );
}
