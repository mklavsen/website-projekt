import { Link } from "react-router-dom";
import { PoomsaeQuiz } from "../components/PoomsaeQuiz";

const QuizPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] min-h-screen bg-grey-200">
      {/* Left column */}
      <div className="hidden md:block bg-gray-200"></div>

      {/* Center column */}
      <div className="bg-white flex flex-col items-center justify-start p-8 space-y-8">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">
            Poomsae Quiz
            </h1>
          <PoomsaeQuiz />
        </div>

        <Link to="/">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow">
            Return to Main Page
          </button>
        </Link>
      </div>
      {/* Right column */}
      <div className="hidden md:block bg-gray-200"></div>
    
    </div>

    
  );
};

export default QuizPage;