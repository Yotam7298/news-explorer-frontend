import React from 'react';

export default function Main(props) {
  // eslint-disable-next-line
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <div className='main'>
      {isLoading ? (
        props.children[0]
      ) : props.saved ? (
        props.children[1]
      ) : (
        <div className='main__content'>
          <h3 className='main__title'>Search results</h3>
          {props.children[1]}
          <button className='main__button'>Show more</button>
        </div>
      )}

      {props.children[0]}
      {props.children[2]}
    </div>
  );
}
