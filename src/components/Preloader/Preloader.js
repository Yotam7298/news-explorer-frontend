import React from 'react';

export default function Preloader(props) {
  return (
    <div className='preloader'>
      <div className='preloader__spin' />
      <p className='preloader__text'>
        {props.saved ? 'Loading your news...' : 'Searching for news...'}
      </p>
    </div>
  );
}
