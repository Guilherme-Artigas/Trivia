import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Config from './Pages/Config';
import Login from './Pages/Login';
import Game from './Pages/Game';
import Feedback from './Pages/Feedback';
import Ranking from './Pages/Ranking';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" render={ (props) => <Login { ...props } /> } />
        <Route path="/game" render={ (props) => <Game { ...props } /> } />
        <Route path="/config" render={ (props) => <Config { ...props } /> } />
        <Route path="/feedback" render={ (props) => <Feedback { ...props } /> } />
        <Route path="/ranking" render={ (props) => <Ranking { ...props } /> } />
      </Switch>
    </div>
  );
}
