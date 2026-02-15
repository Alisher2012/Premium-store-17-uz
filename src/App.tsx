import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Layout } from './components/Layout/Layout';
import { Home } from './pages/customer/Home';
import { Catalog } from './pages/customer/Catalog';
import { ProductDetail } from './pages/customer/ProductDetail';
import { Cart } from './pages/customer/Cart';
import { Order } from './pages/customer/Order';
import { OrderSuccess } from './pages/customer/OrderSuccess';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="catalog" element={<Catalog />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="cart" element={<Cart />} />
            <Route path="order" element={<Order />} />
            <Route path="order/success" element={<OrderSuccess />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
