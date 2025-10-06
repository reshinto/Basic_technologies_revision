# TypeScript Example

## Violate OCP

- potential issues:
  - if later, you want to add a new option or new question type to the quiz
    - e.g.: a range of values type
  - refer to **Violate OCP Extended**

```ts
function printQuiz(questions) {
  questions.forEach((question) => {
    console.log(question.description);
    switch (question.type) {
      case "boolean":
        console.log("1. True");
        console.log("2.False");
        break;
      case "multipleChoice":
        question.options.forEach((option, index) => {
          console.log(`${index + 1}. ${option}`);
        });
        break;
      case "text":
        console.log("Answer: _______________");
        break;
      default:
        console.log("");
        break;
    }
  });
}

const questions = [
  {
    type: "boolean",
    description: "This video is useful.",
  },
  {
    type: "multipleChoice",
    description: "What is your favorite language?",
    options: ["CSS", "HTML", "JS", "Python"],
  },
  {
    type: "text",
    description: "Describe your favorite JS feature",
  },
];

printQuiz(questions);
```

## Violate OCP Extended

```ts
function printQuiz(questions) {
  // this allows us to extend new types, which passes the open portion of the open-closed principle
  // when we add new features, it automatically extends the new questions and works
  // thus, modification of the open portion is not required
  questions.forEach((question) => {
    console.log(question.description);
    switch (question.type) {
      case "boolean":
        console.log("1. True");
        console.log("2.False");
        break;
      case "multipleChoice":
        question.options.forEach((option, index) => {
          console.log(`${index + 1}. ${option}`);
        });
        break;
      case "text":
        console.log("Answer: _______________");
        break;
      // this violates the closed portion of the open-closed principle
      // this function should be closed and not allowed for modifications
      // it should just work when new features are extended
      case "range":
        console.log("Minimum: ______________");
        console.log("Maximum: ______________");
        break;
      default:
        console.log("");
        break;
    }
  });
}

const questions = [
  {
    type: "boolean",
    description: "This video is useful.",
  },
  {
    type: "multipleChoice",
    description: "What is your favorite language?",
    options: ["CSS", "HTML", "JS", "Python"],
  },
  {
    type: "text",
    description: "Describe your favorite JS feature",
  },
  // this is ok to modify as it is just extending new feature
  {
    type: "range",
    description: "What is the speed limit in your city?",
  },
];

printQuiz(questions);
```

## Pass OCP

```ts
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
  questions.forEach((question) => {
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
```
