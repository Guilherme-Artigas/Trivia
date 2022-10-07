import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './Pages/Login';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" render={ (props) => <Login { ...props } /> } />
      </Switch>
    </div>
  );
}
