import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testes do requisito 4',()=>{
it('Testa se os inputs do component login estão na tela',()=>{
renderWithRouterAndRedux(<App/>);
const name = screen.getByTestId('input-player-name');
const email = screen.getByTestId('input-gravatar-email'); 

expect(name).toBeInTheDocument();
expect(email).toBeInTheDocument();

})

it('Testa se o botao play está na tela',()=>{
  renderWithRouterAndRedux(<App/>);

const button = screen.getByRole('button', { name: /play/i });
userEvent.click(button);


expect(button).toBeInTheDocument();

})
it('Testa se o botao config está na tela',()=>{
  const { history } = renderWithRouterAndRedux(<App/>);
  const button = screen.getByRole('button', { name: /configurações/i });
userEvent.click(button);

const { location: { pathname } } = history;
expect(pathname).toBe('/config');

})
})


it('Testa se o botão play está desativado caso não passe nos suit test e se habilita corretamente', ()=>{
    renderWithRouterAndRedux(<App/>);
    const name = screen.getByTestId('input-player-name');
    const showname = 'igor';
    const gravatarEmail = screen.getByTestId('input-gravatar-email'); 
    const test = 'igorcruz001@gmail.com';
    userEvent.type(name, showname);
    userEvent.type(gravatarEmail, test);
      expect(name.value).toBe(showname);
      expect(gravatarEmail.value).toBe(test);
      const button = screen.getByRole('button', { name: /play/i });
      userEvent.click(button);
      expect(button).not.toBeDisabled();  
  })


  
  it("Verifica o encaminhamento correto para o jogo ", async() => {

    const { history } = renderWithRouterAndRedux(<App />);

    const name = screen.getByTestId("input-player-name");
    const email = screen.getByTestId("input-gravatar-email");

    userEvent.type(email, "trybe@teste.com");
    userEvent.type(name, "trybe");

    const buttonPlay = screen.getByTestId("btn-play");
    
    userEvent.click(buttonPlay);
    
    await waitFor(() => expect(history.location.pathname).toBe('/game')) 
  });
