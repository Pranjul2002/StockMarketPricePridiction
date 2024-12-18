import './App.css';
import { useState } from 'react';

import Header from './components/Hearder/Header';
import Content from './components/Content/Content';
import Footer from './components/Footer/Footer';

function App() {

  return (
    <div className="App">
      <Header/>
      <Content/>
      <Footer/>
    </div>
  );
}

export default App;
