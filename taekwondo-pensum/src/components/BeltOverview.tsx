import { Link } from "react-router-dom";
import { useState } from "react";
import { getBeltButtonStyle } from "../styles/BeltStyle";

const belts = [
  { id: "8", name: "8. Kup" },
  { id: "7", name: "7. Kup" },
  { id: "6", name: "6. Kup" },
  { id: "5", name: "5. Kup" },
  { id: "4", name: "4. Kup" },
  { id: "3", name: "3. Kup" },
  { id: "2", name: "2. Kup" },
  { id: "1", name: "1. Kup" },
];

const BeltOverview = () => {
  const [selectedBelt, setSelectedBelt] = useState<string | null>(null);

  return (
    <div className="max-w-3xl mx-auto px-4">
      <h1 className="text-2xl font-bold text-center mb-8">
        Vælg Bæltegrad
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {belts.map((belt) => (
          <Link key={belt.id} to={`/belt/${belt.id}`}>
            <button
              style={getBeltButtonStyle(belt.id, selectedBelt)}
              onMouseEnter={() => setSelectedBelt(belt.id)}
              onMouseLeave={() => setSelectedBelt(null)}
              className="w-full py-3 rounded-xl border border-gray-300 shadow-sm hover:shadow-md transition-all duration-200 text-lg font-medium focus:outline-none"
            >
              {belt.name}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BeltOverview;
