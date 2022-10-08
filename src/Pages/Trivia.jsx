import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayOf, bool, func, number, shape, string } from 'prop-types';
import { Redirect } from 'react-router-dom';
import { getTokenLocal } from '../utils/localStorage';
import { requestQuestions } from '../Redux/Actions';

class Trivia extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const token = getTokenLocal();
    dispatch(requestQuestions(token));
  }

  render() {
    const { code, currentQuestion, isLoading } = this.props;
    const invalidToken = 3;
    console.log(this.props);
    return (
      <>
        <h1>Game</h1>
        <section>
          {code === invalidToken && <Redirect to="/" />}
          { (isLoading === false && currentQuestion) && (
            <>
              <p data-testid="question-category">
                {`category: ${currentQuestion.category}`}
              </p>
              <p data-testid="question-text">
                {`question: ${currentQuestion.question}`}
              </p>
              <div data-testid="answer-options">
                {currentQuestion.options.map(({ value, isCorrect }, i) => (
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
      </>
    );
  }
}

Trivia.propTypes = {
  // dispatch: func,
  history: shape({
    push: func,
  }),
  code: number,
  currentQuestion: shape({
    category: string,
    question: string,
    options: arrayOf(shape({
      id: number,
      value: string,
      isCorrect: bool,
    })),
  }),
}.isRequired;

const mapStateToProps = ({ game }) => ({
  code: game.code,
  currentQuestion: game.currentQuestion,
  isLoading: game.loading,
});

export default connect(mapStateToProps)(Trivia);

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
