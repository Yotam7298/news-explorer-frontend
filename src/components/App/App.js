// Imports
// React
import React from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
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
import NotFound from '../NotFound/NotFound';
import Login from '../Login/Login';
import Register from '../Register/Register';
// APIs
import mainApi from '../../utils/MainApi';
import searchArticles from '../../utils/NewsApi';
// Contexts
import LoggedInContext from '../../contexts/LoggedInContext';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import SavedArticlesContext from '../../contexts/SavedArticlesContext';
// Protected Route
import ProtectedRoute from '../../utils/ProtectedRoute';
// Validator
import useFormValidation from '../../hooks/formValidatorHook';

function App() {
  const initialState = () => !!localStorage.getItem('jwt');

  // State Variables
  // User
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(initialState);
  // Popup
  const [isRegisterOpen, setIsRegisterOpen] = React.useState(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = React.useState(false);
  const [isLoginOpen, setIsLoginOpen] = React.useState(false);
  const [apiError, setApiError] = React.useState('');
  // Server
  const [isLoading, setIsLoading] = React.useState(false);
  const [isServerError, setIsServerError] = React.useState(false);
  // Articles
  const [showResults, setShowResults] = React.useState(true);
  const [articles, setArticles] = React.useState([]);
  const [savedArticles, setSavedArticles] = React.useState([]);

  const history = useHistory();

  //Form Validation consts
  const { values, handleChange, errors, isValid, resetForm } =
    useFormValidation();

  function getSavedArticles() {
    setIsLoading(true);

    mainApi
      .getArticles()
      .then((articles) => {
        setIsServerError(false);
        setSavedArticles(articles);
      })
      .catch((err) => {
        setIsServerError(true);
        mainApi.reportError(err);
      })
      .finally(() => setIsLoading(false));
  }

  function openSignIn() {
    resetForm();
    setApiError('');
    setIsLoginOpen(true);
  }

  function closePopup() {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
    setIsRegisterSuccess(false);
  }

  function switchForm(to) {
    resetForm();
    setApiError('');
    if (to === 'Sign In') {
      setIsLoginOpen(true);
      setIsRegisterOpen(false);
      setIsRegisterSuccess(false);
    } else if (to === 'Sign Up') {
      setIsLoginOpen(false);
      setIsRegisterOpen(true);
      setIsRegisterSuccess(false);
    }
  }

  // Submit Functions
  function submitSignIn(evt) {
    evt.preventDefault();

    mainApi
      .signIn(values)
      .then((jwt) => {
        localStorage.setItem('jwt', jwt.token);
        closePopup();
        setApiError('');
        history.go(0);
      })
      .catch((err) => {
        mainApi.reportError(err).then((data) => setApiError(data.message));
      });
  }

  function submitSignUp(evt) {
    evt.preventDefault();

    mainApi
      .signUp({
        email: values.email,
        password: values.password,
        name: values.name,
      })
      .then(() => {
        setIsRegisterSuccess(true);
        setApiError('');
      })
      .catch((err) => {
        mainApi.reportError(err).then((data) => setApiError(data.message));
      });
  }

  // useEffects:
  // JWT check
  React.useEffect(() => {
    if (localStorage.getItem('jwt')) {
      mainApi
        .getSelf()
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        })
        .catch((err) => mainApi.reportError(err));
    }
  }, []);

  React.useEffect(() => {
    if (!localStorage.getItem('articles')) {
      setShowResults(false);
    }
    if (isLoggedIn) {
      getSavedArticles();
    }
    if (history.location.state) {
      setIsLoginOpen(history.location.state.signin);
    }
  }, []);

  return (
    <LoggedInContext.Provider value={isLoggedIn}>
      <CurrentUserContext.Provider value={currentUser}>
        <SavedArticlesContext.Provider value={savedArticles}>
          <div className='app'>
            {isLoginOpen && (
              <Login
                isOpen={isLoginOpen}
                onClose={closePopup}
                apiError={apiError}
                isValid={isValid}
                submitForm={submitSignIn}
                values={values}
                errors={errors}
                handleChange={handleChange}
                switchForm={switchForm}
              />
            )}
            {isRegisterOpen && (
              <Register
                isOpen={isRegisterOpen}
                isSuccess={isRegisterSuccess}
                onClose={closePopup}
                apiError={apiError}
                isValid={isValid}
                submitForm={submitSignUp}
                values={values}
                errors={errors}
                handleChange={handleChange}
                switchForm={switchForm}
              />
            )}
            <Switch>
              <ProtectedRoute path='/saved-news'>
                <SavedNewsHeader>
                  <Navbar saved setIsLoggedIn={setIsLoggedIn} />
                </SavedNewsHeader>
                <Main
                  saved
                  isLoading={isLoading}
                  getSavedArticles={getSavedArticles}
                >
                  <Preloader saved />
                  <NewsCardList articles={savedArticles}>
                    <NewsCard
                      saved
                      removeReq={mainApi.removeArticle.bind(mainApi)}
                      reloadSavedArticles={getSavedArticles}
                      reportError={mainApi.reportError.bind(mainApi)}
                    />
                  </NewsCardList>
                  <NotFound saved />
                </Main>
              </ProtectedRoute>
              <Route path='/'>
                <Redirect to='/' />
                <Header>
                  <Navbar
                    setIsLoggedIn={setIsLoggedIn}
                    openSignIn={openSignIn}
                  />
                  <SearchForm
                    searchReq={searchArticles}
                    setArticles={setArticles}
                    getSavedArticles={getSavedArticles}
                    setIsLoading={setIsLoading}
                    setShowResults={setShowResults}
                    reportError={mainApi.reportError.bind(mainApi)}
                    setIsServerError={setIsServerError}
                  />
                </Header>
                {showResults && (
                  <Main isLoading={isLoading} articles={articles}>
                    <Preloader />
                    <NewsCardList
                      articles={JSON.parse(localStorage.getItem('articles'))}
                    >
                      <NewsCard
                        bookmarkReq={mainApi.saveArticle.bind(mainApi)}
                        removeReq={mainApi.removeArticle.bind(mainApi)}
                        reportError={mainApi.reportError.bind(mainApi)}
                        setIsLoginOpen={setIsLoginOpen}
                        setArticles={setArticles}
                        getSavedArticles={getSavedArticles}
                      />
                    </NewsCardList>
                    <NotFound isServerError={isServerError} />
                  </Main>
                )}
                <About />
              </Route>
            </Switch>
            <Footer />
          </div>
        </SavedArticlesContext.Provider>
      </CurrentUserContext.Provider>
    </LoggedInContext.Provider>
  );
}

export default App;
