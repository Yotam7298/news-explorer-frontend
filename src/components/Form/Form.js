// Imports
// React
import React from 'react';

export default function Form(props) {
  //Functions
  //Switch Form
  function redirectForm() {
    props.switchForm(props.redirect);
  }

  return (
    <form onSubmit={props.submitForm} className='form'>
      <h3 className='form__title'>{props.title}</h3>
      {props.children}
      {props.isSubmit && (
        <button
          type='submit'
          disabled={!props.isValid}
          className={`form__submit ${
            props.isValid ? '' : 'form__submit_disabled'
          }`}
        >
          {props.title}
        </button>
      )}
      <p className={`form__redirect ${props.redirectClass}`}>
        {props.isSubmit && 'or '}
        <button
          type='button'
          onClick={redirectForm}
          className='form__redirect-link'
        >
          {props.redirect}
        </button>
      </p>
      {props.apiError && <p className='form__api-error'>{props.apiError}</p>}
    </form>
  );
}
