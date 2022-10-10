import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayOf, bool, func, number, shape, string } from 'prop-types';
import { Redirect } from 'react-router-dom';
import { getTokenLocal } from '../utils/localStorage';
import { requestQuestions } from '../Redux/Actions';
import Header from '../Components/Header';

import './css/Game.css';

class Trivia extends Component {
  state = {
    checkAnswer: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const token = getTokenLocal();
    dispatch(requestQuestions(token));
  }

  procedureCheckAnswer = () => this.setState({ checkAnswer: true });

  render() {
    const { code, currentQuestion, isLoading } = this.props;
    const { checkAnswer } = this.state;
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
                      className={ checkAnswer ? 'correct-answer' : undefined }
                      onClick={ this.procedureCheckAnswer }
                    >
                      {value}
                    </button>
                  ) : (
                    <button
                      type="button"
                      key={ `answer-${i}` }
                      data-testid={ `wrong-answer-${i}` }
                      className={ checkAnswer ? 'incorrect-answer' : undefined }
                      onClick={ this.procedureCheckAnswer }
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
