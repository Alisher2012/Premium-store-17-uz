import { useState, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { useVendorAuth } from '../../context/VendorAuthContext';
import { storeApi } from '../../api/store';
import type { Product, Order } from '../../types';
import { VendorProducts } from './VendorProducts';
import { VendorOrders } from './VendorOrders';
import './VendorDashboard.css';

export function VendorDashboard() {
  const { isAuthenticated } = useVendorAuth();
  const [tab, setTab] = useState<'products' | 'orders'>('orders');
  const [products, setProducts] = useState<Product[]>(() => storeApi.products.getAll());
  const [orders, setOrders] = useState<Order[]>(() => storeApi.orders.getAll());

  const refreshProducts = () => setProducts(storeApi.products.getAll());
  const refreshOrders = () => setOrders(storeApi.orders.getAll());

  const newOrdersCount = useMemo(
    () => orders.filter((o) => o.status === 'new').length,
    [orders]
  );

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="vendor-dashboard">
      <div className="vendor-dashboard__tabs">
        <button
          type="button"
          className={tab === 'orders' ? 'vendor-dashboard__tab vendor-dashboard__tab--active' : 'vendor-dashboard__tab'}
          onClick={() => setTab('orders')}
        >
          <i className="fa-solid fa-box-open" aria-hidden /> Заказы
          {newOrdersCount > 0 && (
            <span className="vendor-dashboard__badge">{newOrdersCount}</span>
          )}
        </button>
        <button
          type="button"
          className={tab === 'products' ? 'vendor-dashboard__tab vendor-dashboard__tab--active' : 'vendor-dashboard__tab'}
          onClick={() => setTab('products')}
        >
          <i className="fa-solid fa-shirt" aria-hidden /> Товары
        </button>
      </div>
      {tab === 'orders' && (
        <VendorOrders orders={orders} onUpdate={refreshOrders} />
      )}
      {tab === 'products' && (
        <VendorProducts products={products} onUpdate={refreshProducts} />
      )}
    </div>
  );
}
