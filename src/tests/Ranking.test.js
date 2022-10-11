import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import mochStorage from './mochs/scoreMoch'
import App from '../App';

// mock localStorage font: https://javascript.plainenglish.io/testing-local-storage-with-testing-library-580f74e8805b

describe('Testando a tela de ranking', () => {
  it('Verifica se existe um título com a palavra Ranking e Botão jogar novamente', async () => {
    const { history } = renderWithRouterAndRedux(<App />, '/ranking');
    const title = screen.getByRole('heading', {  name: /ranking/i});
    expect(title).toBeInTheDocument(); 
    const btnPlayAgain = screen.getByRole('button', {  name: /play again/i})
    expect(btnPlayAgain).toBeInTheDocument(); 
    userEvent.click(btnPlayAgain)
    await waitFor(() => expect(history.location.pathname).toBe('/')) 
  })
  it('Testa se é renderizado mais de um player quando se é jogado o game duas vezes',async () => {
    Object.defineProperty(global, 'localStorage', {
      value: {
        getItem: () =>  mochStorage
      },
    })
    const { history } = renderWithRouterAndRedux(<App />, '/ranking');
    const imagem1 = screen.getByRole('img', {  name: /Imagem de perfil gravatar-Uma pessoa/i});
    expect(imagem1).toBeInTheDocument()
    const nome1 = screen.getByTestId('player-name-0')
    expect(nome1).toBeInTheDocument()
    const imagem2 = screen.getByRole('img', {  name: /Imagem de perfil gravatar-Outra Pessoa/i});
    expect(imagem2).toBeInTheDocument()
    const nome2 = screen.getByTestId('player-name-1')
    expect(nome2).toBeInTheDocument()
  })
})