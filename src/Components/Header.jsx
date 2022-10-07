import React from 'react';
import Loading from '../Pages/Loading';
import playerGet from '../utils/requestApi';

class Header extends React.Component {
  state = { player: '', loading: true };

  componentDidMount() {
    this.showplayer();
  }

  showplayer = async () => {
    const playerHash = await getplayer();
    this.setState({ player: playerHash.name, loading: false });
  };

  render() {
    const { player, loading } = this.state;
    return (
      <header data-testid="header-component">
        <div>
          <img data-testid="header-profile-picture" src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" alt="Gravatar profile" />
        </div>
        {loading ? <Loading /> : <h3 data-testid="header-player-name">{player}</h3>}
      </header>
    );
  }
}

export default Header;
