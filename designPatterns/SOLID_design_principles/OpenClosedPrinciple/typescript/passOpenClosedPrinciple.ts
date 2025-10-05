interface QuestionInterface {
  description: string;
  printQuestionChoices(): void;
}

class BooleanQuestion implements QuestionInterface {
  description: string;

  constructor(description: string) {
    this.description = description;
  }

  printQuestionChoices() {
    console.log("1. True");
    console.log("2. False");
  }
}

class MultipleChoiceQuestion implements QuestionInterface {
  description: string;
  options: string[];

  constructor(description: string, options: string[]) {
    this.description = description;
    this.options = options;
  }

  printQuestionChoices() {
    this.options.forEach((option, index) => {
      console.log(`${index + 1}. ${option}`);
    });
  }
}

class TextQuestion implements QuestionInterface {
  description: string;

  constructor(description: string) {
    this.description = description;
  }

  printQuestionChoices() {
    console.log("Answer: _______________");
  }
}

class RangeQuestion implements QuestionInterface {
  description: string;

  constructor(description: string) {
    this.description = description;
  }

  printQuestionChoices() {
    console.log("Minimum: ______________");
    console.log("Maximum: ______________");
  }
}

// this is open to be extended
// closed for modification as we do not need to touch this function
function printQuiz(questions: QuestionInterface[]) {
  questions.forEach(question => {
    console.log(question.description);
    question.printQuestionChoices();
  });
}

// only need to extend new features here
const questions: QuestionInterface[] = [
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
