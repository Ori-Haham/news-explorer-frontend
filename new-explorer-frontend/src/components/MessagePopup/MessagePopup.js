export default function MessagePopup(props) {
  return (
    <div
      className={
        props.isOpen ? `popup popup_type_centered` : `popup popup-hidden`
      }
    >
      <div className='popup__container'>
        <button
          onClick={props.onClose}
          className='popup__close-button'
          type='button'
        />
        <h2 className='popup__title'>Registration successfully completed!</h2>
        <button
          className='popup__switch-forms-button'
          onClick={props.onSwitchPopupClick}
        >
          Sign in
        </button>
      </div>
    </div>
  );
}
