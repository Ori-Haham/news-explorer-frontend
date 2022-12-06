import notFoundImage from '../../images/not-found_v1.svg';

export default function SearchErrorMessage() {
  return (
    <div className='not-found'>
      <img
        className='not-found__image'
        src={notFoundImage}
        alt='not found image'
      />
      <h3 className='not-found__title'>Error</h3>
      <p className='not-found__message'>
        Sorry, something went wrong during the request. There may be a
        connection issue or the server may be down. Please try again later.
      </p>
    </div>
  );
}
