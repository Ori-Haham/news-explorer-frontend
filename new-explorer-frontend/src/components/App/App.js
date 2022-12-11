import {
  Route,
  Switch,
  Redirect,
  useHistory,
  useLocation,
} from 'react-router-dom';
import { useState, useEffect } from 'react';

import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedArticlesPage from '../SavedArticlesPage/SavedArticlesPage';
import SearchSection from '../SearchSEction/SearchSection';
import Footer from '../Footer/Footer';
import SignInPopup from '../SignInPopup/SignInPopup';
import SignUpPopup from '../SignUpPopup/SignUpPopup';
import MessagePopup from '../MessagePopup/MessagePopup';
import NotFound from '../NotFound/NotFound';
import MenuPopup from '../MenuPopup/MenuPopup';
import { CurrentUserContext } from '../../context/CurrentUserContext/CurrentUserContext';
import SearchErrorMessage from '../SearchErrorMessage/SearchErrorMessage';

import auth from '../../utils/auth';
import newsApi from '../../utils/NewsApi';
import mainApi from '../../utils/MainApi';

import '../../index.css';

function App() {
  const history = useHistory();
  let location = useLocation();

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
  const [isSearchErrorOpen, setIsSearchErrorOpen] = useState(false);

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (location.pathname === '/articles' && !jwt) {
      openSignInPopup();
    }
  }, [location]);

  useEffect(() => {
    function close(evt) {
      if (evt.key === 'Escape') {
        closeSignInPopup();
        closeSignUpPopup();
        closeMessage();
        closeMenuPopup();
      }
    }
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  useEffect(() => {
    setSavedArticles((state) => {
      return (state = []);
    });
    if (isLoggedIn === true) {
      const jwt = localStorage.getItem('jwt');
      mainApi
        .getSavedArticles(jwt)
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

  function handleSignup(email, password, name, showErrorMessage, resetForm) {
    auth
      .register(email, password, name)
      .then(() => {
        closeSignUpPopup();
        resetForm();
        setIsMessageOpen(true);
      })
      .catch((err) => {
        showErrorMessage();
        console.log(err);
      });
  }

  function handleSignin(email, password, showErrorMessage, resetForm) {
    auth
      .authorize(email, password)
      .then((res) => {
        localStorage.removeItem('jwt');
        localStorage.setItem('jwt', res.token);
        closeSignInPopup();
      })
      .then(() => {
        tokenCheck();
        resetForm();
      })
      .catch((err) => {
        showErrorMessage();
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
          setIsLoggedIn(true);
        })
        .catch((err) => console.log(err));
    }
  }

  function handleLogOut() {
    setIsLoggedIn(false);
    localStorage.removeItem('jwt');
    history.push('/');
  }

  function handleSearch(keyword) {
    newsApi
      .getArticles(keyword)
      .then((data) => {
        setIsSearchErrorOpen(false);
        setIsNotFoundOpen(false);
        if (data.totalResults === 0) {
          setIsNotFoundOpen(true);
        } else {
          setIsLoding(true);
        }
        return data;
      })
      .then((data) => {
        setTimeout(() => {
          setSearchResults(() => {
            const newArr = data.articles.map((v) => {
              return { ...v, keyword };
            });
            return newArr;
          });
          setIsLoding(false);
        }, 1000);
      })

      .catch((err) => {
        console.log(err.StatusCode);
        setIsSearchErrorOpen(true);
      });
  }

  function handleSaveArticle(article, markArticle) {
    const jwt = localStorage.getItem('jwt');
    mainApi
      .postArticle(
        article.keyword,
        article.title,
        article.text,
        article.date,
        article.source,
        article.link,
        article.image,
        jwt,
      )
      .then((data) => {
        markArticle();
        setSavedArticles((state) => [...state, data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleArticleDelete(articleId) {
    const jwt = localStorage.getItem('jwt');
    const setUpdatedArticlesList = (article) => {
      setSavedArticles((state) => {
        return state.filter((ArticleInList) => {
          return ArticleInList._id !== article._id;
        });
      });
    };

    mainApi
      .deleteArticle(articleId, jwt)
      .then((article) => {
        setUpdatedArticlesList(article);
      })
      .catch((err) => {
        console.log(`Oops, error: ${err} !`);
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
      {isSearchErrorOpen && <SearchErrorMessage />}
      {isNotFoundOpen && <NotFound />}
      <Main
        searchResults={searchResults}
        savedArticles={savedArticles}
        onSubmit={handleSaveArticle}
        onDelete={handleArticleDelete}
        isLoggedIn={isLoggedIn}
        Isloding={Isloding}
        openSignin={openSignInPopup}
      ></Main>
      <Footer />
    </Route>
  );

  const savedArticlesPage = (
    <Route path={'/articles'}>
      <Header
        openSignin={openSignInPopup}
        openMenuPopup={openMenuPopup}
        isLoggedIn={isLoggedIn}
        onLogOut={handleLogOut}
      />
      <SavedArticlesPage
        savedArticles={savedArticles}
        onDelete={handleArticleDelete}
      />
      <Footer />
    </Route>
  );

  return (
    <CurrentUserContext.Provider value={userData}>
      <div className='app'>
        <Switch>
          {homePage}
          {isLoggedIn ? savedArticlesPage : <Redirect to='/' />}
        </Switch>
        <SignInPopup
          isOpen={isSignInPopupOpen}
          onClose={closeSignInPopup}
          onSwitchPopupClick={openSignUpPopup}
          handleSignin={handleSignin}
          isLoggedIn={isLoggedIn}
        />
        <SignUpPopup
          isOpen={isSignUpPopupOpen}
          onClose={closeSignUpPopup}
          onSwitchPopupClick={openSignInPopup}
          handleSignup={handleSignup}
          isLoggedIn={isLoggedIn}
        ></SignUpPopup>
        {isMessageOpen && (
          <MessagePopup
            isOpen={isMenuPopupOpen}
            onClose={closeMessage}
            openSignInPopup={openSignInPopup}
          />
        )}
        <MenuPopup onClose={closeMenuPopup} openSignInPopup={openSignInPopup} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
