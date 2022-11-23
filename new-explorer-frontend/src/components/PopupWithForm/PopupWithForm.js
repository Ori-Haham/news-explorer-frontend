export default function PopupWithForm({
  popupName,
  onClose,
  onSubmit,
  title,
  children,
  isOpen,
}) {
  return (
    <div className={isOpen ? `popup` : `popup popup-hidden`}>
      <div className='popup__container'>
        <button
          onClick={onClose}
          className={`${popupName}__close-button popup__close-button`}
          type='button'
        />
        <form onSubmit={onSubmit} className='form' name='profileForm'>
          <h2 className='form__title'>{title}</h2>
          <fieldset className='profile-form__fieldset form__fieldset'>
            {children}
          </fieldset>
        </form>
      </div>
    </div>
  );
}
