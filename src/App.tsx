import { Routes, Route } from "react-router-dom";
import Question from "./components/Question";
import Result from "./components/Result";
import { useNavigate } from "react-router-dom";
import { useAnswers } from "./AnswersContext";
import "./styles/App.css";
import "./styles/Question.css";
import "./styles/Result.css";

function App() {
  const questions = [
    {
      number: 1,
      question: "What is your hair type or texture?",
      options: ["Straight", "Curly", "Wavy", "Fine"],
      questionType: "single" as const,
    },
    {
      number: 2,
      question: "How often do you wash your hair?",
      options: [
        "Daily",
        "Every other day",
        "Twice a week",
        "Once a week",
        "Every two weeks",
      ],
      questionType: "single" as const,
    },
    {
      number: 3,
      question: "What benefits do you look for in your hair products?",
      options: [
        "Anti-breakage",
        "Hydration",
        "Soothing dry scalp",
        "Repairs appearance of damaged hair",
        "Volume",
        "Curl and coil enhancing",
      ],
      questionType: "multiple" as const,
    },
    {
      number: 4,
      question: "Is there anything troubling you about your hair?",
      options: ["Breakage", "Frizz", "Scalp dryness", "Damage", "Tangling"],
      questionType: "multiple" as const,
    },
    {
      number: 5,
      question: "What is your natural hair color(s) today?",
      options: ["Black", "Brown", "Blonde", "Red/Orange", "Silver/Gray"],
      questionType: "single" as const,
    },
  ];

  const navigate = useNavigate();
  const { resetAnswers } = useAnswers();

  const handleStart = () => {
    resetAnswers();
    navigate("/question1");
  };

  return (
    <div className="App">
      <Routes>
        {/* MAIN PAGE */}
        <Route
          path="/"
          element={
            <div className="main-container">
              <div className="container">
                <h1>Build a self care routine suitable for you</h1>
                <p>
                  Take our test to get a personalised self care routine based on
                  your needs.
                </p>
                <button className="btn btn-next" onClick={handleStart}>
                  Start the quiz
                </button>
              </div>
            </div>
          }
        />
        {/* QUESTIONS */}
        {questions.map((q, i) => (
          <Route
            key={q.number}
            path={`/question${q.number}`}
            element={
              <Question
                question={q.question}
                options={q.options}
                questionType={q.questionType}
                questionNumber={q.number}
              />
            }
          />
        ))}
        {/* RESULTS PAGE */}
        <Route path="/results" element={<Result />} />
      </Routes>
    </div>
  );
}

export default App;
