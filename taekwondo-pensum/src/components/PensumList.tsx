import { useEffect, useState } from "react";
import type { Pensum } from "../types";
import { fetchPensum } from "../data/Pensum";

type PensumListProps = {
  belt?: string | null;
};

export const PensumList = ({ belt }: PensumListProps) => {
  const [pensumList, setPensumList] = useState<Pensum[]>([]);

  useEffect(() => {
    fetchPensum().then(setPensumList);
  }, []);

 // console.log("PensumList", { belt, pensumList });
  const filteredList = belt
    ? pensumList.filter((p) => p.BælteGrad.toString() === belt)
    : pensumList;

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-center">
        {belt ? `${belt}. kup – Pensum` : "Alle Pensum"}
      </h2>

      {filteredList.map((pensum, idx) => (
        <div className="overflow-x-auto" key={idx}>
          <table className="min-w-full border border-gray-300 text-sm md:text-base">
            <thead className="bg-gray-100">
              <tr>
                <th className="w-1/4 p-2 border border-gray-300">Emne</th>
                <th className="w-1/4 p-2 border border-gray-300">Hangul</th>
                <th className="w-1/4 p-2 border border-gray-300">Junior kup</th>
                <th className="w-1/4 p-2 border border-gray-300">Hel kup</th>
              </tr>
            </thead>
            <tbody>
              {pensum.Emne.map((emne, i) => (
                <tr key={i} className="even:bg-gray-50">
                  <td className="p-2 border border-gray-200">{emne}</td>
                  <td className="p-2 border border-gray-200">
                    {pensum.Hangul?.[i] || ""}
                  </td>
                  <td className="p-2 border border-gray-200">
                    {pensum.Junior_kup?.[i] || ""}
                  </td>
                  <td className="p-2 border border-gray-200">
                    {pensum.Hel_kup?.[i] || ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};
