import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Cart.css';

export function Cart() {
  const { items, totalSum, totalCount, removeItem, setQuantity } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="cart cart--empty">
        <h1>Корзина</h1>
        <p>Корзина пуста.</p>
        <Link to="/catalog">В каталог</Link>
      </div>
    );
  }

  const handleOrder = () => navigate('/order');

  return (
    <div className="cart">
      <h1 className="cart__title">Корзина</h1>
      <div className="cart__list">
        {items.map((item) => (
          <div key={item.product.id} className="cart-item">
            <div className="cart-item__image">
              <img
                src={item.selectedImage || item.product.mainImage}
                alt={item.product.title}
              />
            </div>
            <div className="cart-item__info">
              <Link to={`/product/${item.product.id}`} className="cart-item__name">
                {item.product.title}
              </Link>
              <p className="cart-item__price">
                {new Intl.NumberFormat('uz-UZ').format(item.product.price)} {item.product.currency}
              </p>
              <div className="cart-item__qty">
                <button
                  type="button"
                  onClick={() => setQuantity(item.product.id, item.quantity - 1)}
                  aria-label="Уменьшить"
                >
                  <i className="fa-solid fa-minus" aria-hidden />
                </button>
                <span>{item.quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(item.product.id, item.quantity + 1)}
                  aria-label="Увеличить"
                >
                  <i className="fa-solid fa-plus" aria-hidden />
                </button>
              </div>
            </div>
            <div className="cart-item__total">
              {new Intl.NumberFormat('uz-UZ').format(item.product.price * item.quantity)} uzs
            </div>
            <button
              type="button"
              className="cart-item__remove"
              onClick={() => removeItem(item.product.id)}
              aria-label="Удалить"
            >
              <i className="fa-solid fa-trash" aria-hidden />
            </button>
          </div>
        ))}
      </div>
      <div className="cart__footer">
        <p className="cart__total">
          Товаров: {totalCount} · Сумма: {new Intl.NumberFormat('uz-UZ').format(totalSum)} uzs
        </p>
        <button type="button" className="cart__order-btn" onClick={handleOrder}>
          Оформить заказ
        </button>
      </div>
    </div>
  );
}
