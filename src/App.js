import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';

import Home from './views/home/Home';
import Weather from './views/weather/Weather';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/weather/:location" component={Weather} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
