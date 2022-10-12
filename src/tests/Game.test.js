import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testes se na tela Game:',()=>{

beforeEach(async () =>{
    const { history } = renderWithRouterAndRedux(<App />);

    const name = screen.getByTestId("input-player-name");
    const email = screen.getByTestId("input-gravatar-email");

    userEvent.type(email, "trybe@teste.com");
    expect(email).toHaveValue("trybe@teste.com")
    userEvent.type(name, "trybe");
    expect(name).toHaveValue("trybe")

    const buttonPlay = screen.getByTestId("btn-play");
    
    userEvent.click(buttonPlay);
    await waitFor(() => expect(history.location.pathname).toBe('/game'))
})

it('a pergunta aparece corretamente.', async ()=>{

    const question = await screen.findByTestId('question-text');
    expect(question).toBeInTheDocument()
  
    const correctAnswer = screen.getByTestId("correct-answer");
    expect(correctAnswer).toBeInTheDocument();

    userEvent.click(correctAnswer);
    expect(correctAnswer.className).toBe('correct-answer')

    const wrongAnswer = screen.getAllByTestId(/wrong-answer-/i);
    wrongAnswer.forEach((element) => {
        expect(element).toBeInTheDocument();
        expect(element.className).toBe('incorrect-answer')
    })
   
    const nextBtn = screen.getByRole('button', {  name: /next/i});
    expect(nextBtn).toBeInTheDocument();

    userEvent.click(nextBtn)
    const correctAnswer2 = screen.getByTestId("correct-answer");
    expect(correctAnswer).toHaveClass('correct-answer')

  
  });

  it('o funcionamento da resposta incorreta', async ()=>{

    const question = await screen.findByTestId('question-text');
    expect(question).toBeInTheDocument()
  
    const incorrectAnswer = screen.getAllByTestId(/wrong-answer-/i);
    expect(incorrectAnswer[0]).toBeInTheDocument();

    userEvent.click(incorrectAnswer[0]);
    expect(incorrectAnswer[0].className).toBe('incorrect-answer')

    const nextBtn = screen.getByRole('button', {  name: /next/i});
    expect(nextBtn).toBeInTheDocument();
  
  });

  jest.setTimeout(40000);
  it('se o cronômetro funciona corretamente', async () => {

    const nextBtn = await screen.findByRole('button', {  name: /next/i}, {timeout:35000});
    expect(nextBtn).toBeInTheDocument();

    const stopWatch = screen.getByRole('heading', {  name: /0 segundos restantes\./i});
    expect(stopWatch).toBeInTheDocument();

    const correctAnswer = screen.getByTestId("correct-answer");
    expect(correctAnswer).toBeInTheDocument();
    expect(correctAnswer).toHaveClass("correct-answer");

    const wrongAnswer = screen.getAllByTestId(/wrong-answer-/i);
    wrongAnswer.forEach((element) => {
        expect(element).toBeInTheDocument();
        expect(element.className).toBe('incorrect-answer')
    })
})

})
