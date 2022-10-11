import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
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

  it('', async () => {
    const { history } = renderWithRouterAndRedux(<Feedback />)
    let { location: { pathname } } = history;
    pathname = '/feedback';

    const btnPlayAgain = screen.getByRole('link', { name: /play again/i });
    const btnRanking = screen.getByRole('link', { name: /ranking/i });

    await userEvent.click(btnPlayAgain);
    console.log(pathname);
    // pathname = '/';
    // expect(pathname).toBe('/');
  })
})