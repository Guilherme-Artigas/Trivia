import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayOf, bool, func, number, shape, string } from 'prop-types';
import { Redirect } from 'react-router-dom';
import { getTokenLocal } from '../utils/localStorage';
import { requestQuestions } from '../Redux/Actions';
import Header from '../Components/Header';

class Trivia extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const token = getTokenLocal();
    dispatch(requestQuestions(token));
  }

  render() {
    const { code, currentQuestion, isLoading } = this.props;
    const invalidToken = 3;
    return (
      <>
        <Header />
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
