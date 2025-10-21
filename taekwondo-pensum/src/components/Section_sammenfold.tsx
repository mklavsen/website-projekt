import { useState} from "react";
import type {ReactNode} from "react";

type SectionProps = {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
};

export const Section_sammenfold = ({ title, children, defaultOpen = true }: SectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <section className="mb-4 border rounded-lg p-3 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        <button
          className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "Skjul" : "Vis"}
        </button>
      </div>

      {isOpen && <div className="mt-2">{children}</div>}
    </section>
  );
};
