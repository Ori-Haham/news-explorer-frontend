export default function MessagePopup(props) {
  function handleClick() {
    props.onClose();
    props.openSignInPopup();
  }
  return (
    <div className='popup popup_type_centered'>
      <div className='popup__container'>
        <button
          onClick={props.onClose}
          className='popup__close-button'
          type='button'
        />
        <h2 className='popup__title'>Registration successfully completed!</h2>
        <button className='popup__switch-forms-button' onClick={handleClick}>
          Sign in
        </button>
      </div>
    </div>
  );
}
