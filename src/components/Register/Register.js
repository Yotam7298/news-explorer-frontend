import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

export default function Register({
  isOpen,
  isSuccess,
  onClose,
  apiError,
  isValid,
  submitForm,
  values,
  errors,
  handleChange,
  switchForm,
}) {
  if (isSuccess) {
    return (
      <PopupWithForm
        isOpen={isOpen}
        onClose={onClose}
        title={'Registration successfully completed!'}
        redirect={'Sign In'}
        switchForm={switchForm}
        redirectClass='form__redirect-success'
      />
    );
  } else {
    return (
      <PopupWithForm
        isOpen={isOpen}
        onClose={onClose}
        title={'Sign Up'}
        isSubmit
        redirect={'Sign In'}
        apiError={apiError}
        isValid={isValid}
        submitForm={submitForm}
        switchForm={switchForm}
      >
        <fieldset className='form__fieldset'>
          <label htmlFor='email' className='form__input-title'>
            Email
          </label>
          <input
            value={values.email || ''}
            onChange={handleChange}
            type='email'
            id='email'
            name='email'
            required
            className={`form__input ${errors.email ? 'form__input_error' : ''}`}
            placeholder='Enter email'
          />
          <span
            className={`form__input-error ${
              errors.email ? 'form__input-error_active' : ''
            }`}
          >
            {errors.email}
          </span>
          <label htmlFor='password' className='form__input-title'>
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
            className={`form__input ${
              errors.password ? 'form__input_error' : ''
            }`}
            placeholder='Enter password'
          />
          <span
            className={`form__input-error ${
              errors.password ? 'form__input-error_active' : ''
            }`}
          >
            {errors.password}
          </span>
          <label htmlFor='name' className='form__input-title'>
            Username
          </label>
          <input
            value={values.name || ''}
            onChange={handleChange}
            type='text'
            id='name'
            name='name'
            minLength={2}
            maxLength={30}
            required
            className={`form__input ${errors.name ? 'form__input_error' : ''}`}
            placeholder='Enter your username'
          />
          <span
            className={`form__input-error ${
              errors.name ? 'form__input-error_active' : ''
            }`}
          >
            {errors.name}
          </span>
        </fieldset>
      </PopupWithForm>
    );
  }
}
