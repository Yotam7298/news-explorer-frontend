import React from 'react';
import Popup from '../Popup/Popup';
import Form from '../Form/Form';

export default function PopupWithForm({
  isOpen,
  onClose,
  title,
  isSubmit,
  redirect,
  redirectClass,
  apiError,
  isValid,
  submitForm,
  switchForm,
  children,
}) {
  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <Form
        title={title}
        isSubmit={isSubmit}
        redirect={redirect}
        redirectClass={redirectClass}
        apiError={apiError}
        isValid={isValid}
        submitForm={submitForm}
        switchForm={switchForm}
      >
        {children}
      </Form>
    </Popup>
  );
}
