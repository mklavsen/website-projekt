// src/types.ts
export interface Technique {
  name: string;
  description: string;
  videoUrl?: string;
}

export interface BeltLevel {
  belt: string;
  color: string;
  techniques: Technique[];
}


export interface GrundTeknik {
  Teknik_Koreansk: string;
  Teknik_Dansk: string;
  Område: string;
  BælteGrad: number;
  Video?: string;
  Hangul?: string;

  }

export interface Poomsae {
  Poomsae:    string;
  BælteGrad:  number;
  Tælling:    string[];
  Tælling_Koreansk?: string[];
  Koreansk_stand?: string[];
  Koreansk_teknik?: string[];
  Dansk_beskrivelse?: string[];
  Klassifikation?: string;
  Video?: string;
  Hangul?: string[];
  Gwe?: string;
  Element?: string;
  Familiemedlem?: string;
  Trigram?: string;
}


export interface Aftaltkamp {
Kategori: string;
  Numre: {
    Nummer: number;
    BælteGrad: number;
    Tælling: string[];
    Angreb_Koreansk: string[];
    Angreb_Dansk: string[];
    Forsvar_Koreansk: string[];
    Forsvar_Dansk: string[];
  }[];

}


export interface Pensum {
  Emne: string[];
  BælteGrad: number;
  Hangul?: string[];
  Junior_kup?: string[];
  Hel_kup?: string[];
  Fysisktest?: string[]; 
}