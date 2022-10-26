import React from 'react';
import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';
import SearchForm from '../SearchForm/SearchForm';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';

function App() {
  return (
    <div className="App">
      {/* <Header navbar={Navbar} searchForm={SearchForm} /> */}
      <SavedNewsHeader navbar={Navbar} />
    </div>
  );
}

export default App;
