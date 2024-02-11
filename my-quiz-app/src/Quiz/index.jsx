import { useState } from "react";
import { Data } from "./Data";
import "./styles.css";

export const QuizApp = () => {

    const [questionInput1, setQuestionInput1] = useState();
    const [questionInput2, setQuestionInput2] = useState();
    const [questionInput3, setQuestionInput3] = useState("");
    const [questionInput4, setQuestionInput4] = useState([]);

    const [isCorrect1, setIsCorrect1] = useState(false);
    const [isCorrect2, setIsCorrect2] = useState(false);
    const [isCorrect3, setIsCorrect3] = useState(false);
    const [isCorrect4, setIsCorrect4] = useState(false);

    const [start, setStart] = useState(false);

    const handleSubmitForm = (e) => {
        e.preventDefault();
        setStart(true);
        setIsCorrect1(questionInput1 === Data[0].correctAnswer);
        setIsCorrect2(questionInput2 === Data[1].correctAnswer);
        setIsCorrect3(questionInput3 === Data[2].correctAnswer);
        setIsCorrect4(questionInput4.length === Data[3].correctAnswer.length);
    }

    const handleSelectedInput1 = (option) => {
        setQuestionInput1(option);
    };
    const handleSelectedInput2 = (option) => {
        setQuestionInput2(option);
    };

    const handleSelectedInput4 = (option) => {
        setQuestionInput4([...questionInput4, option])
    }

    return (
        <div className="quiz-form-container">
            <form className="quiz-form" onSubmit={handleSubmitForm}>
                <div className="question-container">
                    <p className="question">{Data[0].question}</p>

                    <div className="options">
                        {Data[0].options.map(
                            (option1, index) =>
                            (<label
                                key={index}
                                className={questionInput1 === option1 && start
                                    ? isCorrect1
                                        ? "correct"
                                        : "wrong"
                                    : option1 === Data[0].correctAnswer && start && !isCorrect1
                                        ? "correct"
                                        : ""}>
                                <input
                                    type="radio"
                                    value={option1}
                                    checked={questionInput1 === option1}
                                    onChange={() => handleSelectedInput1(option1)}
                                />{option1}
                            </label>)
                        )}
                    </div>
                </div>
                {!isCorrect1 && start ? <div className="lesson-links">You need to study <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures" target="_blank">JavaScript data types</a> more.</div> : null}

                <div className="question-container">
                    <p className="question">{Data[1].question}</p>

                    <div className="options">
                        {Data[1].options.map(
                            (option2, index) =>
                            (<label
                                key={index}
                                className={questionInput2 === option2 && start
                                    ? isCorrect2
                                        ? "correct"
                                        : "wrong"
                                    : option2 === Data[1].correctAnswer && start && !isCorrect2
                                        ? "correct"
                                        : ""}>
                                <input
                                    type="radio"
                                    value={option2}
                                    checked={questionInput2 === option2}
                                    onChange={() => handleSelectedInput2(option2)}
                                />{option2}
                            </label>)
                        )}
                    </div>
                </div>
                {!isCorrect2 && start ? <div className="lesson-links">You need to study <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element" target="_blank">HTML elements reference</a> more.</div> : null}

                <div className="question-container">
                    <p className="question">{Data[2].question}</p>

                    <div className="options">
                        {<>
                            <p>const cars = ["Mercedes", "Volvo", Audi]</p>
                            <label>
                                let X =
                                <input
                                    type="text"
                                    className={start ? (isCorrect3 ? "correct" : "wrong") : ""}
                                    onChange={(e) => setQuestionInput3(e.target.value)}
                                />
                            </label>
                            {!isCorrect3 && start ? <span className="correct">Correct Answer is :cars[1]</span> : null}
                        </>}
                    </div>
                </div>
                {!isCorrect3 && start ? <div className="lesson-links">You need to study <a href="https://www.w3schools.com/js/js_arrays.asp" target="_blank">JavaScript Arrays</a> more.</div> : null}

                <div className="question-container">
                    <p className="question">{Data[3].question}</p>

                    <div className="checkbox-options">
                        <div className="options">
                            {Data[3].options.map((option4, index) => (
                                <label
                                    key={index}
                                    className={start ? (isCorrect4 ? "correct" : "wrong") : ""}
                                >
                                    <input
                                        type="checkbox"
                                        onChange={() => handleSelectedInput4(option4)}
                                        checked={questionInput4.includes(option4)}
                                    />
                                    {option4}
                                </label>
                            ))}
                        </div>
                        <div className="options">
                            {!isCorrect4 && start ?
                                <p className="checkbox-correct-options">Correct Answers
                                    {Data[3].options.map((option4, index) => (

                                        <label
                                            key={index}
                                            className="correct"
                                        >
                                            {option4}
                                        </label>

                                    ))}
                                </p>
                                : null}
                        </div>
                    </div>
                </div>
                {!isCorrect4 && start ? <div className="lesson-links">You need to study <a href="https://www.w3schools.com/cssref/pr_class_position.php" target="_blank">CSS position Property</a> more.</div> : null}

                <button type="submit" className="submit-btn">Check Your Answer</button>
            </form>
        </div>
    )
}


