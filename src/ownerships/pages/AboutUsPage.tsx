import React, { useState } from "react";
import {
  Users,
  Target,
  Heart,
  Lightbulb,
  TrendingUp,
  Award,
} from "lucide-react";

export const AboutUsPage = () => {


  const [activeValue, setActiveValue] = useState(0);

  interface values {
    icon: string,
    title: string, 
    description: string
  }

  const values = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Conexión y Comunidad",
      description:
        "Creemos en el poder de las relaciones humanas auténticas y en construir espacios donde las personas puedan conectar de manera significativa.",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Mentalidad Abierta",
      description:
        "Abrazamos la diversidad de pensamiento y perspectivas, fomentando un ambiente donde todas las ideas son bienvenidas y valoradas.",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Resiliencia",
      description:
        "Enfrentamos los desafíos con determinación y aprendemos de cada experiencia para seguir creciendo y mejorando.",
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Ambición Creativa",
      description:
        "Nos impulsa la innovación y la creatividad, buscando constantemente nuevas formas de hacer las cosas mejor.",
    },
  ];

  const team = [
    {
      name: "Eddy Perea",
      role: "CEO",
      gradient: "from-purple-600 to-blue-600",
    },
    {
      name: "Juan Berdugo",
      role: "CTO",
      gradient: "from-blue-600 to-violet-600",
    },
    {
      name: "Juan Cañas",
      role: "CFO",
      gradient: "from-violet-600 to-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50 opacity-60"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-black">
            Better Place
          </h1>
          <p className="text-2xl md:text-3xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Creando espacios donde las conexiones florecen y los sueños se hacen
            realidad
          </p>
          <div className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full text-lg font-semibold">
            Este es el mejor lugar
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div
                className="text-5xl font-bold mb-2"
                style={{ color: "#2A1EFA" }}
              >
                +5000
              </div>
              <div className="text-xl text-gray-300">Usuarios Felices</div>
            </div>
            <div>
              <div
                className="text-5xl font-bold mb-2"
                style={{ color: "#BA1EFA" }}
              >
                2 Años
              </div>
              <div className="text-xl text-gray-300">De Experiencia</div>
            </div>
            <div>
              <div
                className="text-5xl font-bold mb-2"
                style={{ color: "#721EFA" }}
              >
                4 Valores
              </div>
              <div className="text-xl text-gray-300">Fundamentales</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
                Nuestra Misión
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                En Better Place, nos dedicamos a transformar la manera en que
                las personas se conectan, colaboran y crecen juntas. Creemos que
                cada individuo tiene un potencial único que merece ser
                descubierto y compartido con el mundo.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Nuestra plataforma fue creada con la visión de eliminar las
                barreras que impiden las conexiones auténticas, proporcionando
                herramientas y espacios donde las ideas pueden florecer y las
                comunidades pueden prosperar.
              </p>
            </div>
            <div className="relative h-96 rounded-3xl bg-gradient-to-br from-purple-400 via-blue-500 to-violet-600 shadow-2xl"></div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-black">
            Nuestros Valores
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
            Los principios que guían cada decisión y acción en Better Place
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 transition-all duration-300 hover:shadow-xl cursor-pointer group"
                onMouseEnter={() => setActiveValue(index)}
                style={{
                  transform:
                    activeValue === index
                      ? "translateY(-8px)"
                      : "translateY(0)",
                  borderTop:
                    activeValue === index
                      ? "4px solid #2A1EFA"
                      : "4px solid transparent",
                }}
              >
                <div
                  className="mb-4 transition-colors duration-300"
                  style={{
                    color: activeValue === index ? "#2A1EFA" : "#000000",
                  }}
                >
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-black">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-black">
            Nuestra Historia
          </h2>

          <div className="space-y-12">
            <div className="flex gap-8 items-start">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3 text-black">
                  El Comienzo
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Todo comenzó con una simple pregunta: ¿Qué pasaría si
                  pudiéramos crear un espacio donde las personas realmente se
                  sintieran escuchadas y valoradas? Tres visionarios decidieron
                  convertir esta pregunta en realidad.
                </p>
              </div>
            </div>

            <div className="flex gap-8 items-start">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 flex items-center justify-center text-white font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3 text-black">
                  El Crecimiento
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  En dos años, hemos crecido de una pequeña idea a una comunidad
                  vibrante de más de 5,000 usuarios. Cada persona que se une a
                  Better Place trae consigo nuevas perspectivas, experiencias y
                  sueños.
                </p>
              </div>
            </div>

            <div className="flex gap-8 items-start">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3 text-black">
                  El Futuro
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Miramos hacia adelante con ambición creativa y resiliencia.
                  Nuestro compromiso es seguir innovando, escuchando a nuestra
                  comunidad y construyendo el mejor lugar para que todos
                  prosperen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-6 bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Nuestro Equipo
          </h2>
          <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
            Las mentes creativas detrás de Better Place
          </p>

          <div className="grid md:grid-cols-3 gap-12">
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <div
                  className={`w-48 h-48 mx-auto mb-6 rounded-full bg-gradient-to-br ${member.gradient} transition-transform duration-300 group-hover:scale-105 shadow-2xl`}
                ></div>
                <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                <p className="text-lg" style={{ color: "#BA1EFA" }}>
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
