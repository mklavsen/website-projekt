import type { Poomsae } from "../types";

function clean(value: string | undefined): string | null {
  if (!value) return null;
  const normalized = value.trim();

  // skip if empty or only dashes (like -, --, ---)
  if (!normalized || /^-+$/.test(normalized)) return null;

  return normalized;
}

export async function fetchPoomsae(): Promise<Poomsae[]> {
  const response = await fetch(
    "https://opensheet.elk.sh/1dqfr76YA3uXOGH2BK1bflf9pcV4MkH5r6NOcv27oFB8/Poomsae"
  );
  const rows = await response.json();

  const grouped: Record<string, Poomsae> = {};

  for (const row of rows) {
    const key = clean(row.Poomsae);
    if (!key) continue;

    if (!grouped[key]) {
      grouped[key] = {
        Poomsae: row.Poomsae,
        BælteGrad: parseInt(row.BælteGrad),
        Tælling: [],
        Tælling_Koreansk: [],
        Koreansk_stand: [],
        Koreansk_teknik: [],
        Dansk_beskrivelse: [],
        Klassifikation: row.klassifikation,
        Video: row.Video || "",
        Hangul: [],
        Gwe: row.Gwe || "",
        Element: row.Element || "",
        Familiemedlem: row.Familiemedlem || "",
        Trigram: row.Trigram || ""
      };
    }

 const fields = [
      ["Tælling", row.Tælling],
      ["Tælling_Koreansk", row.Tælling_Koreansk],
      ["Koreansk_stand", row.Koreansk_stand],
      ["Koreansk_teknik", row.Koreansk_teknik],
      ["Dansk_beskrivelse", row.Dansk_beskrivelse],
      ["Hangul", row.Hangul],
    ] as const;

    for (const [field, value] of fields) {
      const cleaned = clean(value);
      if (cleaned) grouped[key][field]?.push(cleaned);
    }
  }

  return Object.values(grouped);
}