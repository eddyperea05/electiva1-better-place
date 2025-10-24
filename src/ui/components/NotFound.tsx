import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 rounded-full bg-gradient-to-br from-purple-200 to-blue-200 opacity-30 blur-3xl transition-all duration-1000"></div>
        <div className="absolute w-96 h-96 rounded-full bg-gradient-to-br from-blue-200 to-violet-200 opacity-30 blur-3xl transition-all duration-1000"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-20">
        <div className="mb-12 relative">
          <h1
            className="text-9xl md:text-[200px] font-bold tracking-tight transition-all duration-300"
            style={{
              background:
                "linear-gradient(135deg, #2A1EFA 0%, #BA1EFA 50%, #721EFA 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              transform: "scale(1.05)",
            }}
          >
            404
          </h1>
          <div className="absolute inset-0 blur-2xl opacity-30 bg-gradient-to-r from-purple-600 via-blue-600 to-violet-600"></div>
        </div>

        <div className="text-center mb-12 max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
            Página No Encontrada
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 mb-4">
            Por aqui no es mi rey
          </p>
          <p className="text-lg text-gray-500">
            La página que buscas no hay o ha sido movida a otra parte. Mejor
            regrese al inicio para que que se ubique mejor.
          </p>
        </div>

        <button
          className="group mb-16 px-10 py-4 text-lg font-semibold text-white rounded-full transition-all duration-300 hover:shadow-2xl hover:scale-105 flex items-center gap-3"
          style={{
            background: "linear-gradient(135deg, #2A1EFA 0%, #BA1EFA 100%)",
          }}
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <Link to="/">Volver a casita papi</Link>
        </button>
      </div>
    </div>
  );
};
