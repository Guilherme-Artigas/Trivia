import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Config from './Pages/Config';
import Login from './Pages/Login';
import Trivia from './Pages/Game';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" render={ (props) => <Login { ...props } /> } />
        <Route path="/game" render={ (props) => <Trivia { ...props } /> } />
        <Route path="/config" render={ (props) => <Config { ...props } /> } />
      </Switch>
    </div>
  );
}
