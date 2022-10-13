import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { fetch, fetchInvalido } from './mochs/fetch'


describe('Testes se na tela Game:',()=>{
  jest.setTimeout(30000);
  it('a pergunta aparece corretamente.', async ()=>{
    global.fetch = fetch;

    const { history } = renderWithRouterAndRedux(<App />);

    const name = screen.getByTestId("input-player-name");
    const email = screen.getByTestId("input-gravatar-email");

    userEvent.type(email, "trybe@teste.com");
    expect(email).toHaveValue("trybe@teste.com")
    userEvent.type(name, "trybe");
    expect(name).toHaveValue("trybe")

    const buttonPlay = screen.getByTestId("btn-play");
    
    userEvent.click(buttonPlay);
    
    await waitFor(() => expect(history.location.pathname).toBe('/game'), { timeout: 15000}) 

    await waitFor(() => {
      const question1 = screen.getByTestId('question-text');
      expect(question1).toBeInTheDocument()
    
      const correctAnswer1 = screen.getByTestId("correct-answer");
      expect(correctAnswer1).toBeInTheDocument();

      userEvent.click(correctAnswer1);
      expect(correctAnswer1.className).toBe('correct-answer')

      const wrongAnswer1 = screen.getAllByTestId(/wrong-answer-/i);
      wrongAnswer1.forEach((element) => {
          expect(element).toBeInTheDocument();
          expect(element.className).toBe('incorrect-answer')
      })

      const nextBtn1 = screen.getByRole('button', {  name: /next/i});
      expect(nextBtn1).toBeInTheDocument();
  
      userEvent.click(nextBtn1)  

      expect(question1.textContent).not.toBe('');
    }, { timeout: 10000})
      
    await waitFor(() => {
      const question2 = screen.getByTestId("question-text");
      expect(question2.textContent).not.toBe('The Republic of Malta is the smallest microstate worldwide.');
      expect(question2).toBeInTheDocument()

      const correctAnswer2 = screen.getByTestId("correct-answer");
      expect(correctAnswer2).toBeInTheDocument();

      userEvent.click(correctAnswer2);
      expect(correctAnswer2.className).toBe('correct-answer')
    
      const incorrectAnswer2 = screen.getAllByTestId(/wrong-answer-/i);
      expect(incorrectAnswer2[0]).toBeInTheDocument();
  
      expect(incorrectAnswer2[0].className).toBe('incorrect-answer')
  
      const nextBtn2 = screen.getByRole('button', {  name: /next/i});
      expect(nextBtn2).toBeInTheDocument();
      
      userEvent.click(nextBtn2)

    }, { timeout: 10000})

    await waitFor(() => {
      const question3 = screen.getByTestId("question-text");
      expect(question3.textContent).not.toBe('In quantum physics, which of these theorised sub-atomic particles has yet to be observed?');
      expect(question3).toBeInTheDocument()

      const correctAnswer3 = screen.getByTestId("correct-answer");
      expect(correctAnswer3).toBeInTheDocument();

      userEvent.click(correctAnswer3);
      expect(correctAnswer3.className).toBe('correct-answer')
    
      const incorrectAnswer3 = screen.getAllByTestId(/wrong-answer-/i);
      expect(incorrectAnswer3[0]).toBeInTheDocument();
      expect(incorrectAnswer3[0].className).toBe('incorrect-answer')
  
      const nextBtn3 = screen.getByRole('button', {  name: /next/i});
      expect(nextBtn3).toBeInTheDocument();

      userEvent.click(nextBtn3)

    }, { timeout: 10000})

    await waitFor(() => {
      const question4 = screen.getByTestId("question-text");
      expect(question4.textContent).not.toBe('Generally, which component of a computer draws the most power?');
      expect(question4).toBeInTheDocument()

      const correctAnswer4 = screen.getByTestId("correct-answer");
      expect(correctAnswer4).toBeInTheDocument();
      
      const incorrectAnswer4 = screen.getAllByTestId(/wrong-answer-/i);
      expect(incorrectAnswer4[0]).toBeInTheDocument();
      userEvent.click(incorrectAnswer4[0]);

      expect(correctAnswer4.className).toBe('correct-answer')
      expect(incorrectAnswer4[0].className).toBe('incorrect-answer')
  
      const nextBtn4 = screen.getByRole('button', {  name: /next/i});
      expect(nextBtn4).toBeInTheDocument();

      userEvent.click(nextBtn4)

    }, { timeout: 10000})

    await waitFor(() => {
      const question5 = screen.getByTestId("question-text");
      expect(question5.textContent).not.toBe('What is the most expensive weapon in Counter-Strike: Global Offensive?');
      expect(question5).toBeInTheDocument()

      const correctAnswer5 = screen.getByTestId("correct-answer");
      expect(correctAnswer5).toBeInTheDocument();

      userEvent.click(correctAnswer5);
      expect(correctAnswer5.className).toBe('correct-answer')
    
      const incorrectAnswer5 = screen.getAllByTestId(/wrong-answer-/i);
      expect(incorrectAnswer5[0]).toBeInTheDocument();
      expect(incorrectAnswer5[0].className).toBe('incorrect-answer')
  
      const nextBtn5 = screen.getByRole('button', {  name: /next/i});
      expect(nextBtn5).toBeInTheDocument();

      userEvent.click(nextBtn5)

    }, { timeout: 10000})

    await waitFor(() => expect(history.location.pathname).toBe('/feedback'))
    });

  jest.setTimeout(40000);
  it('se o cronômetro funciona corretamente', async () => {
    global.fetch = fetch;
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

describe('aa', () => {
  it('', async () => {
    global.fetch = fetchInvalido;

    const { history } = renderWithRouterAndRedux(<App />);

    const name = screen.getByTestId("input-player-name");
    const email = screen.getByTestId("input-gravatar-email");

    userEvent.type(email, "trybe@teste.com");
    expect(email).toHaveValue("trybe@teste.com")
    userEvent.type(name, "trybe");
    expect(name).toHaveValue("trybe")

    const buttonPlay = screen.getByTestId("btn-play");

    userEvent.click(buttonPlay);
    
    await waitFor(() => expect(history.location.pathname).toBe('/game'), { timeout: 15000}) 
  })
})
