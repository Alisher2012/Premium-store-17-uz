import { storeApi } from '../../api/store';
import type { Order } from '../../types';
import './VendorOrders.css';

interface VendorOrdersProps {
  orders: Order[];
  onUpdate: () => void;
}

const STATUS_LABELS: Record<Order['status'], string> = {
  new: 'Новый',
  accepted: 'Принят',
  shipped: 'Отправлен',
  delivered: 'Доставлен',
  cancelled: 'Отменён',
};

export function VendorOrders({ orders, onUpdate }: VendorOrdersProps) {
  const setStatus = (id: string, status: Order['status']) => {
    storeApi.orders.updateStatus(id, status);
    onUpdate();
  };

  if (orders.length === 0) {
    return (
      <div className="vendor-orders">
        <h2>Заказы</h2>
        <p className="vendor-orders__empty">Пока нет заказов.</p>
      </div>
    );
  }

  return (
    <div className="vendor-orders">
      <h2>Заказы</h2>
      <div className="vendor-orders__list">
        {orders.map((order) => (
          <div
            key={order.id}
            className={`vendor-orders__card ${order.status === 'new' ? 'vendor-orders__card--new' : ''}`}
          >
            <div className="vendor-orders__head">
              <span className="vendor-orders__id">{order.id}</span>
              <span className="vendor-orders__date">
                {new Date(order.createdAt).toLocaleString('ru')}
              </span>
              <span className={`vendor-orders__status vendor-orders__status--${order.status}`}>
                {STATUS_LABELS[order.status]}
              </span>
            </div>
            <div className="vendor-orders__body">
              <p><strong>{order.customerName}</strong> · {order.customerPhone}</p>
              {order.customerComment && (
                <p className="vendor-orders__comment">{order.customerComment}</p>
              )}
              <ul className="vendor-orders__items">
                {order.items.map((item, i) => (
                  <li key={i}>
                    {item.product.title} × {item.quantity} — {new Intl.NumberFormat('uz-UZ').format(item.product.price * item.quantity)} uzs
                  </li>
                ))}
              </ul>
              <p className="vendor-orders__total">
                Итого: {new Intl.NumberFormat('uz-UZ').format(order.total)} uzs
              </p>
            </div>
            <div className="vendor-orders__actions">
              {order.status === 'new' && (
                <>
                  <button
                    type="button"
                    className="vendor-orders__accept"
                    onClick={() => setStatus(order.id, 'accepted')}
                  >
                    <i className="fa-solid fa-check" aria-hidden /> Принять заказ
                  </button>
                  <button
                    type="button"
                    className="vendor-orders__cancel"
                    onClick={() => setStatus(order.id, 'cancelled')}
                  >
                    <i className="fa-solid fa-xmark" aria-hidden /> Отменить
                  </button>
                </>
              )}
              {order.status === 'accepted' && (
                <button
                  type="button"
                  onClick={() => setStatus(order.id, 'shipped')}
                >
                  Отправлен
                </button>
              )}
              {order.status === 'shipped' && (
                <button
                  type="button"
                  onClick={() => setStatus(order.id, 'delivered')}
                >
                  Доставлен
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
