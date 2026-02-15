import { useState, useEffect } from 'react';
import type { Product } from '../../types';
import './ProductForm.css';

interface ProductFormProps {
  initial?: Product;
  onSave: (data: Omit<Product, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

const emptyForm = (): Omit<Product, 'id' | 'createdAt'> => ({
  title: '',
  brand: '',
  price: 0,
  currency: 'uzs',
  mainImage: '',
  images: [],
  cargoNo: true,
  deliveryDays: '10-14 дней',
  adminContact: '',
  adminContact2: '',
  views: 0,
  reactions: { heart: 0, fire: 0 },
  updatedAt: undefined,
});

export function ProductForm({ initial, onSave, onCancel }: ProductFormProps) {
  const [form, setForm] = useState<Omit<Product, 'id' | 'createdAt'>>(emptyForm);

  useEffect(() => {
    if (initial) {
      setForm({
        title: initial.title,
        brand: initial.brand ?? '',
        price: initial.price,
        currency: initial.currency,
        mainImage: initial.mainImage,
        images: initial.images ?? [],
        cargoNo: initial.cargoNo,
        deliveryDays: initial.deliveryDays,
        adminContact: initial.adminContact ?? '',
        adminContact2: initial.adminContact2 ?? '',
        views: initial.views ?? 0,
        reactions: initial.reactions ?? { heart: 0, fire: 0 },
        updatedAt: initial.updatedAt,
      });
    } else {
      setForm(emptyForm());
    }
  }, [initial]);

  const update = (patch: Partial<Omit<Product, 'id' | 'createdAt'>>) => {
    setForm((prev) => ({ ...prev, ...patch }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const main = form.mainImage.trim();
    const images = [main, ...(form.images?.filter((u) => u.trim() && u !== main) ?? [])];
    onSave({
      ...form,
      mainImage: main || 'https://placehold.co/400?text=Photo',
      images: images.slice(0, 5),
    });
  };

  const addImageUrl = () => {
    update({ images: [...(form.images ?? []), ''] });
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h3>{initial ? 'Редактировать товар' : 'Новый товар'}</h3>
      <label>
        Название *
        <input
          type="text"
          value={form.title}
          onChange={(e) => update({ title: e.target.value })}
          required
        />
      </label>
      <label>
        Бренд
        <input
          type="text"
          value={form.brand}
          onChange={(e) => update({ brand: e.target.value })}
          placeholder="Paul & Shark"
        />
      </label>
      <label>
        Цена *
        <input
          type="number"
          min={0}
          value={form.price || ''}
          onChange={(e) => update({ price: Number(e.target.value) || 0 })}
          required
        />
      </label>
      <label>
        Валюта
        <input
          type="text"
          value={form.currency}
          onChange={(e) => update({ currency: e.target.value })}
        />
      </label>
      <label>
        Главное фото (URL) *
        <input
          type="url"
          value={form.mainImage}
          onChange={(e) => update({ mainImage: e.target.value })}
          placeholder="https://..."
        />
      </label>
      <div className="product-form__images">
        <span>Доп. фото (URL)</span>
        {(form.images ?? []).map((url, i) => (
          <input
            key={i}
            type="url"
            value={url}
            onChange={(e) => {
              const next = [...(form.images ?? [])];
              next[i] = e.target.value;
              update({ images: next });
            }}
            placeholder="https://..."
          />
        ))}
        <button type="button" onClick={addImageUrl}>+ Ещё фото</button>
      </div>
      <label className="product-form__check">
        <input
          type="checkbox"
          checked={form.cargoNo}
          onChange={(e) => update({ cargoNo: e.target.checked })}
        />
        Карго нет
      </label>
      <label>
        Доставка (дней)
        <input
          type="text"
          value={form.deliveryDays}
          onChange={(e) => update({ deliveryDays: e.target.value })}
          placeholder="10-14 дней"
        />
      </label>
      <label>
        Admin контакт
        <input
          type="text"
          value={form.adminContact}
          onChange={(e) => update({ adminContact: e.target.value })}
          placeholder="@username"
        />
      </label>
      <label>
        Admin контакт 2
        <input
          type="text"
          value={form.adminContact2}
          onChange={(e) => update({ adminContact2: e.target.value })}
        />
      </label>
      <div className="product-form__actions">
        <button type="submit">Сохранить</button>
        <button type="button" onClick={onCancel}>Отмена</button>
      </div>
    </form>
  );
}
