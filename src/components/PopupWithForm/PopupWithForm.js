// Imports
// React
import React from 'react';
import { useHistory } from 'react-router-dom';
// Form Validation
import useFormValidation from '../../hooks/formValidatorHook';

export default function PopupWithForm(props) {
  // State Variables
  const [isSignIn, setIsSignIn] = React.useState(true);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [apiError, setApiError] = React.useState('');

  //Form Validation consts
  const { values, handleChange, errors, isValid, resetForm } =
    useFormValidation();

  // History
  const history = useHistory();

  //Functions
  //Switch Form
  function switchForm() {
    setIsSignIn(!isSignIn);
  }

  // Success SignUp
  function successRedirect() {
    setIsSignIn(true);
    setIsSuccess(false);
  }

  // Submits
  function handleSignUp(evt) {
    evt.preventDefault();

    props
      .signUpReq({
        email: values.email,
        password: values.password,
        username: values.username,
      })
      .then(() => {
        setIsSuccess(true);
        setApiError('');
      })
      .catch((err) => {
        props.reportError(err).then((data) => setApiError(data.message));
      });
  }

  function handleSignIn(evt) {
    evt.preventDefault();

    props
      .signInReq({
        email: values.email,
        password: values.password,
      })
      .then((jwt) => {
        localStorage.setItem('jwt', jwt.token);
        props.setIsOpen(false);
        setApiError('');
        history.go(0);
      })
      .catch((err) => {
        props.reportError(err).then((data) => setApiError(data.message));
      });
  }

  // useEffect
  React.useEffect(() => {
    resetForm();
    setApiError('');
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
                className={`popup__input ${
                  errors.email ? 'popup__input_error' : ''
                }`}
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
                className={`popup__input ${
                  errors.password ? 'popup__input_error' : ''
                }`}
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
                    className={`popup__input ${
                      errors.username ? 'popup__input_error' : ''
                    }`}
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
                onClick={isSignIn ? handleSignIn : handleSignUp}
                disabled={!isValid}
                className={`popup__submit ${
                  isValid ? '' : 'popup__submit_disabled'
                }`}
              >
                {isSignIn ? 'Sign In' : 'Sign Up'}
              </button>
              <p className='popup__redirect'>
                or{' '}
                <button onClick={switchForm} className='popup__redirect-link'>
                  {isSignIn ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
              {apiError && <p className='popup__api-error'>{apiError}</p>}
            </fieldset>
          )}
          {isSuccess && (
            <button
              onClick={successRedirect}
              className='popup__success-redirect'
            >
              Sign in
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
