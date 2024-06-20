import React, { useState } from "react";
import { Data } from "./Data";
import "./styles.css";

export const QuizApp = () => {
    const [questions, setQuestions] = useState(Data);
    const [isCompleted, setIsCompleted] = useState(false);

    const handleSubmitForm = (e) => {
        e.preventDefault();
        setIsCompleted(true);
        const updatedQuestions = questions.map((question) => {
            if (question.type === "single") {
                return {
                    ...question,
                    isCorrect: question.input === question.correctAnswer
                };
            } else if (question.type === "multiple") {
                return {
                    ...question,
                    isCorrect: arraysEqual(question.input.sort(), question.correctAnswer.sort())
                };
            } else if (question.type === "text") {
                return {
                    ...question,
                    isCorrect: question.input.trim() === question.correctAnswer
                };
            } else {
                return question;
            }
        });
        setQuestions(updatedQuestions);
    };

    const handleInputChange = (index, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].input = value;
        setQuestions(updatedQuestions);
    };

    const handleSelectedInput = (questionIndex, option) => {
        const updatedQuestions = [...questions];
        const question = updatedQuestions[questionIndex];
        const currentIndex = question.input.indexOf(option);

        if (currentIndex === -1) {
            question.input.push(option);
        } else {
            question.input.splice(currentIndex, 1);
        }
        setQuestions(updatedQuestions);
    };

    const arraysEqual = (arr1, arr2) => {
        if (arr1.length !== arr2.length) return false;
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) return false;
        }
        return true;
    };

    return (
        <div className="quiz-form-container">
            <form className="quiz-form" onSubmit={handleSubmitForm}>
                {questions.map((question, index) => (
                    <div key={question.id} className="question-container">
                        <p className="question">{question.question}</p>

                        {question.type === "text" && (
                            <div className="options">
                                <p>const cars = ["Mercedes", "Volvo", "Audi"]</p>
                                <label>
                                    <input
                                        type="text"
                                        value={question.input || ""}
                                        onChange={(e) =>
                                            handleInputChange(index, e.target.value)
                                        }
                                        placeholder="Write your answer here"
                                        className={
                                            isCompleted
                                                ? question.isCorrect
                                                    ? "correct"
                                                    : "wrong"
                                                : ""
                                        }
                                    />
                                </label>
                            </div>
                        )}

                        {question.type !== "text" && (
                            <div className="options">
                                {question.options.map((option, optIndex) => (
                                    <label
                                        key={optIndex}
                                        className={
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
                                        }
                                    >
                                        {question.type === "single" ? (
                                            <input
                                                type="radio"
                                                value={option}
                                                checked={question.input === option}
                                                onChange={() =>
                                                    handleInputChange(index, option)
                                                }
                                            />
                                        ) : question.type === "multiple" ? (
                                            <input
                                                type="checkbox"
                                                onChange={() =>
                                                    handleSelectedInput(index, option)
                                                }
                                                checked={question.input.includes(option)}
                                                disabled={isCompleted}
                                            />
                                        ) : null}
                                        {option}
                                    </label>
                                ))}
                            </div>
                        )}

                        {!question.isCorrect && isCompleted ? (
                            <div className="lesson-links">
                                You need to study{" "}
                                <a
                                    href={question.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {question.linkDescription}
                                </a>{" "}
                                more.
                            </div>
                        ) : null}
                    </div>
                ))}
                <button type="submit" className="submit-btn">
                    Check Your Answers
                </button>
            </form>
        </div>
    );
};
