import Logo from '../Logo/Logo';

import closeIcon from '../../images/close.svg';

export default function MenuPopup(props) {
  return (
    <div className={props.isOpen ? 'popup menu-popup' : 'popup popup-hidden'}>
      <div className='menu-popup__container'>
        <div className='menu-popup__header'>
          <Logo />
          <img
            className='menu-popup__close-button'
            onClick={props.onClose}
            src={closeIcon}
          />
        </div>
        <nav className='menu-popup__navigation'>
          <p className='popup-menu__location'>home</p>
          <button className='button button__place_menu-popup'>Sign in</button>
        </nav>
      </div>
    </div>
  );
}
