// Imports
// React
import React from 'react';

export default function Header(props) {
  return (
    <div className='header'>
      {props.children[0]}
      <div className='header__content'>
        <h1 className='header__title'>What's going on in the world?</h1>
        <h2 className='header__subtitle'>
          Find the latest news on any topic and save them in your personal
          account.
        </h2>
        {props.children[1]}
      </div>
    </div>
  );
}
