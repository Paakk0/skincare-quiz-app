import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AnswersProvider } from "./AnswersContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <AnswersProvider>
      <App />
    </AnswersProvider>
  </BrowserRouter>
);
