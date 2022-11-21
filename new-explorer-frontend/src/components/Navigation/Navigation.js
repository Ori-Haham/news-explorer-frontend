import { Link } from 'react-router-dom';

export default function Nvigation() {
  return (
    <div className='navigation'>
      <Link className='navigation__link' to='/'>
        Home
      </Link>
      <Link className='navigation__link' to='/'>
        Saved articles
      </Link>
    </div>
  );
}
