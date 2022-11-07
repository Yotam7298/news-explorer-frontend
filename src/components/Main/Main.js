import React from 'react';

export default function Main(props) {
  React.useEffect(() => {
    if (props.getSavedArticles) {
      props.getSavedArticles();
    }
  }, []);
  return (
    <div className='main'>
      {props.isLoading ? (
        props.children[0]
      ) : props.saved ? (
        <div className='main__content'>
          {props.articles.length ? props.children[1] : props.children[2]}
        </div>
      ) : (
        <div className='main__content'>
          {props.articles.length ? (
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
