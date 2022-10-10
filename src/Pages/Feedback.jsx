import React, { Component } from 'react';
import { connect } from 'react-redux';
import { number, shape, func } from 'prop-types';

class Feedback extends Component {
  clickPlayAgain = () => {
    const { history: { push } } = this.props;
    return push('/');
  };

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
        <button
          type="button"
          onClick={ this.clickPlayAgain }
          data-testid="btn-play-again"
        >
          Play Again
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: number,
  history: shape({ push: func }),
}.isRequired;

const mapStateToProps = ({ player }) => ({
  assertions: player.assertions,
});

export default connect(mapStateToProps)(Feedback);
