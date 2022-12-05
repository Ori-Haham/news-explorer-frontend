import AboutTheAuthor from '../AboutTheAuthor/AboutTheAuthor';
import SearchResults from '../SearchResults/SearchResults';
import NotFound from '../NotFound/NotFound';
import Preloader from '../Preloader/Preloader';

export default function Main(props) {
  return (
    <>
      <main className='main'>
        {props.Isloding && <Preloader />}
        {props.isNotFoundOpen && <NotFound />}
        {props.searchResults.length > 0 && (
          <SearchResults
            searchResults={props.searchResults}
            isLoggedIn={props.isLoggedIn}
          />
        )}
        <AboutTheAuthor />
      </main>
    </>
  );
}
