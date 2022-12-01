import { Route, Switch, Redirect, useHistory } from 'react-router';
import { useState, useEffect } from 'react';

import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedArticles from '../SavedArticles/SavedArticles';
import SearchSection from '../SearchSEction/SearchSection';
import Footer from '../Footer/Footer';
import SignInPopup from '../SignInPopup/SignInPopup';
import SignUpPopup from '../SignUpPopup/SignUpPopup';
import MessagePopup from '../MessagePopup/MessagePopup';
import NotFound from '../NotFound/NotFound';
import MenuPopup from '../MenuPopup/MenuPopup';
import Preloader from '../Preloader/Preloader';

import '../../index.css';

function App() {
  const [isSignInPopupOpen, setIsSignInPopupOpen] = useState(false);
  const [isSignUpPopupOpen, setIsSignUpPopupOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isMenuPopupOpen, setIsMenuPopupOpen] = useState(false);
  const [isNotFoundOpen, setIsNotFoundOpen] = useState(false);
  const [Isloding, setIsLoding] = useState(false);

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        closeSignInPopup();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [SignInPopup]);

  function openSignInPopup() {
    setIsSignInPopupOpen(true);
    setIsSignUpPopupOpen(false);
  }

  function closeSignInPopup() {
    setIsSignInPopupOpen(false);
  }

  function openSignUpPopup() {
    setIsSignUpPopupOpen(true);
    setIsSignInPopupOpen(false);
  }

  function closeSignUpPopup() {
    setIsSignUpPopupOpen(false);
  }

  function openMessage() {
    setIsMessageOpen(true);
  }

  function closeMessage() {
    setIsMessageOpen(false);
  }

  function openMenuPopup() {
    setIsMenuPopupOpen(true);
  }

  function closeMenuPopup() {
    setIsMenuPopupOpen(false);
  }

  function handleLoding() {
    setIsLoding(true);
    setTimeout(() => {
      setIsLoding(false);
    }, 2000);
  }

  return (
    <div className='app'>
      <Switch>
        <Route exact path={'/'}>
          <div className='home-cover-img'>
            <Header
              isHome={true}
              openSignin={openSignInPopup}
              openMenuPopup={openMenuPopup}
            />
            <SearchSection
              handleLoding={handleLoding}
              IsNotFoundOpen={setIsNotFoundOpen}
            />
          </div>
          {Isloding && <Preloader />}
          {isNotFoundOpen && <NotFound />}
          <Main />
          <Footer />
        </Route>
        <Route path={'/articles'}>
          <Header openSignin={openSignInPopup} openMenuPopup={openMenuPopup} />
          <SavedArticles />
          <Footer />
        </Route>
      </Switch>
      <SignInPopup
        isOpen={isSignInPopupOpen}
        onClose={closeSignInPopup}
        onSwitchPopupClick={openSignUpPopup}
      />
      <SignUpPopup
        isOpen={isSignUpPopupOpen}
        onClose={closeSignUpPopup}
        onSwitchPopupClick={openSignInPopup}
      ></SignUpPopup>
      <MessagePopup isOpen={isMessageOpen} onClose={closeMessage} />
      <MenuPopup
        isOpen={isMenuPopupOpen}
        onClose={closeMenuPopup}
        openSignInPopup={openSignInPopup}
      />
    </div>
  );
}

export default App;
