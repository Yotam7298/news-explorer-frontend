import React from 'react';
import articles from '../../temp/articleData';

export default function NewsCardList(props) {
  const [shownCards, setShownCards] = React.useState(3);

  function addCards() {
    setShownCards(shownCards + 3);
  }

  return (
    <div className='cards-list'>
      <ul className='cards-list__list'>
        {props.searchResults &&
          props.searchResults.slice(0, shownCards).map((article, index) => {
            return (
              <li key={index} className='cards-list__card'>
                {React.cloneElement(props.children, {
                  key: index,
                  article,
                })}
              </li>
            );
          })}
      </ul>
      {props.searchResults.length > shownCards && (
        <button onClick={addCards} className='cards-list__button'>
          Show more
        </button>
      )}
    </div>
  );
}
