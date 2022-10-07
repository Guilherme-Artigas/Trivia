import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Components/Header';

class Trivia extends Component {
  render() {
    return (
      <div>
        <Header />
        <h1>Game</h1>
      </div>
    );
  }
}

export default connect()(Trivia);
