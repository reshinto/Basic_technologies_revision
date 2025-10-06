def print_quiz(questions):
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
]

print_quiz(questions)
