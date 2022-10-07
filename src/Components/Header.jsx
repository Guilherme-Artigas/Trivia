import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import { string, number } from 'prop-types';
// import Loading from '../Pages/Loading';
import { playerGet } from '../utils/requestApi';

class Header extends React.Component {
  componentDidMount() {
    return this.showPlayer();
  }

  createHash = () => {
    const { email } = this.props;
    const hash = md5(email).toString().trim();
    return hash;
  };

  showPlayer = async () => {
    const hash = this.createHash();
    const playerHash = await playerGet(hash);
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
