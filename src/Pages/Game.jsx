import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayOf, func, number, shape, string } from 'prop-types';
import { Redirect } from 'react-router-dom';
import { getTokenLocal } from '../utils/localStorage';
import { requestQuestions, nextQuestion, updateScore } from '../Redux/Actions';
import shufflesAnswers from '../utils/randomizer';
import Header from '../Components/Header';

import './css/Game.css';

class Trivia extends Component {
  state = {
    checkAnswer: false,
    timer: 30,
    idTimer: 0,
    indexQuestionAtual: 0,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const token = getTokenLocal();
    dispatch(requestQuestions(token));
    this.getCurrentQuestiion();
    const decreaseTime = 1000;
    const myInterval = setInterval(() => {
      this.setState((prev) => ({ timer: prev.timer - 1 }), () => {
        const { timer } = this.state;
        if (timer === 0) this.procedCheckAnswer({ isCorrect: false });
      });
    }, decreaseTime);
    this.setState({ idTimer: myInterval });
  }

  procedCheckAnswer = ({ difficulty }, isCorrect) => {
    const { dispatch } = this.props;
    const { idTimer, timer } = this.state;
    this.setState({ checkAnswer: true });
    clearInterval(idTimer);
    if (isCorrect) dispatch(updateScore({ difficulty, timer }));
  };

  handleClickNext = () => {
    const { questions, indexQuestionAtual, dispatch } = this.props;
    console.log(indexQuestionAtual);
    dispatch(nextQuestion());
    console.log(indexQuestionAtual);
    this.setState(() => ({
      currentQuestion: shufflesAnswers(questions[indexQuestionAtual]),
      checkAnswer: false,
    }));
  };

  getCurrentQuestiion = () => {
    const { questions } = this.props;
    const { indexQuestionAtual } = this.state;
    const currentQuestion = questions[indexQuestionAtual];
    return this.setState({
      currentQuestion: shufflesAnswers(currentQuestion),
    });
  };

  render() {
    const { code, isLoading } = this.props;
    const { checkAnswer, timer, currentQuestion } = this.state;
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
                      onClick={ () => this.procedCheckAnswer(currentQuestion, isCorrect) }
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
                      onClick={ () => this.procedCheckAnswer(currentQuestion, isCorrect) }
                      disabled={ !!checkAnswer }
                    >
                      {value}
                    </button>
                  )
                ))}
              </div>
            </>
          )}
          <button
            type="button"
            data-testid="btn-next"
            onClick={ this.handleClickNext }
            hidden={ !checkAnswer }
          >
            Next

          </button>
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
  questions: arrayOf(
    shape({
      category: string,
      type: string,
      question: string,
      incorrect_answers: arrayOf(string),
      correct_answers: string,
    }),
  ),
}.isRequired;

const mapStateToProps = ({ game }) => ({
  code: game.code,
  questions: game.questions,
  indexQuestionAtual: game.indexQuestionAtual,
  // currentQuestion: game.currentQuestion,
  isLoading: game.loading,
});

export default connect(mapStateToProps)(Trivia);
