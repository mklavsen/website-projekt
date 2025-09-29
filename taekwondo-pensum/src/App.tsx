import { Routes, Route } from "react-router-dom";
import BeltOverview from "./components/BeltOverview"; // Your new main page
import BeltPage from "./pages/BeltPage"; // Subpage per belt
import HomePage from "./pages/Homepage";
import QuizPage from "./pages/Quizside";

function App() {
  return (
    <Routes>
      {/* Main Page */}
      <Route path="/" element={<HomePage />} />
      
      {/* Belt Overview Page */}
      <Route path="/belts" element={<BeltOverview />} />

      {/* Belt pages */}
      <Route path="/belt/:beltId" element={<BeltPage />} />

      {/* Quiz Page */}
      <Route path="/quiz" element={<QuizPage />} />
    </Routes>
  );
}

export default App;
