import { Link } from "react-router-dom";
import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-black">
      <div className="container py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 py-10">
          <div className="space-y-3">
            <h3 className="uppercase bg-gradient-to-r from-[#2A1EFA] to-[#BA1EFA] text-transparent bg-clip-text inline-block font-bold text-2xl">
              Better Place
            </h3>
            <p className="text-sm text-white">
              Creando espacios donde las conexiones florecen y los sueños se
              hacen realidad.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://wa.me/573113771792"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="text-brand-whatsapp hover:brightness-110 text-white transition"
                title="Escríbenos por WhatsApp"
              >
                <FaWhatsapp className="h-6 w-6" />
              </a>
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-brand-instagram text-white hover:brightness-110 transition"
                title="Síguenos en Instagram"
              >
                <FaInstagram className="h-6 w-6" />
              </a>
              <a
                href="https://facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-brand-facebook text-white hover:brightness-110 transition"
                title="Encuéntranos en Facebook"
              >
                <FaFacebook className="h-6 w-6 text-white" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-3 text-white"></h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/propietario" className="hover:underline text-white">
                  Propietario
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:underline text-white">
                  Nosotros
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-3 text-white">Contacto</h4>
            <ul className="space-y-2 text-sm text-white">
              <li>Medellín, Colombia</li>
              <li>+57 311 377 1792</li>
              <li>contacto@betterplace.com</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-3 text-white">Suscríbete</h4>
            <p className="text-sm mb-3 text-white">
              Recibe novedades y oportunidades destacadas.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Suscripción enviada ✅");
              }}
              className="flex gap-2"
            >
              <input
                type="email"
                required
                placeholder="tu@email.com"
                className="w-full rounded-xl border bg-white px-3 h-11 outline-none"
              />
              <button type="submit" className="btn-gradient h-11">
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-black/10">
        <div className="container py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm text-neutral-600">
          <p className="text-white mt-3">
            © {new Date().getFullYear()} Better Place — Todos los derechos
            reservados.
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline text-white">
              Privacidad
            </a>
            <a href="#" className="hover:underline text-white">
              Términos
            </a>
            <a href="#" className="hover:underline text-white">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
