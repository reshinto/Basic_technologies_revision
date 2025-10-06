def print_quiz(questions):
    # this allows us to extend new types, which passes the open portion of the open-closed principle
    # when we add new features, it automatically extends the new questions and works
    # thus, modification of the open portion is not required
    for question in questions:
        print(question["description"])
        if question["type"] == "boolean":
            print("1. True")
            print("2.False")
        elif question["type"] == "multipleChoice":
            for index, option in enumerate(question["options"]):
                print(f"{index + 1}. {option}")
        elif question["type"] == "text":
            print("Answer: _______________")
        # this violates the closed portion of the open-closed principle
        # this function should be closed and not allowed for modifications
        # it should just work when new features are extended
        elif question["type"] == "range":
            print("Minimum: ______________")
            print("Maximum: ______________")
        else:
            print("")


questions = [
    {
        "type": "boolean",
        "description": "This video is useful.",
    },
    {
        "type": "multipleChoice",
        "description": "What is your favorite language?",
        "options": ["CSS", "HTML", "JS", "Python"],
    },
    {
        "type": "text",
        "description": "Describe your favorite JS feature",
    },
    # this is ok to modify as it is just extending new feature
    {
        "type": "range",
        "description": "What is the speed limit in your city?",
    },
]

print_quiz(questions)
