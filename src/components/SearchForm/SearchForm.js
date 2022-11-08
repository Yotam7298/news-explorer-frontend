// Imports
// React
import React from 'react';
// Contexts
import SavedArticlesContext from '../../contexts/SavedArticlesContext';

export default function SearchForm(props) {
  // State Variables
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchPreholder, setSearchPreholder] = React.useState('Enter topic');
  // Contexts consts
  const savedArticles = React.useContext(SavedArticlesContext);

  // Functions
  function handleChange(evt) {
    setSearchQuery(evt.target.value);
  }

  function submitSearch(evt) {
    evt.preventDefault();

    if (searchQuery) {
      props.setIsLoading(true);
      props.setArticles(true);
      setSearchPreholder('Enter topic');

      props
        .searchReq(searchQuery)
        .then((articles) => {
          const newArticles = articles.map((article) =>
            convertArticle(article)
          );
          localStorage.removeItem('articles');
          localStorage.setItem('articles', JSON.stringify(newArticles));
          props.setArticles(newArticles);
          props.getSavedArticles();
          props.setIsServerError(false);
        })
        .catch((err) => {
          props.setIsServerError(true);
          props.reportError(err);
        })
        .finally(() => {
          props.setIsLoading(false);
          props.setShowResults(true);
        });
    } else {
      setSearchPreholder('You have to enter a topic to search');
    }
  }

  function convertDate(date) {
    const year = date.slice(0, 4);
    const monthNumber = Number(date.slice(5, 7));
    const day = Number(date.slice(8, 10));

    const dateClass = new Date();
    dateClass.setMonth(monthNumber - 1);

    const monthName = dateClass.toLocaleString('en-US', { month: 'long' });

    return `${monthName} ${day}, ${year}`;
  }

  function convertArticle(article) {
    let newArticle = {};

    newArticle.image = article.urlToImage;
    newArticle.link = article.url;
    newArticle.date = convertDate(article.publishedAt);
    newArticle.title = article.title;
    newArticle.text = article.content;
    newArticle.source = article.source.name;
    newArticle.keyword = searchQuery;

    const savedArticle = savedArticles.find((art) => art.link === article.url);

    if (savedArticle) {
      newArticle.marked = true;
      newArticle._id = savedArticle._id;
    }

    return newArticle;
  }

  return (
    <form
      className={`search-form ${
        searchPreholder !== 'Enter topic' && 'search-form_error'
      }`}
    >
      <fieldset className='search-form__fieldset'>
        <input
          type='text'
          name='search'
          placeholder={searchPreholder}
          onChange={handleChange}
          className='search-form__input'
        />
        <button
          onClick={submitSearch}
          type='submit'
          className='search-form__submit'
        >
          Search
        </button>
      </fieldset>
    </form>
  );
}
