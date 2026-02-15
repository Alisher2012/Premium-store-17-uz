import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import './Layout.css';

export function Layout() {
  return (
    <div className="layout">
      <Header />
      <main className="layout__main">
        <Outlet />
      </main>
      <footer className="layout__footer">
        <div className="layout__footer-inner">
          <span className="layout__footer-logo">PREMIUM 17</span>
          <span>EST2025 · Товары из Китая</span>
        </div>
      </footer>
    </div>
  );
}
