import React from 'react';
import notFoundImage from '../../images/not-found.svg';

export default function NotFound(props) {
  return (
    <div className='not-found'>
      <img
        src={notFoundImage}
        alt='nothing found'
        className='not-found__image'
      />
      <h3 className='not-found__title'>Nothing found</h3>
      <p className='not-found__paragraph'>
        {props.saved
          ? 'Nothing was found, You might not have any saved article or the server returned an error'
          : 'Sorry, but nothing matched your search terms.'}
      </p>
    </div>
  );
}
