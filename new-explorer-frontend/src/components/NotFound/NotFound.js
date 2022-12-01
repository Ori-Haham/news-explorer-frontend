import notFoundImage from '../../images/not-found_v1.svg';

export default function NotFound() {
  return (
    <div className='not-found'>
      <img
        className='not-found__image'
        src={notFoundImage}
        alt='not found image'
      />
      <h3 className='not-found__title'>Nothing found</h3>
      <p className='not-found__message'>
        Sorry, but nothing matched your search terms.
      </p>
    </div>
  );
}
