// IMPORTS
// React
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
// Components
import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';
import SearchForm from '../SearchForm/SearchForm';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import Main from '../Main/Main';
import Preloader from '../Preloader/Preloader';
import About from '../About/About';
import Footer from '../Footer/Footer';
import NewsCard from '../NewsCard/NewsCard';
import NewsCardList from '../NewsCardList/NewscardList';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import NotFound from '../NotFound/NotFound';
// APIs
import mainApi from '../../utils/MainApi';
import searchArticles from '../../utils/NewsApi';
// Contexts
import LoggedInContext from '../../contexts/LoggedInContext';
// Protected Route
import ProtectedRoute from '../../utils/ProtectedRoute';

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState([]);

  React.useEffect(() => {
    const closeByEscape = (evt) => {
      if (evt.key === 'Escape') {
        setIsPopupOpen(false);
      }
    };

    document.addEventListener('keydown', closeByEscape);

    return () => document.removeEventListener('keydown', closeByEscape);
  }, []);

  React.useEffect(() => {
    if (localStorage.getItem('jwt')) {
      setIsLoggedIn(true);
    }
  });

  return (
    <LoggedInContext.Provider value={isLoggedIn}>
      <div className='app'>
        <PopupWithForm
          isOpen={isPopupOpen}
          setIsOpen={setIsPopupOpen}
          signUpReq={mainApi.signUp.bind(mainApi)}
          signInReq={mainApi.signIn.bind(mainApi)}
          reportError={mainApi.reportError.bind(mainApi)}
        />
        <Switch>
          <ProtectedRoute path='/saved-news'>
            <SavedNewsHeader>
              <Navbar
                saved
                setIsLoggedIn={setIsLoggedIn}
                setIsOpen={setIsPopupOpen}
              />
            </SavedNewsHeader>
            <Main saved>
              <Preloader saved />
              <NewsCardList>
                <NewsCard saved />
              </NewsCardList>
              <NotFound saved />
            </Main>
          </ProtectedRoute>
          <Route path='/'>
            <Redirect to='/' />
            <Header>
              <Navbar
                setIsLoggedIn={setIsLoggedIn}
                setIsOpen={setIsPopupOpen}
              />
              <SearchForm
                searchReq={searchArticles}
                setSearchResults={setSearchResults}
              />
            </Header>
            <Main>
              <Preloader />
              <NewsCardList searchResults={searchResults}>
                <NewsCard />
              </NewsCardList>
              <NotFound />
            </Main>
            <About />
          </Route>
        </Switch>
        <Footer />
      </div>
    </LoggedInContext.Provider>
  );
}

export default App;
