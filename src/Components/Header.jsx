import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import Loading from '../Pages/Loading';
import { playerGet } from '../utils/requestApi';

class Header extends React.Component {
  state = { loading: true,
  };

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
      loading: false,
    });
  };

  render() {
    const { loading, hash } = this.state;
    const { name, score } = this.props;
    return (
      <header data-testid="header-component">
        <div>
          {loading ? <Loading />
            : (
              <img
                data-testid="header-profile-picture"
                src={ hash }
                alt="Gravatar profile"
              />
            )}
        </div>
        <h3 data-testid="header-player-name">{name}</h3>
        <h3 data-testid="header-score">{ score }</h3>
      </header>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  email: player.gravatarEmail,
  name: player.name,
  score: player.score,
});

export default connect(mapStateToProps)(Header);
