export default function PopupWithForm({
  popupName,
  onClose,
  onSubmit,
  title,
  children,
  isOpen,
  resetForm,
}) {
  // function handleOnClose() {
  //   onClose();
  //   resetForm();
  // }
  return (
    <div
      className={isOpen ? `popup popup_type_centered` : `popup popup-hidden`}
    >
      <div className='popup__container'>
        <button
          onClick={onClose}
          className='popup__close-button'
          type='button'
        />
        <form className='form' onSubmit={onSubmit} name='profileForm'>
          <h2 className='form__title'>{title}</h2>
          {children}
        </form>
      </div>
    </div>
  );
}
