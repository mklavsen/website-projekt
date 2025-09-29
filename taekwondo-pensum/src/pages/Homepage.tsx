import BeltOverview from "../components/BeltOverview";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (

   <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] min-h-screen bg-grey-200">
      {/* Left column */}
      <div className="hidden md:block bg-gray-200"></div>

      {/* Center column */}
      <div className="bg-white flex flex-col items-center justify-center p-8 space-y-8">
        <h1 className="text-2xl font-bold text-center">
          TTU Pensum oversigt
        </h1>

        <div className="w-full">
        <BeltOverview />
        </div>

        <div>
          <Link to="/quiz">
            <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow">
              Poomsae Quiz
            </button>
          </Link>
        </div>
      </div>

      {/* Right column */}
      <div className="hidden md:block bg-gray-200"></div>
    </div>


  );
}



      {/* Centered container */}
  
{/*
      
        */}
      
