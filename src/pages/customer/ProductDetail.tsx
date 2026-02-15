import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { storeApi } from '../../api/store';
import { useCart } from '../../context/CartContext';
import './ProductDetail.css';

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = id ? storeApi.products.getById(id) : undefined;
  const [selectedImage, setSelectedImage] = useState(product?.mainImage ?? '');
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  if (!product) {
    return (
      <div className="product-detail product-detail--missing">
        <p>Товар не найден.</p>
        <Link to="/catalog">В каталог</Link>
      </div>
    );
  }

  const images = [product.mainImage, ...(product.images?.filter((img) => img !== product.mainImage) ?? [])];
  useEffect(() => {
    setSelectedImage(product.mainImage);
  }, [product.id, product.mainImage]);
  const priceFormatted = new Intl.NumberFormat('uz-UZ').format(product.price) + ' ' + product.currency;

  const handleAddToCart = () => {
    addItem(product, quantity, selectedImage);
    navigate('/cart');
  };

  return (
    <div className="product-detail">
      <Link to="/catalog" className="product-detail__back"><i className="fa-solid fa-arrow-left" aria-hidden /> Каталог</Link>
      <div className="product-detail__content">
        <div className="product-detail__gallery">
          <div className="product-detail__main">
            <img src={selectedImage || images[0]} alt={product.title} />
          </div>
          <div className="product-detail__thumbs">
            {images.slice(0, 5).map((src) => (
              <button
                key={src}
                type="button"
                className={selectedImage === src ? 'product-detail__thumb product-detail__thumb--active' : 'product-detail__thumb'}
                onClick={() => setSelectedImage(src)}
              >
                <img src={src} alt="" />
              </button>
            ))}
          </div>
        </div>
        <div className="product-detail__info">
          <h1 className="product-detail__title">{product.title}</h1>
          {product.brand && (
            <p className="product-detail__brand">#{product.brand.replace(/\s+/g, '')}</p>
          )}
          <p className="product-detail__price">Цена: {priceFormatted}</p>
          <p className="product-detail__meta">Карго {product.cargoNo ? <>нет <i className="fa-solid fa-check" aria-hidden /></> : 'есть'}</p>
          <p className="product-detail__delivery">Доставка <i className="fa-solid fa-truck" aria-hidden />: {product.deliveryDays}</p>
          {product.adminContact && (
            <p className="product-detail__admin">Admin: {product.adminContact} {product.adminContact2}</p>
          )}
          <div className="product-detail__actions">
            <div className="product-detail__qty">
              <label>Количество:</label>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
              />
            </div>
            <button type="button" className="product-detail__add" onClick={handleAddToCart}>
              В корзину
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
