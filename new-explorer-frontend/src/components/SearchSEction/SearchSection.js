import { useState } from 'react';

export default function SearchSection(props) {
  const [keyWord, setKeyWord] = useState('');
  const [validationError, setValidationError] = useState('');
  const [isValid, setIsValid] = useState(false);

  function handleKeyWordChange(evt) {
    const target = evt.target;
    setKeyWord(target.value);
    setValidationError(target.validationMessage);
    setIsValid(target.checkValidity());
  }

  function handleSearch(evt) {
    evt.preventDefault();
    props.onSearch(keyWord);
  }

  return (
    <div className='search-section'>
      <h2 className='search-section__title'>What's going on in the world?</h2>
      <p className='search-section__text'>
        Find the latest news on any topic and save them in your personal
        account.
      </p>
      <form onSubmit={handleSearch}>
        <div className='search-section__input-container'>
          <input
            className='search-section__input'
            placeholder='Enter topic'
            value={keyWord}
            minLength='2'
            required={true}
            onChange={handleKeyWordChange}
          ></input>
          <button
            className='button button_place_search-section'
            type='submit'
            disabled={!isValid}
          >
            Search
          </button>
        </div>
        <p className='form__error-message form__error-message_place_search'>
          {validationError}
        </p>
      </form>
    </div>
  );
}
