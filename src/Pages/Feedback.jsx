import React, { Component } from 'react';
import { connect } from 'react-redux';
import { number, shape, func } from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import { resetGame } from '../Redux/Actions';

class Feedback extends Component {
  toPlayAgain = async () => {
    const { history: { push }, dispatch } = this.props;
    await dispatch(resetGame());
    push('/Trivia');
  };

  render() {
    const { assertions, score } = this.props;
    const minimumAssertionToBeGreat = 3;
    const messageSucess = 'Well Done!';
    const messageMotivational = 'Could be better...';
    return (
      <div>
        <Header />
        <h1>
          Final Score:
          <p data-testid="feedback-total-score">{ score }</p>
        </h1>
        <h2>
          Assertions:
          <p data-testid="feedback-total-question">{ assertions }</p>
        </h2>
        <p data-testid="feedback-text">
          {assertions >= minimumAssertionToBeGreat
            ? messageSucess
            : messageMotivational}
        </p>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.toPlayAgain }
        >
          Play Again
        </button>
        <Link to="/ranking" data-testid="btn-ranking">
          Ranking
        </Link>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: number,
  score: number,
  history: shape({ push: func }),
  dispatch: func,
}.isRequired;

const mapStateToProps = ({ player }) => ({
  assertions: player.assertions,
  score: player.score,
});

export default connect(mapStateToProps)(Feedback);
