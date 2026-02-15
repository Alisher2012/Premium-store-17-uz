import { useMemo, useState } from 'react';
import { storeApi } from '../../api/store';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import './Catalog.css';

export function Catalog() {
  const [search, setSearch] = useState('');
  const products = useMemo(() => {
    const all = storeApi.products.getAll();
    if (!search.trim()) return all;
    const q = search.toLowerCase();
    return all.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        (p.brand && p.brand.toLowerCase().includes(q))
    );
  }, [search]);

  return (
    <div className="catalog">
      <h1 className="catalog__title">Каталог</h1>
      <div className="catalog__toolbar">
        <input
          type="search"
          placeholder="Поиск по названию или бренду..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="catalog__search"
        />
      </div>
      <div className="catalog__grid">
        {products.length === 0 ? (
          <p className="catalog__empty">Товаров не найдено</p>
        ) : (
          products.map((product) => (
            <ProductCard key={product.id} product={product} variant="full" />
          ))
        )}
      </div>
    </div>
  );
}
