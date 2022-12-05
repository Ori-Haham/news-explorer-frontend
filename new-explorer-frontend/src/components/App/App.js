import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
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
import { CurrentUserContext } from '../../context/CurrentUserContext/CurrentUserContext';

import auth from '../../utils/auth';
import newsApi from '../../utils/NewsApi';
import mainApi from '../../utils/MainApi';

import '../../index.css';

function App() {
  const history = useHistory();

  const [userData, setUserData] = useState({});
  const [isSignInPopupOpen, setIsSignInPopupOpen] = useState(false);
  const [isSignUpPopupOpen, setIsSignUpPopupOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isMenuPopupOpen, setIsMenuPopupOpen] = useState(false);
  const [isNotFoundOpen, setIsNotFoundOpen] = useState(false);
  const [Isloding, setIsLoding] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        closeSignInPopup();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [SignInPopup]);

  useEffect(() => {
    if (isLoggedIn === true) {
      mainApi
        .getSavedArticles()
        .then((data) => {
          setSavedArticles(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn]);

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

  function handleSignup(email, password, name) {
    auth
      .register(email, password, name)
      .then(() => {
        closeSignUpPopup();
        setIsMessageOpen(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSignin(email, password) {
    auth
      .authorize(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.removeItem('jwt');
          localStorage.setItem('jwt', res.token);
          closeSignInPopup();
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
          setUserData(data);
        })
        .then(() => {
          // getInitialCard();
        })
        .then(() => {
          setIsLoggedIn(true);
        })
        .catch((err) => console.log(err));
    }
  }

  function handleLogOut() {
    setIsLoggedIn(false);
    history.push('/');
  }

  function handleSearch(keyword) {
    newsApi
      .getArticles(keyword)
      .then((data) => {
        setIsNotFoundOpen(false);
        setIsLoding(true);
        setSearchResults(() => {
          const newArr = data.articles.map((v) => {
            return { ...v, keyword };
          });
          return newArr;
        });
      })
      .then(() => {
        setIsLoding(false);
      })
      .catch((err) => {
        console.log(err);
        setIsNotFoundOpen(true);
      });
  }

  const homePage = (
    <Route exact path={'/'}>
      <div className='home-cover-img'>
        <Header
          isHome={true}
          openSignin={openSignInPopup}
          openMenuPopup={openMenuPopup}
          isLoggedIn={isLoggedIn}
          onLogOut={handleLogOut}
        />
        <SearchSection onSearch={handleSearch} />
      </div>
      {Isloding && <Preloader />}
      {isNotFoundOpen && <NotFound />}
      <Main searchResults={searchResults}></Main>
      <Footer />
    </Route>
  );

  const SavedArticlesPage = (
    <Route path={'/articles'}>
      <Header
        openSignin={openSignInPopup}
        openMenuPopup={openMenuPopup}
        isLoggedIn={isLoggedIn}
        onLogOut={handleLogOut}
      />
      <SavedArticles savedArticles={savedArticles} />
      <Footer />
    </Route>
  );

  return (
    <CurrentUserContext.Provider value={userData}>
      <div className='app'>
        <Switch>
          {homePage}
          {isLoggedIn ? SavedArticlesPage : <Redirect to='/' />}
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
        {isMessageOpen && (
          <MessagePopup
            isOpen={isMenuPopupOpen}
            onClose={closeMessage}
            openSignInPopup={openSignInPopup}
          />
        )}
        (
        <MenuPopup onClose={closeMenuPopup} openSignInPopup={openSignInPopup} />
        )
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
