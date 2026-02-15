import { Link } from 'react-router-dom';
import { storeApi } from '../../api/store';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import './Home.css';

export function Home() {
  const products = storeApi.products.getAll().slice(0, 4);

  return (
    <div className="home">
      <section className="home__hero">
        <h1 className="home__hero-title">PREMIUM 17</h1>
        <p className="home__hero-subtitle">Премиум товары из Китая · EST2025</p>
        <Link to="/catalog" className="home__hero-cta"><i className="fa-solid fa-th-large" aria-hidden /> Смотреть каталог</Link>
      </section>
      <section className="home__featured">
        <h2 className="home__section-title">Популярные товары</h2>
        <div className="home__grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} variant="full" />
          ))}
        </div>
        <Link to="/catalog" className="home__more">Весь каталог →</Link>
      </section>
    </div>
  );
}
