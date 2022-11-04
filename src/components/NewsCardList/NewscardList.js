import React from 'react';
import articles from '../../temp/articleData';

export default function NewsCardList(props) {
  return (
    <ul className='cards-list'>
      {articles &&
        articles.map((article) => {
          return (
            <li className='cards-list__card'>
              {React.cloneElement(props.children, {
                key: article._id,
                article,
              })}
            </li>
          );
        })}
    </ul>
  );
}
