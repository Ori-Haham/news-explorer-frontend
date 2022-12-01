import Logo from '../Logo/Logo';

import { Link } from 'react-router-dom';
import closeIcon from '../../images/close.svg';

export default function MenuPopup(props) {
  function handleButtonClick() {
    props.openSignInPopup();
    props.onClose();
  }

  return (
    <div className={props.isOpen ? 'popup menu-popup' : 'popup popup-hidden'}>
      <div className='menu-popup__container'>
        <div className='menu-popup__header'>
          <Logo />
          <img
            className='menu-popup__close-button'
            onClick={props.onClose}
            src={closeIcon}
            alt='close button icon'
          />
        </div>
        <nav className='menu-popup__navigation'>
          <Link
            to='/articles'
            className='popup-menu__location'
            onClick={props.onClose}
          >
            articles
          </Link>
          <Link to='/' className='popup-menu__location' onClick={props.onClose}>
            home
          </Link>
          <button
            className='button button__place_menu-popup'
            onClick={handleButtonClick}
          >
            Sign in
          </button>
        </nav>
      </div>
    </div>
  );
}
