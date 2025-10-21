// 📄 PensumList.tsx
import { fetchGrundTeknik } from "../data/GrundTeknik";
import { useEffect, useState } from "react";
import type { GrundTeknik } from "../types";

type GrundTeknikListProps = {
  belt?: string | null; // optional: if undefined, show all
};

export const GrundTeknikList = ({ belt }: GrundTeknikListProps) => {
  const [grundteknikker, setGrundteknikker] = useState<GrundTeknik[]>([]);

  useEffect(() => {
    fetchGrundTeknik().then(setGrundteknikker);
  }, []);

  // Group by belt
  const groupedBelts = grundteknikker.reduce<Record<string, GrundTeknik[]>>((acc, technique) => {
    const grade = technique.BælteGrad;
    if (!acc[grade]) acc[grade] = [];
    acc[grade].push(technique);
    return acc;
  }, {});

  // Group by kategori/område
  const groupByOmråde = (list: GrundTeknik[]) => {
    return list.reduce<Record<string, GrundTeknik[]>>((acc, technique) => {
      const area = technique.Område || "Ukendt område";
      if (!acc[area]) acc[area] = [];
      acc[area].push(technique);
      return acc;
    }, {});
  };

  //const beltGrades = Object.keys(groupedBelts).sort((a, b) => parseInt(a) - parseInt(b));
  const filteredTechniques = belt ? groupedBelts[belt] || [] : grundteknikker;
  const groupedByOmråde = groupByOmråde(filteredTechniques);

  return (
    <div className="space-y-8">

      {Object.entries(groupedByOmråde).map(([område, teknikListe]) => (
        <div key={område} className="overflow-x-auto">
          {/* Displaying the area title */}  
          <h2 className="text-lg font-bold mb-2">{område}</h2>

          {/* Displaying the techniques in a table */}
          <table className="w-full border border-gray-300 text-xs sm:text-sm md:text-base">
            <thead className="bg-gray-100">
              <tr>
                <th className="w-1/3 p-2 border">Koreansk</th>
                <th className="w-2/3 p-2 border">Dansk</th>
              </tr>
            </thead>
            <tbody>
              {teknikListe.map((g, index) => (
                <tr key={index} className="odd:bg-white even:bg-gray-50">
                  <td className="p-2 border">{g.Teknik_Koreansk}</td>
                  <td className="p-2 border">{g.Teknik_Dansk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};
