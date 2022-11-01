import React from 'react';
import articles from '../../temp/articleData';

export default function NewsCardList(props) {
  return (
    <div className='cards-list'>
      {articles &&
        articles.map((article) => {
          return (
            <props.cardTemplate
              key={article._id}
              article={article}
              isSaved={props.isSaved}
            />
          );
        })}
    </div>
  );
}
