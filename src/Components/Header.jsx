import React from 'react';
import { connect } from 'react-redux';
import { string, number } from 'prop-types';
import createHash from '../utils/createHash';
// import Loading from '../Pages/Loading';

class Header extends React.Component {
  state = {
    hash: '',
  };

  componentDidMount() {
    return this.showPlayer();
  }

  showPlayer = async () => {
    const { email } = this.props;
    const playerHash = createHash(email);
    return this.setState({
      hash: playerHash,
    });
  };

  render() {
    const { hash } = this.state;
    const { name, score } = this.props;
    return (
      <header data-testid="header-component">
        <div>
          <img
            data-testid="header-profile-picture"
            src={ hash }
            alt="Gravatar profile"
          />
        </div>
        <h3 data-testid="header-player-name">{name}</h3>
        <h3 data-testid="header-score">{ score }</h3>
      </header>
    );
  }
}

Header.propTypes = {
  email: string,
  name: string,
  score: number,
}.isRequired;

const mapStateToProps = ({ player }) => ({
  email: player.gravatarEmail,
  name: player.name,
  score: player.score,
});

export default connect(mapStateToProps)(Header);
