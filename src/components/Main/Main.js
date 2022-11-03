import React from 'react';

export default function Main(props) {
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <div className='main'>
      {/* prettier-ignore */}
      {isLoading ? (
        props.saved ? (
          <div className='main__loading'>
            {props.children[0]}
            <p className='main__loading-text'>Loading your news...</p>
          </div>
        ) : (
          <div className='main__loading'>
            {props.children[0]}
            <p className='main__loading-text'>Searching for news...</p>
          </div>
        )
      ) : props.saved ? (
        props.children[1]
      ) : (
        <div className='main__content'>
          <h3 className='main__title'>Search results</h3>
          {props.children[1]}
          <button className='main__button'>Show more</button>
        </div>
      )}
    </div>
  );
}
