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
import Popup from '../Popup/Popup';
import Form from '../Form/Form';
import NotFound from '../NotFound/NotFound';
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
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [popupType, setPopupType] = React.useState(0);
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
    setPopupType(0);
    setIsPopupOpen(true);
  }

  function closePopup() {
    setIsPopupOpen(false);
  }

  function switchForm(to) {
    resetForm();
    setApiError('');
    setPopupType(to);
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
        switchForm(2);
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
      setIsPopupOpen(history.location.state.signin);
    }
  }, []);

  return (
    <LoggedInContext.Provider value={isLoggedIn}>
      <CurrentUserContext.Provider value={currentUser}>
        <SavedArticlesContext.Provider value={savedArticles}>
          <div className='app'>
            <Popup isOpen={isPopupOpen} onClose={closePopup} type={popupType}>
              <Form
                title={'Sign In'}
                isSubmit={true}
                redirect={'Sign Up'}
                redirectTo={1}
                switchForm={switchForm}
                apiError={apiError}
                isValid={isValid}
                submitForm={submitSignIn}
              >
                <fieldset className='form__fieldset'>
                  <label htmlFor='email' className='form__input-title'>
                    Email
                  </label>
                  <input
                    value={values.email || ''}
                    onChange={handleChange}
                    type='email'
                    id='email'
                    name='email'
                    required
                    className={`form__input ${
                      errors.email ? 'form__input_error' : ''
                    }`}
                    placeholder='Enter email'
                  />
                  <span
                    className={`form__input-error ${
                      errors.email ? 'form__input-error_active' : ''
                    }`}
                  >
                    {errors.email}
                  </span>
                  <label htmlFor='password' className='form__input-title'>
                    Password
                  </label>
                  <input
                    value={values.password || ''}
                    onChange={handleChange}
                    type='password'
                    id='password'
                    name='password'
                    minLength={8}
                    required
                    className={`form__input ${
                      errors.password ? 'form__input_error' : ''
                    }`}
                    placeholder='Enter password'
                  />
                  <span
                    className={`form__input-error ${
                      errors.password ? 'form__input-error_active' : ''
                    }`}
                  >
                    {errors.password}
                  </span>
                </fieldset>
              </Form>
              <Form
                title={'Sign Up'}
                isSubmit={true}
                redirect={'Sign In'}
                redirectTo={0}
                switchForm={switchForm}
                apiError={apiError}
                isValid={isValid}
                submitForm={submitSignUp}
              >
                <fieldset className='form__fieldset'>
                  <label htmlFor='email' className='form__input-title'>
                    Email
                  </label>
                  <input
                    value={values.email || ''}
                    onChange={handleChange}
                    type='email'
                    id='email'
                    name='email'
                    required
                    className={`form__input ${
                      errors.email ? 'form__input_error' : ''
                    }`}
                    placeholder='Enter email'
                  />
                  <span
                    className={`form__input-error ${
                      errors.email ? 'form__input-error_active' : ''
                    }`}
                  >
                    {errors.email}
                  </span>
                  <label htmlFor='password' className='form__input-title'>
                    Password
                  </label>
                  <input
                    value={values.password || ''}
                    onChange={handleChange}
                    type='password'
                    id='password'
                    name='password'
                    minLength={8}
                    required
                    className={`form__input ${
                      errors.password ? 'form__input_error' : ''
                    }`}
                    placeholder='Enter password'
                  />
                  <span
                    className={`form__input-error ${
                      errors.password ? 'form__input-error_active' : ''
                    }`}
                  >
                    {errors.password}
                  </span>
                  <label htmlFor='name' className='form__input-title'>
                    Username
                  </label>
                  <input
                    value={values.name || ''}
                    onChange={handleChange}
                    type='text'
                    id='name'
                    name='name'
                    minLength={2}
                    maxLength={30}
                    required
                    className={`form__input ${
                      errors.name ? 'form__input_error' : ''
                    }`}
                    placeholder='Enter your username'
                  />
                  <span
                    className={`form__input-error ${
                      errors.name ? 'form__input-error_active' : ''
                    }`}
                  >
                    {errors.name}
                  </span>
                </fieldset>
              </Form>
              <Form
                title={'Registration successfully completed!'}
                redirect={'Sign In'}
                redirectTo={0}
                switchForm={switchForm}
                redirectClass='form__redirect-success'
              />
            </Popup>
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
                        setIsPopupOpen={setIsPopupOpen}
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
