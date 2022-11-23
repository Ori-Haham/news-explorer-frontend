import Nvigation from '../Navigation/Navigation';

export default function Header({ isHome, openSignin }) {
  return (
    <header
      className={isHome ? 'header' : 'header header_place_saved-articles'}
    >
      <h1 className='header__headline'>NewsExplorer</h1>
      <Nvigation isHome={isHome} />
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
    </header>
  );
}
