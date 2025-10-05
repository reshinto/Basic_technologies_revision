function printQuiz(questions) {
  // this allows us to extend new types, which passes the open portion of the open-closed principle
  // when we add new features, it automatically extends the new questions and works
  // thus, modification of the open portion is not required
  questions.forEach(question => {
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
