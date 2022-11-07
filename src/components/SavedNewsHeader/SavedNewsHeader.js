import React from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';

export default function SavedNewsHeader(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <div className='saved-header'>
      {props.children}
      <div className='saved-header__content'>
        <p className='saved-header__pretitle'>Saved articles</p>
        <h2 className='saved-header__title'>
          {`${currentUser.name}, you have ${props.savedArticles.length} saved articles`}
        </h2>
        <h3 className='saved-header__keywords'>
          By keywords:&nbsp;
          <span className='saved-header__keywords-content'>
            Nature, Yellowstone, and 2 other
          </span>
        </h3>
      </div>
    </div>
  );
}
