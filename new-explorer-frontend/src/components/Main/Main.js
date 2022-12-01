import AboutTheAuthor from '../AboutTheAuthor/AboutTheAuthor';
import Articles from '../Articles/Articles';

export default function Main(props) {
  return (
    <>
      <main className='main'>
        <Articles isHome={true} />
        <AboutTheAuthor />
      </main>
    </>
  );
}
