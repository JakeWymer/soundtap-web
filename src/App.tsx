import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import Router from './components/Router';
import Header from './components/Header/Header';
import './App.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Router />
      </div>
    </BrowserRouter>
  );
}

export default App;
