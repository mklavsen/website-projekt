import  {fetchAftaltkamp} from "../data/Aftaltkamp";
import { useEffect, useState } from "react";
import { Aftaltkamp } from "../types";
import { VideoPlayer } from "./videoPlayer";
import { aftaltkampVideoer } from "../data/aftaltkampVideoer";
import {Section_sammenfold} from "./Section_sammenfold"

type AftaltkampListProps = {
  belt?: string | null; // optional: if undefined, show all
};


export const AftaltkampList = ({ belt }: AftaltkampListProps) => {
    const [aftaltkamp, setAftaltkampe] = useState<Aftaltkamp[]>([]);

    useEffect(() => {
        fetchAftaltkamp().then(setAftaltkampe);
    }, []);

const filteredGroups = belt
    ? aftaltkamp.map(group => ({
        ...group,
        Numre: group.Numre.filter(
          numre => numre.BælteGrad?.toString() >= belt
        ),
      })).filter(group => group.Numre.length > 0) // Remove empty groups
    : aftaltkamp;

return (
    <div className="space-y-8">
      {filteredGroups.map((group) => (
        <Section_sammenfold key = {group.Kategori} title = {group.Kategori} defaultOpen={false}>
          <h2 className="text-xl font-bold mb-4">{group.Kategori}</h2>

          {group.Numre.map((n) => {
            const videoSrc = aftaltkampVideoer[group.Kategori]?.[n.Nummer];

            return (
              <div key={n.Nummer} className="mb-6">
                <h3 className="text-lg font-semibold mb-2">
                  Nummer {n.Nummer}
                </h3>
                <table className="w-full border border-gray-300 text-xs sm:text-sm md:text-base mb-2">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-2 border">Tælling</th>
                      <th className="p-2 border">Angriber Koreansk</th>
                      <th className="p-2 border">Angriber Dansk</th>
                      <th className="p-2 border">Forsvarer Koreansk</th>
                      <th className="p-2 border">Forsvarer Dansk</th>
                    </tr>
                  </thead>
                  <tbody>
                    {n.Tælling.map((tælling, i) => (
                      <tr
                        key={i}
                        className="odd:bg-white even:bg-gray-50"
                      >
                        <td className="p-2 border">{tælling}</td>
                        <td className="p-2 border">
                          {n.Angreb_Koreansk[i] || ""}
                        </td>
                        <td className="p-2 border">
                          {n.Angreb_Dansk[i] || ""}
                        </td>
                        <td className="p-2 border">
                          {n.Forsvar_Koreansk[i] || ""}
                        </td>
                        <td className="p-2 border">
                          {n.Forsvar_Dansk[i] || ""}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {videoSrc && (
                  <div className="mt-2">
                    <VideoPlayer src={videoSrc} />
                  </div>
                )}
              </div>
            );
          })}
        </Section_sammenfold>
      ))}
    </div>
  );
};