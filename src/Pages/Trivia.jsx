import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, shape } from 'prop-types';
import { Redirect } from 'react-router-dom';
import { getTokenLocal } from '../utils/localStorage';
import { getQuestions } from '../utils/requestApi';

const INVALID_TOKEN = 3;

class Trivia extends Component {
  state = {
    token: '',
    code: 0,
    currentQuestion: {},
    idQuestion: 0,
    scrambledObject: {},
  };

  componentDidMount() {
    this.setState({ token: getTokenLocal() }, async () => {
      const { token, idQuestion } = this.state;
      const responseAPI = await getQuestions(token);
      const currentQuestion = responseAPI.results[idQuestion];
      this.setState({
        code: responseAPI.response_code,
        currentQuestion,
      }, () => {
        this.shufflesAnswers();
      });
    });
  }

  shufflesAnswers = () => {
    const { currentQuestion: question } = this.state;
    const questionObject = {
      category: question.category,
      difficulty: question.difficulty,
      question: question.question,
      type: question.type,
      options: [{
        id: 0,
        value: question.correct_answer,
        isCorrect: true,
      },
      ...question.incorrect_answers.map((option, index) => ({
        id: index + 1,
        value: option,
        isCorrect: false,
      }))] };
    const maximum = 4;
    const minimum = 2;
    const size = questionObject.type === 'multiple' ? maximum : minimum;
    const newList = [];
    while (newList.length < size) {
      const randomNumber = Math.floor(Math.random() * size);
      if (!newList.includes(questionObject.options[randomNumber])) {
        newList.push(questionObject.options[randomNumber]);
      }
    }
    const scrambledObject = { ...questionObject, options: newList };
    return this.setState({ scrambledObject });
  };

  render() {
    const { scrambledObject, code } = this.state;

    return (
      <>
        <h1>Game</h1>
        <section>
          {scrambledObject.options !== undefined && (
            <>
              <p data-testid="question-category">
                {`category: ${scrambledObject.category}`}
              </p>
              <p data-testid="question-text">
                {`question: ${scrambledObject.question}`}
              </p>
              {console.log(scrambledObject)}
              <div data-testid="answer-options">
                {scrambledObject.options.map(({ value, isCorrect }, i) => (
                  isCorrect ? (
                    <button
                      type="button"
                      key={ `answer-${i}` }
                      data-testid="correct-answer"
                    >
                      {value}
                    </button>
                  ) : (
                    <button
                      type="button"
                      key={ `answer-${i}` }
                      data-testid={ `wrong-answer-${i}` }
                    >
                      {value}
                    </button>
                  )
                ))}
              </div>
            </>
          )}
        </section>
        {code === INVALID_TOKEN && <Redirect to="/" />}
      </>
    );
  }
}

Trivia.propTypes = {
  // dispatch: func,
  history: shape({
    push: func,
  }),
}.isRequired;

export default connect()(Trivia);

// Será validado se o token inválido é excluído e a aplicação é redirecionada
// Será validado se as respostas da API são tratadas corretamente
// Será validado se a categoria da pergunta está presente
// Será validado se o texto da pergunta está presente
// Será validado se as alternativas estão presentes
// Será validado se a quantidade de alternativas corretas é 1
// Será validado se as alternativas estão posicionadas em ordem aleatória

// data-testid="correct-answer"
// data-testid={ `wrong-answer-${i}` }

// {
//   "category": "Geography",
//   "type": "boolean",
//   "difficulty": "medium",
//   "question": "Seoul is the capital of North Korea.",
//   "correct_answer": "False",
//   "incorrect_answers": [
//       "True"
//   ]
// }

// {
//   "category": "Entertainment: Video Games",
//   "type": "multiple",
//   "difficulty": "hard",
//   "question": "Which artist composed the original soundtrack for &quot;Watch Dogs 2&quot;?",
//   "correct_answer": "Hudson Mohawke",
//   "incorrect_answers": [
//       "Rustie",
//       "Machinedrum",
//       "Flying Lotus"
//   ]
// }
