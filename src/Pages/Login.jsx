import React, { Component } from 'react';
import logo from '../trivia.png';
import '../App.css';

class Login extends Component {
  state = {
    name: '',
    gravatarEmail: '',
    isDisabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.verifyForm);
  };

  verifyForm = () => {
    const { name, gravatarEmail } = this.state;
    const regexVerifyEmail = /\S+@\S+\.\S+/;
    const verifyEmail = regexVerifyEmail.test(gravatarEmail)
    && gravatarEmail.endsWith('.com');
    const verifyName = name.length !== 0;

    return (verifyEmail && verifyName) && this.setState((prev) => ({
      isDisabled: !prev.isDisabled,
    }));
  };

  // handleClick = () => {

  // };

  render() {
    const { state, handleChange, handleClick } = this;
    const { name, gravatarEmail, isDisabled } = state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <input
            type="text"
            placeholder="Digite seu nome"
            data-testid="input-player-name"
            name="name"
            value={ name }
            onChange={ handleChange }
          />
          <input
            type="email"
            placeholder="Digite seu e-mail"
            data-testid="input-gravatar-email"
            name="gravatarEmail"
            value={ gravatarEmail }
            onChange={ handleChange }
          />
          <button
            type="button"
            data-testid="btn-play"
            disabled={ isDisabled }
            onClick={ handleClick }
          >
            Play
          </button>
        </header>
      </div>
    );
  }
}

export default Login;
