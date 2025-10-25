import { Link } from 'react-router-dom';
import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-brand-soft border-t border-black/10">
      
      <div className="container py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          <div className="space-y-3">
            <h3 className="text-2xl font-black tracking-tight">Better Place</h3>
            <p className="text-sm text-neutral-600">
              Creando espacios donde las conexiones florecen y los sueños se hacen realidad.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://wa.me/573113771792"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="text-brand-whatsapp hover:brightness-110 transition"
                title="Escríbenos por WhatsApp"
              >
                <FaWhatsapp className="h-6 w-6" />
              </a>
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-brand-instagram hover:brightness-110 transition"
                title="Síguenos en Instagram"
              >
                <FaInstagram className="h-6 w-6" />
              </a>
              <a
                href="https://facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-brand-facebook hover:brightness-110 transition"
                title="Encuéntranos en Facebook"
              >
                <FaFacebook className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-3"></h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/propietario" className="hover:underline">Propietario</Link></li>
              <li><Link to="/about" className="hover:underline">Nosotros</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-3">Contacto</h4>
            <ul className="space-y-2 text-sm text-neutral-700">
              <li>Medellín, Colombia</li>
              <li>+57 311 377 1792</li>
              <li>contacto@betterplace.com</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-3">Suscríbete</h4>
            <p className="text-sm text-neutral-600 mb-3">
              Recibe novedades y oportunidades destacadas.
            </p>
            <form
              onSubmit={(e) => { e.preventDefault(); alert("Suscripción enviada ✅"); }}
              className="flex gap-2"
            >
              <input
                type="email"
                required
                placeholder="tu@email.com"
                className="w-full rounded-xl border border-neutral-200 px-3 h-11 outline-none focus:ring-4 focus:ring-violet-200"
              />
              <button type="submit" className="btn-gradient h-11">Enviar</button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-black/10">
        <div className="container py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm text-neutral-600">
          <p>© {new Date().getFullYear()} Better Place — Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Privacidad</a>
            <a href="#" className="hover:underline">Términos</a>
            <a href="#" className="hover:underline">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};