const shufflesAnswers = (question) => {
  if (question) {
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
    return scrambledObject;
  }
};

export default shufflesAnswers;
