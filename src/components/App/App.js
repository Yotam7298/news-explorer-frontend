import React from 'react';
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
import { Switch, Route } from 'react-router-dom';

function App() {
  const pathname = window.location.pathname;

  return (
    <div className="app">
      <Switch>
        <Route path='/saved-news'>
        <SavedNewsHeader navbar={Navbar} />
        <Main element={NewsCard} elementList={NewsCardList} isSaved={true} />
      </Route>
      <Route path='/'>
        <Header navbar={Navbar} searchForm={SearchForm} />
        <About />
      </Route>
    </Switch>
    <Footer /> 
    </div>
  );
}

export default App;
