// 📄 src/pages/BeltPage.tsx

import { useParams, Link } from "react-router-dom";
import { GrundTeknikList } from "../components/GrundTeknikList";
import { PoomsaeList } from "../components/PoomsaeList";
import { PensumList } from "../components/PensumList";
import { AftaltkampList } from "../components/AftaltkampList";
import { Section_sammenfold } from "../components/Section_sammenfold"; // Adjust import if necessary

const BeltPage = () => {
  const { beltId } = useParams<{ beltId: string }>();

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] min-h-screen bg-grey-200">
      
      {/* Left column */}
      <div className="hidden md:block bg-gray-200"></div>
      
      <div>
        <h1>{beltId}. kup</h1>

        {/* ✅ Render Pensum */}
        <section>
          <PensumList belt={beltId} />
        </section>



        {/* ✅ Render Grundteknik (Pensum) */}

        <Section_sammenfold title="Grundteknik" defaultOpen={false}>
          <GrundTeknikList belt={beltId} />
        </Section_sammenfold>
      
        {/* ✅ Render Poomsae */}
        <Section_sammenfold title="Poomsae" defaultOpen={false}>
          <PoomsaeList belt={beltId} />
        </Section_sammenfold>

        {/* ✅ Render Poomsae */}
        <Section_sammenfold title="Aftaltkamp" defaultOpen={false}>
          <AftaltkampList belt={beltId} />
        </Section_sammenfold>

        {/* ✅ Return button at the bottom */}
        <div className="mt-8 flex justify-center">
          <Link to="/">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow">
              Return to Main Page
            </button>
          </Link>
        </div>

      </div>
      {/* Right column */}
      <div className="hidden md:block bg-gray-200"></div>
    </div>

  );
};

export default BeltPage;
