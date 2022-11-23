import { Link } from 'react-router-dom';

export default function Nvigation({ isHome }) {
  return (
    <div className='navigation'>
      <Link
        className={
          isHome
            ? 'navigation__link navigation__link_place_home'
            : 'navigation__link navigation__link_place_articles'
        }
        to='/'
      >
        Home
      </Link>
      <Link
        className={
          isHome
            ? 'navigation__link navigation__link_place_home'
            : 'navigation__link navigation__link_place_articles'
        }
        to='/articles'
      >
        Saved articles
      </Link>
    </div>
  );
}
