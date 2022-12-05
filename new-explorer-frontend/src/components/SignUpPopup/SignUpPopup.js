import React, { useState, useCallback } from 'react';

import PopupWithForm from '../PopupWithForm/PopupWithForm';

export default function SignInPopup(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');

  const [emailError, setEmailError] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);

  const [passwordError, setPasswordError] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const [userNameError, setUserNameError] = useState('');
  const [isUserNameValid, setIsUserNameValid] = useState(false);

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

  function handleUserNameChange(evt) {
    const target = evt.target;
    setUserName(target.value);
    setUserNameError(target.validationMessage);
    setIsUserNameValid(target.checkValidity());
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.handleSignup(email, password, userName);
    // resetForm();
  }

  function isFormValid() {
    if (!isEmailValid || !isPasswordValid || !isUserNameValid) {
      return false;
    }
    return true;
  }

  // const resetForm = useCallback(() => {
  //   setEmail('');
  //   setEmailError('');
  //   setIsEmailValid(false);
  // }, [email, emailError, isEmailValid]);

  return (
    <PopupWithForm
      title='Sign up'
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
      <p className='form__input-name'>Username</p>
      <input
        className='form__input'
        name='Username'
        placeholder='Enter Username'
        value={userName}
        onChange={handleUserNameChange}
        required={true}
        minLength='2'
        maxLength='30'
      />
      {!isUserNameValid && (
        <p className='form__error-message'>{userNameError}</p>
      )}
      <button
        className='button button_place_signin'
        type='submit'
        disabled={!isFormValid()}
      >
        Sign up
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
