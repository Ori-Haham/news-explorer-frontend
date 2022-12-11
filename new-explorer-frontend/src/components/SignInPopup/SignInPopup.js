import React, { useState, useEffect, useCallback } from 'react';

import PopupWithForm from '../PopupWithForm/PopupWithForm';

export default function SignInPopin(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);

  const [passwordError, setPasswordError] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    setShowMessage(false);
  }, [isEmailValid, isPasswordValid]);

  const resetForm = useCallback((newValues = '', newIsValid = false) => {
    setEmail(newValues);
    setPassword(newValues);
    setIsEmailValid(newIsValid);
    setIsPasswordValid(newIsValid);
  }, []);

  function handleFormSwitch() {
    props.onClose();
    props.openSignUpPopup();
  }

  function handleEmailChange(evt) {
    const target = evt.target;
    setEmail(target.value);
    setEmailError(target.validationMessage);
    setIsEmailValid(target.checkValidity());
  }

  function handlePasswordChange(evt) {
    const target = evt.target;
    setPassword(target.value);
    setPasswordError(target.validationMessage);
    setIsPasswordValid(target.checkValidity());
  }

  function isFormValid() {
    return [isEmailValid, isPasswordValid].every((value) => value);
  }

  function showErrorMessage() {
    setShowMessage(true);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.handleSignin(email, password, showErrorMessage, resetForm);
  }

  return (
    <PopupWithForm
      title='Sign in'
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
      // resetForm={resetForm}
    >
      <p className='form__input-name'>Email</p>
      <input
        className='form__input'
        name='Email'
        type='email'
        placeholder='Enter email'
        value={email}
        onChange={handleEmailChange}
        required={true}
      />
      {!isEmailValid && <p className='form__error-message'>{emailError}</p>}
      <p className='form__input-name'>Password</p>
      <input
        className='form__input'
        name='Password'
        type='password'
        placeholder='Enter password'
        value={password}
        onChange={handlePasswordChange}
        required={true}
        minLength={8}
      />
      {!isPasswordValid && (
        <p className='form__error-message'>{passwordError}</p>
      )}
      <div className='form__button-container'>
        {showMessage && (
          <p className='form__error-message form__error-message_place_button'>
            email or password are incorect
          </p>
        )}
        <button
          className='button button_place_signin'
          type='submit'
          disabled={!isFormValid()}
        >
          Sign in
        </button>
      </div>
      <button
        className='form__switch-forms-button'
        onClick={props.onSwitchPopupClick}
      >
        or <span className='form__switch-forms-span-text'>Sign up</span>
      </button>
    </PopupWithForm>
  );
}
