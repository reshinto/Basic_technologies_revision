# Polymorphic open-closed principle
class Question:
    def __init__(self, description):
        self.description = description

    def print_question_choices(self):
        print("")


class BooleanQuestion(Question):
    def __init__(self, description):
        super().__init__(description)

    def print_question_choices(self):
        print("1. True")
        print("2. False")


class MultipleChoiceQuestion(Question):
    def __init__(self, description, options):
        super().__init__(description)
        self.options = options

    def print_question_choices(self):
        for index, option in enumerate(self.options):
            print(f"{index + 1}. {option}")


class TextQuestion(Question):
    def __init__(self, description):
        super().__init__(description)

    def print_question_choices(self):
        print("Answer: _______________")


class RangeQuestion(Question):
    def __init__(self, description):
        super().__init__(description)

    def print_question_choices(self):
        print("Minimum: ______________")
        print("Maximum: ______________")


# this is open to be extended
# closed for modification as we do not need to touch this function
def print_quiz(questions):
    for question in questions:
        print(question.description)
        question.print_question_choices()


# only need to extend new features here
questions = [
    BooleanQuestion("This video is useful."),
    MultipleChoiceQuestion(
        "What is your favorite language?",
        [
            "CSS",
            "HTML",
            "JS",
            "Python",
        ],
    ),
    TextQuestion("Describe your favorite JS feature."),
    RangeQuestion("What is the speed limit in your city?"),
]

print_quiz(questions)
