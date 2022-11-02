import React from 'react';
import useFormValidation from '../../hooks/formValidatorHook';

export default function PopupWithForm(props) {
  const [isSignIn, setIsSignIn] = React.useState(true);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const { values, handleChange, errors, isValid, setIsValid, resetForm } =
    useFormValidation();

  function switchForm() {
    setIsSignIn(!isSignIn);
  }

  function successRedirect() {
    setIsSignIn(true);
    setIsSuccess(false);
  }

  React.useEffect(() => {
    resetForm();
  }, [props.isOpen, isSignIn]);

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
                value={values.email || ''}
                onChange={handleChange}
                type='email'
                id='email'
                name='email'
                required
                className='popup__input'
                placeholder='Enter email'
              />
              <span
                className={`popup__input-error ${
                  errors.email ? 'popup__input-error_active' : ''
                }`}
              >
                {errors.email}
              </span>
              <label htmlFor='password' className='popup__input-title'>
                Password
              </label>
              <input
                value={values.password || ''}
                onChange={handleChange}
                type='password'
                id='password'
                name='password'
                minLength={8}
                required
                className='popup__input'
                placeholder='Enter password'
              />
              <span
                className={`popup__input-error ${
                  errors.password ? 'popup__input-error_active' : ''
                }`}
              >
                {errors.password}
              </span>
              {!isSignIn && (
                <>
                  <label htmlFor='username' className='popup__input-title'>
                    Username
                  </label>
                  <input
                    value={values.username || ''}
                    onChange={handleChange}
                    type='text'
                    id='username'
                    name='username'
                    minLength={2}
                    maxLength={30}
                    required
                    className='popup__input'
                    placeholder='Enter your username'
                  />
                  <span
                    className={`popup__input-error ${
                      errors.username ? 'popup__input-error_active' : ''
                    }`}
                  >
                    {errors.username}
                  </span>
                </>
              )}
              <button
                type='submit'
                disabled={!isValid}
                className={`popup__submit ${
                  isValid ? '' : 'popup__submit_disabled'
                }`}
              >
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
