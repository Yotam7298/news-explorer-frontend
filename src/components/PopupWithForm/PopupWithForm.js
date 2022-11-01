import React from 'react';

export default function PopupWithForm(props) {
  const [isSignIn, setIsSignIn] = React.useState(true);
  const [isSuccess, setIsSuccess] = React.useState(false);

  function switchForm(evt) {
    evt.preventDefault();
    setIsSignIn(!isSignIn);
  }

  function successRedirect(evt) {
    evt.preventDefault();
    setIsSignIn(true);
    setIsSuccess(false);
  }

  return (
    <div
      onClick={() => props.setIsOpen(false)}
      className={`popup ${props.isOpen ? 'popup_open' : ''}`}
    >
      <div onClick={(evt) => evt.stopPropagation()} className='popup__content'>
        <button
          onClick={() => props.setIsOpen(false)}
          className='popup__close'
        />
        <form className='popup__form'>
          {isSuccess ? (
            <h3 className='popup__title'>
              Registration successfully completed!
            </h3>
          ) : (
            <h3 className='popup__title'>{isSignIn ? 'Sign In' : 'Sign Up'}</h3>
          )}
          {!isSuccess && (
            <fieldset className='popup__fieldset'>
              <label htmlFor='email' className='popup__input-title'>
                Email
              </label>
              <input
                type='email'
                id='email'
                name='email'
                className='popup__input'
                placeholder='Enter email'
              />
              <span className='popup__input-error'>This is an error</span>
              <label htmlFor='password' className='popup__input-title'>
                Password
              </label>
              <input
                type='password'
                id='password'
                name='password'
                className='popup__input'
                placeholder='Enter password'
              />
              <span className='popup__input-error'>This is also an error</span>
              {!isSignIn && (
                <>
                  <label htmlFor='username' className='popup__input-title'>
                    Username
                  </label>
                  <input
                    type='text'
                    id='username'
                    name='username'
                    className='popup__input'
                    placeholder='Enter your username'
                  />
                  <span className='popup__input-error'>
                    This is an error too
                  </span>
                </>
              )}
              <button type='submit' className='popup__submit'>
                {isSignIn ? 'Sign In' : 'Sign Up'}
              </button>
              <p className='popup__redirect'>
                or{' '}
                <a onClick={switchForm} className='popup__redirect-link'>
                  {isSignIn ? 'Sign Up' : 'Sign In'}
                </a>
              </p>
            </fieldset>
          )}
          {isSuccess && (
            <a onClick={successRedirect} className='popup__success-redirect'>
              Sign in
            </a>
          )}
        </form>
      </div>
    </div>
  );
}
