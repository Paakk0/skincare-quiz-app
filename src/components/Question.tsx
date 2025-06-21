import { useNavigate } from "react-router-dom";
import { useAnswers } from "../AnswersContext";

interface Props {
  question: string;
  options: string[];
  questionType?: "single" | "multiple";
  questionNumber: number;
}

function Question({
  question,
  options,
  questionType = "single",
  questionNumber,
}: Props) {
  const totalQuestions = 5;
  const { answers, setAnswer } = useAnswers();
  const navigate = useNavigate();
  const isAnswered = Boolean(answers[questionNumber]);

  const handleRedirect = (page: string) => {
    if (isAnswered) {
      navigate(page);
    }
  };

  const getLinks = () => {
    switch (questionNumber) {
      case 1:
        return (
          <>
            <button className="btn btn-back" onClick={() => navigate("/")}>
              Back
            </button>
            <button
              className="btn btn-next"
              onClick={() => handleRedirect("/question2")}
            >
              Next question →
            </button>
          </>
        );
      case 2:
      case 3:
      case 4:
        return (
          <>
            <button
              className="btn btn-back"
              onClick={() => navigate("/question" + (questionNumber - 1))}
            >
              Back
            </button>
            <button
              className="btn btn-next"
              onClick={() => handleRedirect(`/question${questionNumber + 1}`)}
            >
              Next question →
            </button>
          </>
        );
      case 5:
        return (
          <>
            <button className="btn btn-back" onClick={() => navigate("/")}>
              Back
            </button>
            <button
              className="btn btn-next"
              onClick={() => handleRedirect("/results")}
            >
              View results
            </button>
          </>
        );
      default:
        return <></>;
    }
  };

  const selectedOptions: string[] =
    questionType === "single"
      ? answers[questionNumber]
        ? [answers[questionNumber] as string]
        : []
      : Array.isArray(answers[questionNumber])
      ? (answers[questionNumber] as string[])
      : [];

  const handleAnswer = (answer: string) => {
    if (questionType === "single") {
      setAnswer(questionNumber, answer);
    } else {
      const currentAnswers = selectedOptions;

      const updated = currentAnswers.includes(answer)
        ? currentAnswers.filter((a) => a !== answer)
        : [...currentAnswers, answer];

      setAnswer(questionNumber, updated);
    }
  };

  const circumference = 2 * Math.PI * 45;

  return (
    <div className="question-container">
      <p className="title">{question}</p>
      {questionType === "multiple" && (
        <p className="additional">(multiple choice)</p>
      )}
      <div className="progress-wrapper">
        <div className="progress-circle">
          <svg width="100" height="100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#e0e0e0"
              strokeWidth="5"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#70d4ff"
              strokeWidth="5"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={
                circumference * (1 - questionNumber / totalQuestions)
              }
              transform="rotate(-90 50 50)"
            />
          </svg>
          <span className="progress-text">
            {questionNumber}/{totalQuestions}
          </span>
        </div>
      </div>

      <div className="options">
        {options.map((answer, index) => {
          const letter = String.fromCharCode(97 + index);
          const isSelected = selectedOptions.includes(answer);
          return (
            <button
              key={index}
              onClick={() => handleAnswer(answer)}
              className={isSelected ? "option-selected" : ""}
            >
              {letter}. {answer}
            </button>
          );
        })}
      </div>
      <div className="navigation">{getLinks()}</div>
    </div>
  );
}

export default Question;
