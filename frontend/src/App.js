import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewLandingPage from "./pages/NewLandingPage";
import FormPage from "./pages/FormPage";
import ResultsPagePhase1 from "./pages/ResultsPagePhase1";
import { Toaster } from "sonner";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NewLandingPage />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="/results" element={<ResultsPagePhase1 />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;
