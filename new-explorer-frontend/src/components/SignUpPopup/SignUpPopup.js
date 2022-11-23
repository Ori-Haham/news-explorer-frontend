import React, { useState } from 'react';

import PopupWithForm from '../PopupWithForm/PopupWithForm';

export default function SignInPopup(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  function handleUserName(evt) {
    setUserName(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.handlRegister(email, password);
  }

  return (
    <PopupWithForm
      title='Sign up'
      handleSubmit={handleSubmit}
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
    >
      <p className='form__input-name'>Email</p>
      <input
        className='form__input'
        name='Email'
        type='email'
        placeholder='Enter email'
        value={props.email}
        onChange={handleEmailChange}
      />
      <p className='form__input-name'>Password</p>
      <input
        className='form__input'
        name='Password'
        type='password'
        placeholder='Enter password'
        value={props.password}
        onChange={handlePasswordChange}
      />
      <p className='form__input-name'>Username</p>
      <input
        className='form__input'
        name='Username'
        placeholder='Enter Username'
        value={props.password}
        onChange={handleUserName}
      />
      <button className='button button_place_signin' type='submit'>
        Sign up
      </button>
      <button
        className='form__switch-forms-button'
        onClick={props.onSwitchFormClick}
      >
        or <span className='form__switch-forms-span-text'>Sign up</span>
      </button>
    </PopupWithForm>
  );
}
