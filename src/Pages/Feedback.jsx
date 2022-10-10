import React from 'react';
import { shape, func } from 'prop-types';

class Feedback extends React.Component {
  clickPlayAgain = () => {
    const { history: { push } } = this.props;
    return push('/');
  };

  render() {
    return (
      <>
        <h1 data-testid="feedback-text">Tela de feedback</h1>
        <button
          type="button"
          onClick={ this.clickPlayAgain }
          data-testid="btn-play-again"
        >
          Play Again
        </button>
      </>
    );
  }
}

Feedback.propTypes = {
  history: shape({ push: func }),
}.isRequeried;

export default Feedback;
