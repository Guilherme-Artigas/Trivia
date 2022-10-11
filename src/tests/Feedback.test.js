import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Verificando funcionalidades da página de Feedbacks:', () => {
  it('A página deve conter imagem, pontuação, texto de feedback e links para jogar de novo e ir para a tela de ranking', () => {
    const { history } = renderWithRouterAndRedux(<App />, '/feedback')

    const { location: { pathname } } = history;

    expect(pathname).toBe('/feedback') 
    const profileImg = screen.getByRole('img', { name: /gravatar profile/i })
    const score = screen.getByTestId('header-score');
    const feedText = screen.getByTestId('feedback-text');
    const btnPlayAgain = screen.getByRole('button', { name: /play again/i });
    const btnRanking = screen.getByRole('link', { name: /ranking/i });
    expect(profileImg).toBeInTheDocument();
    expect(score).toBeInTheDocument();
    expect(feedText).toBeInTheDocument();
    expect(btnPlayAgain).toBeInTheDocument();
    expect(btnRanking).toBeInTheDocument();
  })

  it('A mensagem a ser exibida caso o jogador acerte menos de três perguntas deve ser "Could be better..."', () => {
    renderWithRouterAndRedux(<App />, '/feedback')

    const score = screen.getByTestId('header-score');
    const feedText = screen.getByTestId('feedback-text');
    expect(score).toHaveTextContent(0);
    expect(feedText).toHaveTextContent('Could be better...');
  })

  it('A mensagem a ser exibida caso o jogador acerte três ou mais perguntas deve ser "Well Done!"', () => {
    renderWithRouterAndRedux(<App />, '/feedback' ,{ player: { assertions: 4 } } )
    
    const feedText = screen.getByTestId('feedback-text');
    expect(feedText).toHaveTextContent('Well Done!');
  })

  it('A mensagem a ser exibida caso o jogador acerte trêsn ou mais perguntas deve ser "Well Done!"', async () => {
    const { history } = renderWithRouterAndRedux(<App />,'/feedback')
    
    const btnPlayAgain = screen.getByRole('button', { name: /play again/i });
    expect(btnPlayAgain).toBeInTheDocument();
    userEvent.click(btnPlayAgain)
    await waitFor(() => {
      const { location: { pathname } } = history;
      expect(pathname).toBe('/')
    })
  })
})
