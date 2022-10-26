import React from 'react';
import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';
import SearchForm from '../SearchForm/SearchForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header navbar={Navbar} searchForm={SearchForm}>
      </Header>
    </div>
  );
}

export default App;
