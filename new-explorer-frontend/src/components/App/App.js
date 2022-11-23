import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedArticles from '../SavedArticles/SavedArticles';
import SearchSection from '../SearchSEction/SearchSection';
import Footer from '../Footer/Footer';
import SignInPopup from '../SignInPopup/SignInPopup';
import SignUpPopup from '../SignUpPopup/SignUpPopup';

import '../../index.css';

function App() {
  const [isSignInPopupOpen, setIsSignInPopupOpen] = useState(false);
  const [isSignUpPopupOpen, setIsSignUpPopupOpen] = useState(false);

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

  return (
    <div className='app'>
      <Switch>
        <Route exact path={'/'}>
          <div className='home-cover-img'>
            <Header isHome={true} openSignin={openSignInPopup} />
            <SearchSection />
          </div>
          <Main />
        </Route>
        <Route path={'/articles'}>
          <Header openSignin={openSignInPopup} />
          <SavedArticles />
        </Route>
      </Switch>
      <Footer />
      <SignInPopup
        isOpen={isSignInPopupOpen}
        onClose={closeSignInPopup}
        onSwitchFormClick={openSignUpPopup}
      />
      <SignUpPopup
        isOpen={isSignUpPopupOpen}
        onClose={closeSignUpPopup}
        onSwitchFormClick={openSignInPopup}
      ></SignUpPopup>
    </div>
  );
}

export default App;
