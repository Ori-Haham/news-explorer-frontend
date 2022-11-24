export default function SearchSection() {
  function handleSearch(evt) {
    evt.preventDefault();
  }

  return (
    <div className='search-section'>
      <h2 className='search-section__title'>What's going on in the world?</h2>
      <p className='search-section__text'>
        Find the latest news on any topic and save them in your personal
        account.
      </p>
      <form className='search-section__input-container'>
        <input
          className='search-section__input'
          placeholder='Enter topic'
        ></input>
        <button
          className='button button_place_search-section'
          onClick={handleSearch}
          type='submit'
        >
          Search
        </button>
      </form>
    </div>
  );
}
