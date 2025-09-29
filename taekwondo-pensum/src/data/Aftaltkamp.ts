
import { Aftaltkamp } from "../types";

export async function fetchAftaltkamp(): Promise<Aftaltkamp[]> {
  const response = await fetch("https://opensheet.elk.sh/1dqfr76YA3uXOGH2BK1bflf9pcV4MkH5r6NOcv27oFB8/Aftaltkamp");
  const rows = await response.json();

   const kategoriMap: Record<string, Record<number, Aftaltkamp["Numre"][0]>> =
    {};


for (const row of rows) {
    const kategori = row.Kategori;
    const nummer = parseInt(row.Nummer, 10);

    if (!kategoriMap[kategori]) {
      kategoriMap[kategori] = {};
    }
    if (!kategoriMap[kategori][nummer]) {
      kategoriMap[kategori][nummer] = {
        Nummer: nummer,
        BælteGrad:parseInt(row.BælteGrad, 10),
        Tælling: [],
        Angreb_Koreansk: [],
        Angreb_Dansk: [],
        Forsvar_Koreansk: [],
        Forsvar_Dansk: [],
      };
    }

    kategoriMap[kategori][nummer].Tælling.push(row.Tælling || "");
    kategoriMap[kategori][nummer].Angreb_Koreansk.push(row.Angreb_Koreansk || "");
    kategoriMap[kategori][nummer].Angreb_Dansk.push(row.Angreb_Dansk || "");
    kategoriMap[kategori][nummer].Forsvar_Koreansk.push(row.Forsvar_Koreansk || "");
    kategoriMap[kategori][nummer].Forsvar_Dansk.push(row.Forsvar_Dansk || "");
  }

    return Object.entries(kategoriMap).map(([kategori, numreMap]) => ({
    Kategori: kategori,
    Numre: Object.values(numreMap).sort((a, b) => a.Nummer - b.Nummer),
  }));
}
