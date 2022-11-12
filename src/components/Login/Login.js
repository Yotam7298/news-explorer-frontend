import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

export default function Login({
  isOpen,
  onClose,
  apiError,
  isValid,
  submitForm,
  values,
  errors,
  handleChange,
  switchForm,
}) {
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title={'Sign In'}
      isSubmit
      redirect={'Sign Up'}
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
      </fieldset>
    </PopupWithForm>
    // <Popup isOpen={isOpen} onClose={onClose}>
    //   <Form
    //     title={'Sign In'}
    //     isSubmit
    //     redirect={'Sign Up'}
    //     apiError={apiError}
    //     isValid={isValid}
    //     submitForm={submitForm}
    //     switchForm={switchForm}
    //   >
    //     <fieldset className='form__fieldset'>
    //       <label htmlFor='email' className='form__input-title'>
    //         Email
    //       </label>
    //       <input
    //         value={values.email || ''}
    //         onChange={handleChange}
    //         type='email'
    //         id='email'
    //         name='email'
    //         required
    //         className={`form__input ${errors.email ? 'form__input_error' : ''}`}
    //         placeholder='Enter email'
    //       />
    //       <span
    //         className={`form__input-error ${
    //           errors.email ? 'form__input-error_active' : ''
    //         }`}
    //       >
    //         {errors.email}
    //       </span>
    //       <label htmlFor='password' className='form__input-title'>
    //         Password
    //       </label>
    //       <input
    //         value={values.password || ''}
    //         onChange={handleChange}
    //         type='password'
    //         id='password'
    //         name='password'
    //         minLength={8}
    //         required
    //         className={`form__input ${
    //           errors.password ? 'form__input_error' : ''
    //         }`}
    //         placeholder='Enter password'
    //       />
    //       <span
    //         className={`form__input-error ${
    //           errors.password ? 'form__input-error_active' : ''
    //         }`}
    //       >
    //         {errors.password}
    //       </span>
    //     </fieldset>
    //   </Form>
    // </Popup>
  );
}
