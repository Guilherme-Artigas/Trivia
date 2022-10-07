import React, { Component } from 'react';
import { connect } from 'react-redux';

class Trivia extends Component {
  render() {
    return (
      <h1>Game</h1>
    );
  }
}

export default connect()(Trivia);
