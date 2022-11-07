import React from 'react';

export default function SearchForm(props) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchPreholder, setSearchPreholder] = React.useState('Enter topic');

  function handleChange(evt) {
    setSearchQuery(evt.target.value);
  }

  function submitSearch(evt) {
    evt.preventDefault();

    if (searchQuery) {
      props.setIsLoading(true);
      props.setArticles(true);
      props
        .searchReq(searchQuery)
        .then((articles) => {
          const newArticles = articles.map((article) =>
            convertArticle(article)
          );
          props.setArticles(newArticles);
        })
        .catch((err) => props.reportError(err))
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

    return newArticle;
  }

  return (
    <form className='search-form'>
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
