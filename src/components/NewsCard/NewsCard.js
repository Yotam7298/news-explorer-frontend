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
  const [articleId, setArticleId] = React.useState('');
  const isLoggedIn = React.useContext(LoggedInContext);

  function updateLocalStorage(url, options) {
    const currentArticles = JSON.parse(localStorage.getItem('articles'));
    console.log(currentArticles);
    const updatedArticles = currentArticles.map((article) => {
      if (article.link === url) {
        article._id = options._id;
        article.marked = options.marked;
      }
      return article;
    });
    console.log(updatedArticles);
    localStorage.removeItem('articles');
    localStorage.setItem('articles', JSON.stringify(updatedArticles));
  }

  function functionHovered() {
    setIsHover(true);
  }

  function functionEndHover() {
    setIsHover(false);
  }

  function addArticle() {
    const article = { ...props.article };
    delete article._id;
    delete article.marked;

    props.bookmarkReq(article).then((article) => {
      console.log(article);
      setArticleId(article._id);
      setIsMarked(true);
      updateLocalStorage(article.link, { _id: article._id, marked: true });
    });
  }

  function removeArticle() {
    const thisArticleId = articleId || props.article._id;
    props.removeReq(thisArticleId).then(() => {
      setIsMarked(false);
      updateLocalStorage(props.article.link, {
        _id: thisArticleId,
        marked: false,
      });
      if (props.saved) {
        props.reloadSavedArticles();
      }
    });
  }

  React.useEffect(() => {
    setIsMarked(props.article.marked);
  }, []);

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
              isLoggedIn
                ? isMarked
                  ? removeArticle
                  : addArticle
                : props.setIsPopupOpen
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
