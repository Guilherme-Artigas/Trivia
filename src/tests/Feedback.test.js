import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Feedback from '../Pages/Feedback';

describe('Verificando funcionalidades da página de Feedbacks:', () => {
  it('A página deve conter imagem, pontuação, texto de feedback e links para jogar de novo e ir para a tela de ranking', () => {
    const { history } = renderWithRouterAndRedux(<Feedback />)
    let { location: { pathname } } = history;
    pathname = '/feedback';

    const profileImg = screen.getByRole('img', { name: /gravatar profile/i })
    const score = screen.getByTestId('header-score');
    const feedText = screen.getByTestId('feedback-text');
    const btnPlayAgain = screen.getByRole('link', { name: /play again/i });
    const btnRanking = screen.getByRole('link', { name: /ranking/i });

    expect(profileImg).toBeInTheDocument();
    expect(score).toBeInTheDocument();
    expect(feedText).toBeInTheDocument();
    expect(btnPlayAgain).toBeInTheDocument();
    expect(btnRanking).toBeInTheDocument();
  })

  it('A mensagem a ser exibida caso o jogador acerte menos de três perguntas deve ser "Could be better..."', async () => {
    const { history } = renderWithRouterAndRedux(<Feedback />)
    let { location: { pathname } } = history;
    pathname = '/feedback';

    const score = screen.getByTestId('header-score');
    const feedText = screen.getByTestId('feedback-text');

    expect(score).toHaveTextContent(0);
    expect(feedText).toHaveTextContent('Could be better...');
  })

  it('A mensagem a ser exibida caso o jogador acerte trêsn ou mais perguntas deve ser "Well Done!"', async () => {
    const { history, store } = renderWithRouterAndRedux(<Feedback />, { player: { assertions: 4 } } )
    let { location: { pathname } } = history;
    pathname = '/feedback';
    
    const feedText = screen.getByTestId('feedback-text');
    expect(feedText).toHaveTextContent('Well Done!');
  })
})
