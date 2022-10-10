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
    timer: 30,
    idTimer: 0,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const token = getTokenLocal();
    dispatch(requestQuestions(token));
    const decreaseTime = 1000;
    const myInterval = setInterval(() => {
      this.setState((prev) => ({ timer: prev.timer - 1 }), () => {
        const { timer } = this.state;
        if (timer === 0) this.procedureCheckAnswer();
      });
    }, decreaseTime);
    this.setState({ idTimer: myInterval });
  }

  procedureCheckAnswer = () => {
    const { idTimer } = this.state;
    this.setState({ checkAnswer: true });
    clearInterval(idTimer);
  };

  render() {
    const { code, currentQuestion, isLoading } = this.props;
    const { checkAnswer, timer } = this.state;
    const invalidToken = 3;

    return (
      <>
        <Header />
        <section>
          <h1>
            {`${timer} segundos restantes.`}
          </h1>
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
                      disabled={ !!checkAnswer }
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
                      disabled={ !!checkAnswer }
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
