import React from 'react';

export default function SearchForm(props) {
  const [searchQuery, setSearchQuery] = React.useState('');

  function handleChange(evt) {
    setSearchQuery(evt.target.value);
  }

  function submitSearch(evt) {
    evt.preventDefault();
    props
      .searchReq(searchQuery)
      .then((articles) => props.setSearchResults(articles));
  }

  return (
    <form className='search-form'>
      <fieldset className='search-form__fieldset'>
        <input
          type='text'
          name='search'
          placeholder='Enter topic'
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
