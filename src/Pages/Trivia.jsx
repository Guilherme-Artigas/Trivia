import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, shape } from 'prop-types';
import { getTokenLocal } from '../utils/localStorage';
import { getQuestions } from '../utils/requestApi';

class Trivia extends Component {
  state = {
    token: '',
    code: 0,
    results: [],
  };

  componentDidMount() {
    this.setState({ token: getTokenLocal() }, async () => {
      const { token } = this.state;
      const responseAPI = await getQuestions(token);
      this.setState({
        code: responseAPI.response_code,
        results: responseAPI.results,
      }, () => {
        const { code } = this.state;
        const { history: { push } } = this.props;
        const invalidToken = 3;
        if (code === invalidToken) {
          localStorage.removeItem('token');
          push('/');
        }
      });
    });
  }

  render() {
    const { results } = this.state;
    return (
      <>
        <h1>Game</h1>
        <section>
          {results.length > 0 && (
            <>
              <p data-testid="question-category">{`category: ${results[0].category}`}</p>
              <p data-testid="question-text">{`question: ${results[0].question}`}</p>
              <div data-testid="answer-options">
                <button type="button" data-testid="correct-answer">
                  {results[0].correct_answer}
                </button>
                {results[0].incorrect_answers.map((e, i) => (
                  <button
                    key={ `${e}-${i}` }
                    data-testid={ `wrong-answer-${i}` }
                    type="button"
                  >
                    {e}
                  </button>
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
}.isRequired;

export default connect()(Trivia);

// Será validado se o token inválido é excluído e a aplicação é redirecionada
// Será validado se as respostas da API são tratadas corretamente
// Será validado se a categoria da pergunta está presente
// Será validado se o texto da pergunta está presente
// Será validado se as alternativas estão presentes
// Será validado se a quantidade de alternativas corretas é 1
// Será validado se as alternativas estão posicionadas em ordem aleatória

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
