import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useVendorAuth } from '../../context/VendorAuthContext';
import './VendorLayout.css';

export function VendorLayout() {
  const { session, logout, isAuthenticated } = useVendorAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="vendor-layout">
      <header className="vendor-layout__header">
        <div className="vendor-layout__inner">
          <Link to="/" className="vendor-layout__logo">
            <i className="fa-solid fa-crown vendor-layout__logo-icon" aria-hidden />
            <span>PREMIUM 17 · Панель продавца</span>
          </Link>
          {isAuthenticated && session && (
            <div className="vendor-layout__user">
              <span>{session.name}</span>
              <button type="button" onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket" aria-hidden />
                <span>Выйти</span>
              </button>
            </div>
          )}
        </div>
      </header>
      <main className="vendor-layout__main">
        <Outlet />
      </main>
    </div>
  );
}
