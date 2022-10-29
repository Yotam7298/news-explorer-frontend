import React from 'react';
import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';
import SearchForm from '../SearchForm/SearchForm';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import About from '../About/About';
import Footer from '../Footer/Footer';
import NewsCard from '../NewsCard/NewsCard';

function App() {
  return (
    <div className="app">
      {/* <Header navbar={Navbar} searchForm={SearchForm} />
      <SavedNewsHeader navbar={Navbar} />
      <About />
      <Footer /> */}
      <NewsCard />
    </div>
  );
}

export default App;
