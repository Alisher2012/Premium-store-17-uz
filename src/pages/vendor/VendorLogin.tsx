import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useVendorAuth } from '../../context/VendorAuthContext';
import './VendorLogin.css';

export function VendorLogin() {
  const { login, isAuthenticated } = useVendorAuth();
  const navigate = useNavigate();
  const [loginName, setLoginName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const ok = login(loginName, password);
    if (ok) {
      navigate('/dashboard', { replace: true });
    } else {
      setError('Неверный логин или пароль');
    }
  };

  return (
    <div className="vendor-login">
      <div className="vendor-login__box">
        <h1>Вход для продавцов</h1>
        <p className="vendor-login__hint">PREMIUM 17</p>
        <form onSubmit={handleSubmit}>
          {error && <p className="vendor-login__error">{error}</p>}
          <label>
            Логин
            <input
              type="text"
              value={loginName}
              onChange={(e) => setLoginName(e.target.value)}
              autoComplete="username"
            />
          </label>
          <label>
            Пароль
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </label>
          <button type="submit">Войти</button>
        </form>
        <p className="vendor-login__demo">Демо: admin / premium17</p>
      </div>
    </div>
  );
}
