import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import React from 'react';

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

import auth from '../../utils/auth';

import '../../index.css';
const CurrentUserContext = React.createContext();
function App() {
  const history = useHistory();

  const [userData, setUserData] = useState({});
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

  function handleSignup(email, password, name) {
    auth
      .register(email, password, name)
      .then((res) => {
        // if (res.userObj.email === email) {
        console.log(res);
        setIsMessageOpen(true);
        closeSignUpPopup();
        openSignInPopup();
        // }
        // else {
        //   openErrormessage();
        // }
      })
      .catch((err) => {
        // openErrormessage();
        console.log(err);
      });
  }

  function handleSignin(email, password) {
    auth
      .authorize(email, password)
      .then((res) => {
        if (res.token) {
          console.log(1, res);
          localStorage.removeItem('jwt');
          localStorage.setItem('jwt', res.token);
        }
        // else {
        //   openErrormessage();
        // }
      })
      .then(() => {
        tokenCheck();
      })
      .catch((err) => {
        // openErrormessage();
        console.log(err);
      });
  }

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth
        .getAuthorizedContent(jwt)
        .then((data) => {
          setUserData(2, data);
        })
        .then(() => {
          // getInitialCard();
        })
        .then(() => {
          // pushHomePage();
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <CurrentUserContext.Provider value={userData}>
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
            <Header
              openSignin={openSignInPopup}
              openMenuPopup={openMenuPopup}
            />
            <SavedArticles />
            <Footer />
          </Route>
        </Switch>
        <SignInPopup
          isOpen={isSignInPopupOpen}
          onClose={closeSignInPopup}
          onSwitchPopupClick={openSignUpPopup}
          handleSignin={handleSignin}
        />
        <SignUpPopup
          isOpen={isSignUpPopupOpen}
          onClose={closeSignUpPopup}
          onSwitchPopupClick={openSignInPopup}
          handleSignup={handleSignup}
        ></SignUpPopup>
        <MessagePopup isOpen={isMessageOpen} onClose={closeMessage} />
        <MenuPopup
          isOpen={isMenuPopupOpen}
          onClose={closeMenuPopup}
          openSignInPopup={openSignInPopup}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
