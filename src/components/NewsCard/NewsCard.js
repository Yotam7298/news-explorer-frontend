import React from 'react';
import { Link } from 'react-router-dom';
import bookmark from '../../images/bookmark.svg';
import bookmarkHover from '../../images/bookmark_hover.svg';
import remove from '../../images/remove.svg';
import removeHover from '../../images/remove_hover.svg';

export default function NewsCard(props) {
  const [isHover, setIsHover] = React.useState(false);
  const [isMessageShow, setIsMessageShow] = React.useState(false);

  function functionHovered() {
    setIsHover(true);
  }

  function functionEndHover() {
    setIsHover(false);
  }

  function flipMessageShow() {
    setIsMessageShow(!isMessageShow);
  }

  return (
    <div className='news-card'>
      <div className='news-card__keyword'>{props.article.keyword}</div>
      {props.saved ? (
        <div
          onClick={(evt) => evt.stopPropagation()}
          className='news-card__function'
        >
          <img
            src={isHover ? removeHover : remove}
            alt='bookmark button'
            onMouseEnter={functionHovered}
            onMouseLeave={functionEndHover}
            onClick={flipMessageShow}
            className='news-card__function-icon'
          />
          <div
            className={`news-card__function-message ${
              isMessageShow ? 'news-card__function-message_show' : ''
            }`}
          >
            Remove from saved
          </div>
        </div>
      ) : (
        <div
          onClick={(evt) => evt.stopPropagation()}
          className='news-card__function'
        >
          <img
            src={isHover ? bookmarkHover : bookmark}
            alt='bookmark button'
            onMouseEnter={functionHovered}
            onMouseLeave={functionEndHover}
            onClick={flipMessageShow}
            className='news-card__function-icon'
          />
          <div
            className={`news-card__function-message ${
              isMessageShow ? 'news-card__function-message_show' : ''
            }`}
          >
            Sign in to save article
          </div>
        </div>
      )}
      <img
        src={props.article.image}
        alt='illustration for news article'
        className='news-card__image'
      />
      <Link
        to={{ pathname: 'https://google.com/' }}
        target='_blank'
        className='news-card__text'
      >
        <p className='news-card__date'>{props.article.date}</p>
        <h5 className='news-card__title'>{props.article.title}</h5>
        <p className='news-card__paragraph'>{props.article.text}</p>
        <p className='news-card__source'>{props.article.source}</p>
      </Link>
    </div>
  );
}
