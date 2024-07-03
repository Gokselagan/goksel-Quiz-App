import React, { useState } from "react";
import { Data } from "./Data";
import "./styles.css";
import { Box, Button, Checkbox, FormControlLabel, Link, Radio, RadioGroup, TextField, Typography } from "@mui/material";

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

    function getClassName(question, option, isCompleted) {
        if (!isCompleted) {
            return "";
        }

        const isUserAnswerCorrect = question.isCorrect;
        const didUserSelectOption = question.input === option || (question.type === "multiple" && question.input.includes(option));
        const isOptionCorrectAnswer = option === question.correctAnswer;

        if (didUserSelectOption) {
            return isUserAnswerCorrect ? "correct" : "wrong";
        } else if (isOptionCorrectAnswer && isUserAnswerCorrect) {
            return "correct";
        }
        return "";
    }

    return (
        <Box component="form" onSubmit={handleSubmitForm}
            sx={{ p: 2 }}
        >
            {questions.map((question, index) => (
                <Box key={question.id} mb={2}>
                    <Typography sx={{ fontWeight: "600" }}>{question.question}</Typography>

                    {question.type === "text" && (
                        <Box>
                            <TextField
                                value={question.input || ""}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                                placeholder="Write your answer here"
                                InputProps={{
                                    style: {
                                        color: isCompleted ? question.isCorrect ? "#008000" : "#f00" : "", height: "40px"
                                    }
                                }}
                            />
                        </Box>
                    )}

                    {question.type !== "text" && (
                        <Box sx={{ display: "flex", flexDirection: "row", gap: "9px" }}>
                            {question.type === "single" ? (
                                <RadioGroup
                                    value={question.input}
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                    sx={{ display: "flex", flexDirection: "row" }}
                                >
                                    {question.options.map((option, optIndex) => (
                                        <FormControlLabel
                                            key={optIndex}
                                            value={option}
                                            control={<Radio />}
                                            label={option}
                                            className={getClassName(question, option, isCompleted)}
                                        />
                                    ))}
                                </RadioGroup>
                            ) : question.type === "multiple" ? (
                                question.options.map((option, optIndex) => (
                                    <FormControlLabel
                                        key={optIndex}
                                        control={
                                            <Checkbox
                                                checked={question.input.includes(option)}
                                                onChange={() => handleSelectedInput(index, option)}
                                                disabled={isCompleted}
                                            />
                                        }
                                        label={option}
                                    />
                                ))
                            ) : null}

                        </Box>
                    )}

                    {!question.isCorrect && isCompleted && (
                        <Box className="lesson-links">
                            You need to study{" "}
                            <Link
                                href={question.link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {question.linkDescription}
                            </Link>{" "}
                            more.
                        </Box>
                    )}
                </Box>
            ))}

            <Box sx={{ display: "flex", justifyContent: "center", mt:2 }}>
                <Button type="submit" variant="contained" color="primary"
                >
                    Check Your Answers
                </Button>
            </Box>

        </Box>
    );
};
