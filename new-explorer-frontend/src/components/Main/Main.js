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
        {props.searchResults.length > 0 && !props.Isloding && (
          <SearchResults
            searchResults={props.searchResults}
            savedArticles={props.savedArticles}
            isLoggedIn={props.isLoggedIn}
            onSubmit={props.onSubmit}
            onDelete={props.onDelete}
            openSignin={props.openSignin}
          />
        )}
        <AboutTheAuthor />
      </main>
    </>
  );
}
