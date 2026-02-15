import { useState } from 'react';
import { storeApi } from '../../api/store';
import type { Product } from '../../types';
import { ProductForm } from './ProductForm';
import './VendorProducts.css';

interface VendorProductsProps {
  products: Product[];
  onUpdate: () => void;
}

export function VendorProducts({ products, onUpdate }: VendorProductsProps) {
  const [editing, setEditing] = useState<Product | null>(null);
  const [adding, setAdding] = useState(false);

  const handleDelete = (id: string) => {
    if (confirm('Удалить товар?')) {
      storeApi.products.remove(id);
      onUpdate();
      setEditing(null);
    }
  };

  const handleSave = (data: Omit<Product, 'id' | 'createdAt'>) => {
    if (editing) {
      storeApi.products.update(editing.id, data);
      setEditing(null);
    } else {
      storeApi.products.add(data);
      setAdding(false);
    }
    onUpdate();
  };

  return (
    <div className="vendor-products">
      <div className="vendor-products__head">
        <h2>Товары</h2>
        <button
          type="button"
          className="vendor-products__add-btn"
          onClick={() => { setAdding(true); setEditing(null); }}
        >
          <i className="fa-solid fa-plus" aria-hidden /> Добавить товар
        </button>
      </div>
      {adding && (
        <div className="vendor-products__form-wrap">
          <ProductForm
            onSave={handleSave}
            onCancel={() => setAdding(false)}
          />
        </div>
      )}
      {editing && (
        <div className="vendor-products__form-wrap">
          <ProductForm
            initial={editing}
            onSave={handleSave}
            onCancel={() => setEditing(null)}
          />
        </div>
      )}
      <div className="vendor-products__list">
        {products.length === 0 ? (
          <p className="vendor-products__empty">Нет товаров. Добавьте первый.</p>
        ) : (
          products.map((p) => (
            <div key={p.id} className="vendor-products__row">
              <div className="vendor-products__thumb">
                <img src={p.mainImage} alt="" />
              </div>
              <div className="vendor-products__cell vendor-products__title">{p.title}</div>
              <div className="vendor-products__cell">{new Intl.NumberFormat('uz-UZ').format(p.price)} {p.currency}</div>
              <div className="vendor-products__actions">
                <button type="button" onClick={() => { setEditing(p); setAdding(false); }}><i className="fa-solid fa-pen" aria-hidden /> Изменить</button>
                <button type="button" className="vendor-products__del" onClick={() => handleDelete(p.id)}><i className="fa-solid fa-trash" aria-hidden /> Удалить</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
