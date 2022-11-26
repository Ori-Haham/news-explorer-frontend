import useMatchMedia from 'react-use-match-media';
import Nvigation from '../Navigation/Navigation';
import menuIconWhite from '../../images/menu-white.svg';
import menuIconBlack from '../../images/menu-black.svg';

export default function Header({ isHome, openSignin, openMenuPopup }) {
  const isWideViewport = useMatchMedia('(min-width: 680px)');
  return (
    <header
      className={isHome ? 'header' : 'header header_place_saved-articles'}
    >
      <h1 className='header__headline'>NewsExplorer</h1>
      {isWideViewport && <Nvigation isHome={isHome} />}
      {isWideViewport && (
        <button
          className={
            isHome
              ? 'button header__button header__button_place_home'
              : 'button header__button header__button_place_article'
          }
          onClick={openSignin}
        >
          Sign in
        </button>
      )}
      {!isWideViewport && (
        <img
          className='header__menu-icon'
          onClick={openMenuPopup}
          src={isHome ? menuIconWhite : menuIconBlack}
        />
      )}
    </header>
  );
}
