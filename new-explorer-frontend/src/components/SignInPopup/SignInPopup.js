import React, { useState, useCallback } from 'react';

import PopupWithForm from '../PopupWithForm/PopupWithForm';

export default function SignInPopin(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);

  const [passwordError, setPasswordError] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);

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
    if (!isEmailValid || !isPasswordValid) {
      return false;
    }
    return true;
  }

  // const resetForm = useCallback(() => {
  //   setEmail('');
  //   setEmailError('');
  //   setIsEmailValid(false);
  // }, [email, emailError, isEmailValid]);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.handleSignin(email, password);
    // resetForm();
  }

  return (
    <PopupWithForm
      title='Sign in'
      handleSubmit={handleSubmit}
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
      <button
        className='button button_place_signin'
        type='submit'
        disabled={!isFormValid()}
      >
        Sign in
      </button>
      <button
        className='form__switch-forms-button'
        onClick={props.onSwitchPopupClick}
      >
        or <span className='form__switch-forms-span-text'>Sign up</span>
      </button>
    </PopupWithForm>
  );
}
