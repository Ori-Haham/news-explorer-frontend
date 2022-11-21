import { Link } from 'react-router-dom';
import fbIcon from '../../images/fb-icon.svg';
import gitHubIcon from '../../images/gitHub-icon.svg';

export default function Footer() {
  return (
    <footer className='footer'>
      <p className='footer__copyright'>© 2021 Supersite, Powered by News API</p>
      <div className='footer__links-container'>
        <Link className='footer__link' to='/'>
          Home
        </Link>
        <a className='footer__link'>Practicum</a>
        <img className='footer__icon-link' src={gitHubIcon} />
        <img className='footer__icon-link' src={fbIcon} />
      </div>
    </footer>
  );
}
