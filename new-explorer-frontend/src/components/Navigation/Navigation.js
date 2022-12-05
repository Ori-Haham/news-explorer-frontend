import { Link } from 'react-router-dom';

// className={({ IsActive }) => {
//   return IsActive && isHome
//     ? 'navigation__link navigation__link_place_home navigation__link_active'
//     : isHome
//     ? 'navigation__link navigation__link_place_home'
//     : IsActive
//     ? 'navigation__link navigation__link_place_articles navigation__link_active'
//     : 'navigation__link navigation__link_place_articles';
// }}

export default function Nvigation({ isHome, isLoggedIn }) {
  return (
    <nav className='navigation'>
      <Link
        className={
          isHome
            ? 'navigation__link navigation__link_place_home navigation__link_active-white'
            : 'navigation__link navigation__link_place_articles'
        }
        to='/'
      >
        Home
      </Link>
      {isLoggedIn && (
        <Link
          className={
            isHome
              ? 'navigation__link navigation__link_place_home'
              : 'navigation__link navigation__link_place_articles navigation__link_active-black'
          }
          to='/articles'
        >
          Saved articles
        </Link>
      )}
    </nav>
  );
}
