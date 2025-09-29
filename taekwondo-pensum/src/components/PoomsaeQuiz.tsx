import { useEffect, useState } from "react";
import { fetchPoomsae } from "../data/Poomsae";
import { Poomsae } from "../types";

interface Question {
  questionText: string;
  options: string[];
  correct: string;
}

export const PoomsaeQuiz = () => {
  const [poomsaeList, setPoomsaeList] = useState<Poomsae[]>([]);
  const [activePoomsaes, setActivePoomsaes] = useState<string[]>([]);
  const [question, setQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");

  useEffect(() => {
    fetchPoomsae().then(setPoomsaeList);
  }, []);

  const generateQuestion = () => {
    const pool =
      activePoomsaes.length > 0
        ? poomsaeList.filter((p) => activePoomsaes.includes(p.Poomsae))
        : poomsaeList;

    if (pool.length === 0) return;

    // Pick random poomsae and tælling index
    const poomsae = pool[Math.floor(Math.random() * pool.length)];
    if (!poomsae || !poomsae.Tælling || poomsae.Tælling.length === 0) return;

    const idx = Math.floor(Math.random() * poomsae.Tælling.length);

    const stand = poomsae.Koreansk_stand?.[idx]?.trim() || "";
    const teknik = poomsae.Koreansk_teknik?.[idx]?.trim() || "";
    const correct = `STAND: ${stand} – TEKNIK: ${teknik}`.trim();

    // Skip if no meaningful answer
    if (!correct || correct === "–") {
      generateQuestion();
      return;
    }

    const questionText = `Hvad skal du gøre på tælling ${poomsae.Tælling[idx]} i poomsae ${poomsae.Poomsae}?`;

    // Collect all valid (stand + teknik) combinations
    const allCombos: string[] = [];
    for (const p of poomsaeList) {
      if (!p.Tælling || !p.Koreansk_stand || !p.Koreansk_teknik) continue;
      for (let i = 0; i < p.Tælling.length; i++) {
        const s = p.Koreansk_stand?.[i]?.trim() || "";
        const t = p.Koreansk_teknik?.[i]?.trim() || "";
        const combo = `STAND: ${s} – TEKNIK: ${t}`.trim();
        if (combo && combo !== "–" && combo !== correct) {
          allCombos.push(combo);
        }
      }
    }

    // Pick 2 unique wrong answers
    const wrongAnswers = Array.from(new Set(allCombos))
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);

    const options = [correct, ...wrongAnswers].sort(() => Math.random() - 0.5);

    setQuestion({ questionText, options, correct });
    setSelectedAnswer("");
  };

  const handleAnswer = (selected: string) => {
    if (!question) return;
    setSelectedAnswer(selected);
  };

const getButtonClass = (opt: string) => {
  if (!selectedAnswer) {
    return "block w-full border p-2 my-1 rounded hover:bg-gray-100";
  }

  if (opt === question?.correct) {
    return "block w-full border p-2 my-1 rounded bg-green-500 text-white font-semibold";
  }

  if (opt === selectedAnswer && opt !== question?.correct) {
    return "block w-full border p-2 my-1 rounded bg-red-500 text-white font-semibold";
  }

  return "block w-full border p-2 my-1 rounded opacity-50";
};

// vælg alle knap
const toggleAll = () => {
  if (activePoomsaes.length === poomsaeList.length) {
    // All are active, so turn them off
    setActivePoomsaes([]);
  } else {
    // Not all are active, so turn all on
    setActivePoomsaes(poomsaeList.map((p) => p.Poomsae));
  }
};

  return (
    <div className="quiz p-4">
      <div className="mb-4">
        <button 
          onClick={toggleAll}
          className="bg-purple-500 text-white px-3 py-2 rounded shadow"
          >
          {activePoomsaes.length === poomsaeList.length ? "Fravælg alle" : "Vælg alle"}

        </button>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {poomsaeList.map((p) => {
          const isActive = activePoomsaes.includes(p.Poomsae);
          return (
            <button
              key={p.Poomsae}
              onClick={() =>
                setActivePoomsaes((prev) =>
                  isActive
                    ? prev.filter((name) => name !== p.Poomsae) // remove
                    : [...prev, p.Poomsae] // add
                )
              }
              className={`px-3 py-1 rounded border ${
                isActive
                  ? "bg-green-500 text-white border-green-600"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {p.Poomsae}
            </button>
          );
        })}
      </div>

      <button
        onClick={generateQuestion}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Nyt spørgsmål
      </button>

      {question && (
        <div>
          <p className="font-bold mb-2">{question.questionText}</p>
          {question.options.map((opt) => (
            <button
              key={opt}
              onClick={() => !selectedAnswer && handleAnswer(opt)}
              className={getButtonClass(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
