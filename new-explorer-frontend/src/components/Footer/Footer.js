import { Link } from 'react-router-dom';
import fbIcon from '../../images/fb-icon.svg';
import gitHubIcon from '../../images/gitHub-icon.svg';

import ExternalLink from '../ExternalLink/ExternalLink';

export default function Footer() {
  return (
    <footer className='footer'>
      <p className='footer__copyright'>© 2021 Supersite, Powered by News API</p>
      <nav className='footer__links-container'>
        <Link className='footer__link' to='/'>
          Home
        </Link>
        <ExternalLink
          isText={true}
          link='https://practicum.com/en-isr/?utm_source=google&utm_medium=cpc&utm_campaign=Inhouse_gl_ISR_Countrypage_Allprofs_ua_sem&utm_content=cid--17521655683_gid--137843250436_network--g_placement--_dvc--c_tid--kwd-336980067113_mt--e_creative--604694333908&utm_term=practicum&gclid=CjwKCAiAyfybBhBKEiwAgtB7fmNiLb1ujn7NQIaeDL3l2ibPH38FBsY8_BVHrw26vJWfgDmX17pMmBoC-84QAvD_BwE'
        >
          Practicum
        </ExternalLink>
        <ExternalLink link='https://github.com/Ori-Haham/news-explorer-frontend/tree/stage-2/new-explorer-frontend'>
          <img
            className='footer__icon-link'
            src={gitHubIcon}
            alt='github icon'
          />
        </ExternalLink>
        <ExternalLink link='https://www.facebook.com/Practicum-Israel-100130606032857'>
          <img className='footer__icon-link' src={fbIcon} alt='facebook icon' />
        </ExternalLink>
      </nav>
    </footer>
  );
}
