// 📄 PoomsaeList.tsx
import { useEffect, useState } from "react";
import type { Poomsae } from "../types";
import { fetchPoomsae } from "../data/Poomsae"; // <-- Your fetcher
import "../styles/PoomsaeTable.css";
import { poomsaeVideos } from "../data/poomsaeVideos";
import { VideoPlayer } from "./videoPlayer";

type PoomsaeListProps = {
  belt?: string | null;
};

export const PoomsaeList = ({ belt }: PoomsaeListProps) => {
  const [poomsaeList, setPoomsaeList] = useState<Poomsae[]>([]);

  useEffect(() => {
    fetchPoomsae().then(setPoomsaeList);
  }, []);

  const filteredList = belt
    ? poomsaeList.filter((poomsae) => poomsae.BælteGrad.toString() === belt)
    : poomsaeList;

 return (
    <div className="space-y-8">
      {!belt && <h2 className="text-2x1 font-bold">Alle Poomsae</h2>}
      {belt && <h2 className="text-2x1 font-bold">{belt}. kup – Poomsae</h2>}

      {filteredList.map((poomsae, i) => {
        const videoSrc = poomsaeVideos[poomsae.Poomsae];

        return (
        <div key={i} className="overflow-x-auto" >
        <table 
          className="min-w-full border border-gray-300 text-sm md:text-base"
          >
          
          <thead className="bg-gray-100">
            <tr>
              <th
               colSpan={4}
               className="min-w-full border border-gray-300 text-sm md:text-base"
               >
                {poomsae.Poomsae}</th>
            </tr> 
            <tr>
              <th className="w-1/8 p-2 border border-gray-300">
                Tælling
              </th>
              <th className="w-2/8 p-2 border border-gray-300">
                Koreansk stand
              </th>
              <th className="w-2/8 p-2 border border-gray-300">
                Koreansk teknik
              </th>
              <th className="w-3/8 p-2 border border-gray-300">
                Dansk beskrivelse
              </th>
            </tr>
          </thead>
          <tbody>
               {poomsae.Tælling.map((_, i) => (
                <tr key={i} className="even:bg-gray-50">
                  <td className="p-2 border border-gray-200">
                    {poomsae.Tælling[i]}
                  </td>
                  <td className="p-2 border border-gray-200">
                    {poomsae.Koreansk_stand?.[i] ?? ""}
                  </td>
                  <td className="p-2 border border-gray-200">
                    {poomsae.Koreansk_teknik?.[i] ?? ""}
                  </td>
                  <td className="p-2 border border-gray-200">
                    {poomsae.Dansk_beskrivelse?.[i] ?? ""}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

         {videoSrc && (
              <div className="border p-4 rounded-2xl bg-gray-50 shadow">
                <h3 className="font-semibold mb-2">Video: {poomsae.Poomsae}</h3>
                <VideoPlayer src={videoSrc} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};