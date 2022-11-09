// Imports
// React
import React from 'react';
// Contexts
import CurrentUserContext from '../../contexts/CurrentUserContext';
import SavedArticlesContext from '../../contexts/SavedArticlesContext';

export default function SavedNewsHeader(props) {
  // Contexts consts
  const currentUser = React.useContext(CurrentUserContext);
  const savedArticles = React.useContext(SavedArticlesContext);

  // Functions
  function keywords() {
    let keywords = [];
    let keywordsObj = {};

    savedArticles.forEach((article) => {
      keywords.push(article.keyword);
    });

    keywords.forEach((keyword) => {
      if (keywordsObj.hasOwnProperty(keyword)) {
        keywordsObj[keyword] += 1;
      } else {
        keywordsObj[keyword] = 1;
      }
    });

    const entries = Object.entries(keywordsObj).sort((a, b) => b[1] - a[1]);

    if (entries.length === 0) {
      return { length: entries.length };
    } else if (entries.length === 1) {
      return { max: entries[0][0], length: entries.length };
    } else {
      return {
        max: entries[0][0],
        secondMax: entries[1][0],
        length: entries.length,
      };
    }
  }

  function keywordsText() {
    const { max, secondMax, length } = keywords();
    switch (length) {
      case 0:
        return '';
      case 1:
        return max;
      case 2:
        return `${max}, ${secondMax}`;
      case 3:
        return `${max}, ${secondMax}, and 1 other`;
      default:
        return `${max}, ${secondMax}, and ${length - 2} others`;
    }
  }

  return (
    <div className='saved-header'>
      {props.children}
      <div className='saved-header__content'>
        <p className='saved-header__pretitle'>Saved articles</p>
        <h2 className='saved-header__title'>
          {`${currentUser.name}, you have ${savedArticles.length} saved articles`}
        </h2>
        <h3 className='saved-header__keywords'>
          By keywords:&nbsp;
          <span className='saved-header__keywords-content'>
            {keywordsText()}
          </span>
        </h3>
      </div>
    </div>
  );
}
