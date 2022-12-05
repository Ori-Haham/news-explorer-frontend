import React from 'react';

import useMatchMedia from 'react-use-match-media';
import Nvigation from '../Navigation/Navigation';
import menuIconWhite from '../../images/menu-white.svg';
import menuIconBlack from '../../images/menu-black.svg';

import { CurrentUserContext } from '../../context/CurrentUserContext/CurrentUserContext';

export default function Header({
  isHome,
  openSignin,
  openMenuPopup,
  isLoggedIn,
  onLogOut,
}) {
  const currentUserContext = React.useContext(CurrentUserContext);
  const isWideViewport = useMatchMedia('(min-width: 680px)');

  function handleLogOut() {
    onLogOut();
  }

  return (
    <header className={`header ${!isHome && 'header_place_saved-articles'}`}>
      <div className='header__container'>
        <h1 className='header__headline'>NewsExplorer</h1>
        {isWideViewport && (
          <Nvigation isHome={isHome} isLoggedIn={isLoggedIn} />
        )}
        {isWideViewport && !isLoggedIn && (
          <button
            className={`button header__button header__button_type_log-in ${
              isHome
                ? 'header__button_place_home'
                : 'header__button_place_article'
            }`}
            onClick={openSignin}
          >
            Sign in
          </button>
        )}
        {isWideViewport && isLoggedIn && (
          <button
            className={`button header__button  header__button_type_log-out ${
              isHome
                ? 'header__button_place_home header__button_type_log-out-white'
                : 'header__button_place_article header__button_type_log-out-black'
            }`}
            onClick={handleLogOut}
          >
            {currentUserContext.name}
          </button>
        )}
        {!isWideViewport && (
          <img
            className='header__menu-icon'
            onClick={openMenuPopup}
            src={isHome ? menuIconWhite : menuIconBlack}
            alt='menu icon'
          />
        )}
      </div>
    </header>
  );
}
