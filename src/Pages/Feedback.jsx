import React, { Component } from 'react';
import { connect } from 'react-redux';
import { number } from 'prop-types';

class Feedback extends Component {
  render() {
    const { assertions } = this.props;
    const minimumAssertionToBeGreat = 3;
    const messageSucess = 'Well Done!';
    const messageMotivational = 'Could be better...';
    return (
      <div>
        <h1>Tela de Feedback</h1>
        <p data-testid="feedback-text">
          {assertions >= minimumAssertionToBeGreat
            ? messageSucess
            : messageMotivational}
        </p>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: number,
}.isRequired;

const mapStateToProps = ({ player }) => ({
  assertions: player.assertions,
});

export default connect(mapStateToProps)(Feedback);
