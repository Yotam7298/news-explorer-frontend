import React from 'react';

export default function Main(props) {
  return (
    <div className='main'>
      {props.isLoading ? (
        props.children[0]
      ) : props.saved ? (
        props.children[1]
      ) : (
        <div className='main__content'>
          {props.searchResults.length ? (
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
