import { Link } from 'react-router-dom';
import './OrderSuccess.css';

export function OrderSuccess() {
  return (
    <div className="order-success">
      <div className="order-success__box">
        <span className="order-success__icon"><i className="fa-solid fa-circle-check" aria-hidden /></span>
        <h1>Заказ принят</h1>
        <p>Мы свяжемся с вами в ближайшее время для подтверждения и уточнения доставки.</p>
        <Link to="/catalog" className="order-success__link">Вернуться в каталог</Link>
      </div>
    </div>
  );
}
