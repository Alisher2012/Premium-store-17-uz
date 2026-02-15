import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Header.css';

const ADMIN_SITE_URL = '/admin.html';

export function Header() {
  const { totalCount } = useCart();

  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="header__logo">
          <i className="fa-solid fa-crown header__logo-icon" aria-hidden />
          <span className="header__logo-text">
            <span className="header__logo-premium">PREMIUM</span>
            <span className="header__logo-num">17</span>
          </span>
          <span className="header__logo-est">EST 2025</span>
        </Link>
        <nav className="header__nav">
          <Link to="/" className="header__nav-link">
            <i className="fa-solid fa-house" aria-hidden />
            <span>Главная</span>
          </Link>
          <Link to="/catalog" className="header__nav-link">
            <i className="fa-solid fa-th-large" aria-hidden />
            <span>Каталог</span>
          </Link>
          <Link to="/cart" className="header__nav-link header__cart-link">
            <i className="fa-solid fa-cart-shopping" aria-hidden />
            <span>Корзина</span>
            {totalCount > 0 && (
              <span className="header__cart-badge">{totalCount}</span>
            )}
          </Link>
          <a
            href={ADMIN_SITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="header__nav-link header__vendor-link"
          >
            <i className="fa-solid fa-user-lock" aria-hidden />
            <span>Для продавцов</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
