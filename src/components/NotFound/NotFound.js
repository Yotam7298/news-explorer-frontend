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
        {props.isServerError
          ? 'Sorry, something went wrong during the request. There may be a connection issue or the server may be down. Please try again later.'
          : props.saved
          ? `You don't have any saved articles, Search for some news and click the bookmark icon to save them`
          : 'Sorry, but nothing matched your search terms.'}
      </p>
    </div>
  );
}
