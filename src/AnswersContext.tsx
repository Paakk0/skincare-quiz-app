import { createContext, useContext, useState, ReactNode } from "react";

type Answers = { [questionNumber: number]: string | string[] };

type AnswersContextType = {
  answers: Answers;
  setAnswer: (questionNumber: number, answer: string | string[]) => void;
  resetAnswers: () => void;
};

const AnswersContext = createContext<AnswersContextType | undefined>(undefined);

export const AnswersProvider = ({ children }: { children: ReactNode }) => {
  const [answers, setAnswers] = useState<Answers>({});

  const setAnswer = (questionNumber: number, answer: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [questionNumber]: answer }));
  };

  const resetAnswers = () => {
    setAnswers({});
  };

  return (
    <AnswersContext.Provider value={{ answers, setAnswer, resetAnswers }}>
      {children}
    </AnswersContext.Provider>
  );
};

export const useAnswers = () => {
  const context = useContext(AnswersContext);
  if (!context)
    throw new Error("useAnswers must be used within AnswersProvider");
  return context;
};
