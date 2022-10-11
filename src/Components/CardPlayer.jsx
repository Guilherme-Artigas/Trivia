import { number, string } from 'prop-types';
import React, { Component } from 'react';
import createHash from '../utils/createHash';

class CardPlayer extends Component {
  state = {
    src: '',
  };

  componentDidMount() {
    const { email } = this.props;
    const src = createHash(email);
    this.setState({
      src,
    });
  }

  render() {
    const { name, score, index } = this.props;
    const { src } = this.state;
    return (
      <div>
        <img src={ src } alt="Imagem de perfil gravatar" />
        <p data-testid={ `player-name-${index}` }>{ name }</p>
        <p data-testid={ `player-score-${index}` }>{ score }</p>
      </div>
    );
  }
}

CardPlayer.propTypes = {
  name: string,
  score: number,
  index: number,
}.isRequired;

export default CardPlayer;
