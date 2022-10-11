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
    push('/');
  };

  render() {
    const { assertions } = this.props;
    const minimumAssertionToBeGreat = 3;
    const messageSucess = 'Well Done!';
    const messageMotivational = 'Could be better...';
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">
          {assertions >= minimumAssertionToBeGreat
            ? messageSucess
            : messageMotivational}
        </p>
        <Link to="/" data-testid="btn-play-again">
          Play Again
        </Link>
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
  history: shape({ push: func }),
  dispatch: func,
}.isRequired;

const mapStateToProps = ({ player }) => ({
  assertions: player.assertions,
});

export default connect(mapStateToProps)(Feedback);
