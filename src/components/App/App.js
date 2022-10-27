import React from 'react';
import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';
import SearchForm from '../SearchForm/SearchForm';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import About from '../About/About';
import Footer from '../Footer/Footer';

function App() {
  return (
    <div className="app">
      <Header navbar={Navbar} searchForm={SearchForm} />
      <SavedNewsHeader navbar={Navbar} />
      <About />
      <Footer />
    </div>
  );
}

export default App;
