import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Trivia from './Pages/Trivia';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" render={ (props) => <Login { ...props } /> } />
        <Route path="/trivia" render={ (props) => <Trivia { ...props } /> } />
      </Switch>
    </div>
  );
}
