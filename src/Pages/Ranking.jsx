import React, { Component } from 'react';
import { func, shape } from 'prop-types';
import { connect } from 'react-redux';
import { getInfoScorePlayer } from '../utils/localStorage';
import CardPlayer from '../Components/CardPlayer';
import { resetGame } from '../Redux/Actions';

class Ranking extends Component {
  state = {
    listUserRanks: [],
  };

  componentDidMount() {
    this.reorganizedRank();
  }

  reorganizedRank = () => {
    const rankList = getInfoScorePlayer();
    const listUserRanks = rankList.sort((a, b) => b.score - a.score);
    this.setState({
      listUserRanks,
    });
  };

  toPlayAgain = async () => {
    const { history: { push }, dispatch } = this.props;
    await dispatch(resetGame());
    push('/');
  };

  render() {
    const { listUserRanks } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <div>
          { listUserRanks.map(({ name, score }, index) => (
            <CardPlayer
              key={ index }
              name={ name }
              score={ score }
              index={ index }
            />
          )) }
        </div>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.toPlayAgain }
        >
          Play Again
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: shape({ push: func }),
  dispatch: func,
}.isRequired;

export default connect()(Ranking);
