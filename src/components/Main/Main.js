// Imports
// React
import React from 'react';
// Contexts
import SavedArticlesContext from '../../contexts/SavedArticlesContext';

export default function Main(props) {
  // Contexts consts
  const savedArticles = React.useContext(SavedArticlesContext);
  // Variables
  let articles = JSON.parse(localStorage.getItem('articles'));

  // useEffect
  React.useEffect(() => {
    if (props.saved) {
      props.getSavedArticles();
    } else {
      articles = JSON.parse(localStorage.getItem('articles'));
    }
  }, []);

  return (
    <div className='main'>
      {props.isLoading ? (
        props.children[0]
      ) : props.saved ? (
        <div className='main__content'>
          {savedArticles.length ? props.children[1] : props.children[2]}
        </div>
      ) : (
        <div className='main__content'>
          {articles && articles.length ? (
            <div>
              <h3 className='main__title'>Search results</h3>
              {props.children[1]}
            </div>
          ) : (
            props.children[2]
          )}
        </div>
      )}
    </div>
  );
}
