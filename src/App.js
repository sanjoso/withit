import { BrowserRouter as Router, Switch, Route, Link, Routes } from 'react-router-dom';
import { BandView } from './components/BandView/BandView';

import { TitleBar } from './components/Titlebar/TitleBar';


import './style/main.css';

function App() {
  return (
    <div className="App">
      <TitleBar />
      <BandView />
      
    </div>
  );
}

export default App;
