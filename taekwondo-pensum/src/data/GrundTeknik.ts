import { GrundTeknik } from "../types";

export async function fetchGrundTeknik(): Promise<GrundTeknik[]> {
  const response = await fetch("https://opensheet.elk.sh/1dqfr76YA3uXOGH2BK1bflf9pcV4MkH5r6NOcv27oFB8/Grundteknik");
  const data = await response.json();
  return data;
}
