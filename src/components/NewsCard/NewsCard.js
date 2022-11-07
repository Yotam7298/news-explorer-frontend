import React from 'react';
import { Link } from 'react-router-dom';
import bookmark from '../../images/bookmark.svg';
import bookmarkHover from '../../images/bookmark_hover.svg';
import bookmarkActive from '../../images/bookmark_active.svg';
import remove from '../../images/remove.svg';
import removeHover from '../../images/remove_hover.svg';
import LoggedInContext from '../../contexts/LoggedInContext';

export default function NewsCard(props) {
  const [isHover, setIsHover] = React.useState(false);
  const [isMarked, setIsMarked] = React.useState(false);
  const isLoggedIn = React.useContext(LoggedInContext);

  function functionHovered() {
    setIsHover(true);
  }

  function functionEndHover() {
    setIsHover(false);
  }

  function markArticle() {
    bookmarkArticle();
    setIsMarked(true);
  }

  function bookmarkArticle() {
    props.bookmarkReq(props.article);
  }

  function removeArticle() {
    props
      .removeReq(props.article._id)
      .then(() => {
        props.reloadSavedArticles();
      })
      .catch((err) => props.reportError(err));
  }

  return (
    <article className='news-card'>
      {props.saved && (
        <div className='news-card__keyword'>
          {props.article.keyword || 'Keyword'}
        </div>
      )}
      {props.saved ? (
        <div
          onClick={(evt) => evt.stopPropagation()}
          className='news-card__function'
        >
          <img
            src={isHover ? removeHover : remove}
            alt='remove button'
            onMouseEnter={functionHovered}
            onMouseLeave={functionEndHover}
            onClick={removeArticle}
            className='news-card__function-icon'
          />
          <div
            className={`news-card__function-message ${
              isHover ? 'news-card__function-message_show' : ''
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
            src={isMarked ? bookmarkActive : isHover ? bookmarkHover : bookmark}
            alt='bookmark button'
            onMouseEnter={functionHovered}
            onMouseLeave={functionEndHover}
            onClick={
              isLoggedIn ? (isMarked ? undefined : markArticle) : undefined
            }
            className='news-card__function-icon'
          />
          {!isLoggedIn && (
            <div
              className={`news-card__function-message ${
                isHover ? 'news-card__function-message_show' : ''
              }`}
            >
              Sign in to save article
            </div>
          )}
        </div>
      )}
      <img
        src={props.article.image}
        alt='illustration for news article'
        className='news-card__image'
      />
      <Link
        to={{ pathname: props.article.link }}
        target='_blank'
        className='news-card__text'
      >
        <p className='news-card__date'>{props.article.date}</p>
        <h5 className='news-card__title'>{props.article.title}</h5>
        <p className='news-card__paragraph'>{props.article.text}</p>
        <p className='news-card__source'>{props.article.source}</p>
      </Link>
    </article>
  );
}
