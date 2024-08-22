1. No need for the README.md file outside my-quiz-app folder.
Update the README.md inside my-quiz-app folder to contain overview of the project. I'd recommend you to publish the project on Vercel, for example, and add a link to the README.md as well.

What's README and why is it needed:

A `README.md` file is essentially a user manual for your software project. It's a markdown file, which means it uses plain text formatting syntax to make it easy for you to style various elements like headers, links, and lists. Here’s why it’s super useful:

1. **Introduction and Overview**: It introduces the project to new users and developers, providing a high-level overview of what the project does and its purpose.

2. **Setup Instructions**: It typically includes setup instructions, making it easier for others to get the project running on their own systems. This can include installation steps, dependencies they need to install, and any initial configuration they need to do.

3. **Usage**: For tools or libraries, the `README.md` often contains examples of how to use the project, API endpoints, or command-line commands.

4. **Contribution Guidelines**: If the project is open for contributions, the README can detail the process for submitting pull requests, reporting bugs, and other community-management practices.

5. **License Information**: It often contains a section on the project's license, informing users and contributors about the legal permissions on the usage and distribution of the software.

In essence, the `README.md` file serves as the first point of contact for anyone who encounters your project, making it an essential component for effective communication and collaboration. Plus, a well-crafted README makes a project look professional and well-maintained.


2. If design is not something you want to spend time on, use a library (e.g. Material-UI) to make the project look good.

3. In the QuizApp component, there's some manual mapping based on the question type. The component also contains hardcoded question text like '<p>const cars = ["Mercedes", "Volvo", "Audi"]</p>'. This should be avoided. Kepp all information that you need to present a question to the user in the data object (Data), e.g. it can also contain type of the input element that is expected to be presented to the user.

4. In the QuizeApp, calculation of the class is overcomplicated. Instead of:
```className={
                                            (question.type === "single" && question.input === option && isCompleted)
                                                ? question.isCorrect
                                                    ? "correct"
                                                    : "wrong"
                                                : (question.type === "single" && option === question.correctAnswer && isCompleted && !question.isCorrect)
                                                    ? "correct"
                                                    : (question.type === "multiple" && question.input.includes(option) && isCompleted)
                                                        ? question.isCorrect
                                                            ? "correct"
                                                            : "wrong"
                                                        : (question.type === "multiple" && option === question.correctAnswer && isCompleted && !question.isCorrect)
                                                            ? "correct"
                                                            : ""
                                        }```
Do something like this:
```
function getClassName(question, option, isCompleted) {
    if (!isCompleted) {
        return ""; // If the quiz isn't completed, no class needs to be applied
    }

    const isUserAnswerCorrect = question.isCorrect;
    const didUserSelectOption = question.input === option || (question.type === "multiple" && question.input.includes(option));
    const isOptionCorrectAnswer = option === question.correctAnswer;

    if (didUserSelectOption) {
        // User selected this option
        return isUserAnswerCorrect ? "correct" : "wrong";
    } else if (isOptionCorrectAnswer && !isUserAnswerCorrect) {
        // User didn't select this option, but it's a correct answer
        // This happens only in multiple choice where user can select multiple answers and missed this correct one
        return "correct";
    }

    return "";
}```

```
className={getClassName(question, option, isCompleted)}
```

