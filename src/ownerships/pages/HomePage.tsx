import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero__inner">
          <h1 className="hero__title">Better Place</h1>
          <p className="hero__subtitle">
            Creando espacios donde las conexiones florecen y los sueños se hacen realidad
          </p>
          <Link to="/register" className="btn-gradient">
            ¡registrate ya!
          </Link>
        </div>
      </section>
      <section className="stats">
        <div className="stats__grid">
          <div className="stats__card">
            <div className="stats__value">+5000</div>
            <div className="stats__label">Usuarios Felices</div>
          </div>
          <div className="stats__card">
            <div className="stats__value">24/7</div>
            <div className="stats__label">Soporte</div>
          </div>
          <div className="stats__card">
            <div className="stats__value">98%</div>
            <div className="stats__label">Satisfacción</div>
          </div>

          <Link to="/propietario" className="mt-4 text-sm underline block">
  Administrar mis propiedades →
</Link>

        </div>
      </section>
    </>
  );
}
