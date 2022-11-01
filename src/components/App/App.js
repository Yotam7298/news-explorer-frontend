import React from 'react';
import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';
import SearchForm from '../SearchForm/SearchForm';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import Main from '../Main/Main';
// import Preloader from '../Preloader/Preloader';
import About from '../About/About';
import Footer from '../Footer/Footer';
import NewsCard from '../NewsCard/NewsCard';
import NewsCardList from '../NewsCardList/NewscardList';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { Switch, Route, Redirect } from 'react-router-dom';

function App() {
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);

  React.useEffect(() => {
    const closeByEscape = (evt) => {
      if (evt.key === 'Escape') {
        setIsPopupOpen(false);
      }
    };

    document.addEventListener('keydown', closeByEscape);

    return () => document.removeEventListener('keydown', closeByEscape);
  }, []);

  return (
    <div className='app'>
      <PopupWithForm isOpen={isPopupOpen} setIsOpen={setIsPopupOpen} />
      <Switch>
        <Route path='/saved-news'>
          <SavedNewsHeader>
            <Navbar saved={true} setIsOpen={setIsPopupOpen} />
          </SavedNewsHeader>
          <Main element={NewsCard} elementList={NewsCardList} isSaved={true} />
        </Route>
        <Route path='/'>
          <Redirect to='/' />
          <Header searchForm={SearchForm}>
            <Navbar setIsOpen={setIsPopupOpen} />
          </Header>
          <About />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
