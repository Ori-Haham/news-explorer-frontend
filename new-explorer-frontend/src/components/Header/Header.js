import Nvigation from '../Navigation/Navigation';
import SearchSection from '../SearchSEction/SearchSection';
import Button from '../Button/Button';

export default function Header() {
  return (
    <header className='header'>
      <div className='header__navigation-container'>
        <h1 className='header__headline'>NewsExplorer</h1>
        <Nvigation />
        <Button text='Sign in' />
      </div>
      <SearchSection></SearchSection>
    </header>
  );
}
