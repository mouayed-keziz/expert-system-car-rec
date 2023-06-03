import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import FormPage from "./pages/Form";
import ErrorPage from "./pages/ErrorPage";
import ResultPage from "./pages/ResultPage"
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<FormPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
