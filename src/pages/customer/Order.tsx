import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { storeApi } from '../../api/store';
import './Order.css';

export function Order() {
  const { items, totalSum, clearCart } = useCart();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (items.length === 0 && !submitting) {
    navigate('/cart', { replace: true });
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim()) {
      setError('Укажите имя');
      return;
    }
    if (!phone.trim()) {
      setError('Укажите телефон');
      return;
    }
    setSubmitting(true);
    try {
      storeApi.orders.create({
        customerName: name.trim(),
        customerPhone: phone.trim(),
        customerComment: comment.trim() || undefined,
        items: [...items],
        total: totalSum,
        status: 'new',
      });
      clearCart();
      navigate('/order/success', { replace: true });
    } catch {
      setError('Не удалось оформить заказ. Попробуйте снова.');
      setSubmitting(false);
    }
  };

  return (
    <div className="order-page">
      <h1 className="order-page__title">Оформление заказа</h1>
      <form className="order-page__form" onSubmit={handleSubmit}>
        {error && <p className="order-page__error">{error}</p>}
        <label className="order-page__label">
          Имя *
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ваше имя"
            disabled={submitting}
          />
        </label>
        <label className="order-page__label">
          Телефон *
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+998 90 123 45 67"
            disabled={submitting}
          />
        </label>
        <label className="order-page__label">
          Комментарий к заказу
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Адрес, пожелания..."
            rows={3}
            disabled={submitting}
          />
        </label>
        <div className="order-page__summary">
          <p>Товаров: {items.length} · Сумма: {new Intl.NumberFormat('uz-UZ').format(totalSum)} uzs</p>
        </div>
        <button type="submit" className="order-page__submit" disabled={submitting}>
          {submitting ? 'Отправка...' : 'Подтвердить заказ'}
        </button>
      </form>
    </div>
  );
}
