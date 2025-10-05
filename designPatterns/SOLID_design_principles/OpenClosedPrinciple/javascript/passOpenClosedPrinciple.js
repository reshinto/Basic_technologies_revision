// Polymorphic open-closed principle
class Question {
  constructor(description) {
    this.description = description;
  }

  printQuestionChoices() {
    console.log("");
  }
}

class BooleanQuestion extends Question {
  constructor(description) {
    super(description);
  }

  printQuestionChoices() {
    console.log("1. True");
    console.log("2. False");
  }
}

class MultipleChoiceQuestion extends Question {
  constructor(description, options) {
    super(description);
    this.options = options;
  }

  printQuestionChoices() {
    this.options.forEach((option, index) => {
      console.log(`${index + 1}. ${option}`);
    });
  }
}

class TextQuestion extends Question {
  constructor(description) {
    super(description);
  }

  printQuestionChoices() {
    console.log("Answer: _______________");
  }
}

class RangeQuestion extends Question {
  constructor(description) {
    super(description);
  }

  printQuestionChoices() {
    console.log("Minimum: ______________");
    console.log("Maximum: ______________");
  }
}

// this is open to be extended
// closed for modification as we do not need to touch this function
function printQuiz(questions) {
  questions.forEach(question => {
    console.log(question.description);
    question.printQuestionChoices();
  });
}

// only need to extend new features here
const questions = [
  new BooleanQuestion("This video is useful."),
  new MultipleChoiceQuestion("What is your favorite language?", [
    "CSS",
    "HTML",
    "JS",
    "Python",
  ]),
  new TextQuestion("Describe your favorite JS feature."),
  new RangeQuestion("What is the speed limit in your city?"),
];

printQuiz(questions);
