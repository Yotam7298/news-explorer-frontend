import React from 'react';
import articles from '../../temp/articleData';

export default function NewsCardList(props) {
  return (
    <div className='cards-list'>
      {articles &&
        articles.map((article) => {
          return React.cloneElement(props.children, {
            key: article._id,
            article,
          });
        })}
    </div>
  );
}
