import type { Pensum } from "../types";

export async function fetchPensum(): Promise<Pensum[]> {
    const response = await fetch(
        "https://opensheet.elk.sh/1dqfr76YA3uXOGH2BK1bflf9pcV4MkH5r6NOcv27oFB8/Pensum"
);
const rows = await response.json();

const grouped: Record<string, Pensum> = {};

for (const row of rows) {
    const key = row.Bæltegrad;

    // Initialize the Pensum object if it doesn't exist

if (!grouped[key]){
    grouped[key] = {
        Emne: [],
        BælteGrad: parseInt(row.Bæltegrad),
        Hangul: [],
        Junior_kup: [],
        Hel_kup: [],
        Fysisktest: []
    };
}

grouped[key].Emne.push(row.Emne);
grouped[key].Hangul?.push(row.Hangul || ""); 
grouped[key].Junior_kup?.push(row.Junior_kup || "");
grouped[key].Hel_kup?.push(row.Hel_kup || "");
grouped[key].Fysisktest?.push(row.Fysisktest || "");

}
return Object.values(grouped);
}