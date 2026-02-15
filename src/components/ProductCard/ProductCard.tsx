import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  /** compact = only link, no add to cart (e.g. in catalog grid) */
  variant?: 'full' | 'compact';
}

export function ProductCard({ product, variant = 'full' }: ProductCardProps) {
  const [selectedImage, setSelectedImage] = useState(product.mainImage);
  const images = [product.mainImage, ...(product.images?.filter((img) => img !== product.mainImage) ?? [])];
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1, selectedImage);
  };

  const priceFormatted = new Intl.NumberFormat('uz-UZ').format(product.price) + ' ' + product.currency;

  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-card__link">
        <div className="product-card__images">
          <div className="product-card__main-image-wrap">
            <img
              src={selectedImage}
              alt={product.title}
              className="product-card__main-image"
            />
          </div>
          {images.length > 1 && (
            <div className="product-card__thumbnails">
              {images.slice(0, 4).map((src) => (
                <button
                  key={src}
                  type="button"
                  className={`product-card__thumb ${selectedImage === src ? 'product-card__thumb--active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedImage(src);
                  }}
                >
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="product-card__info">
          <h3 className="product-card__title">
            {product.brand ? `#${product.brand.replace(/\s+/g, '')}` : ''} {product.title}
          </h3>
          <p className="product-card__price">
            Цена: {priceFormatted}
            {product.reactions?.fire ? <i className="fa-solid fa-fire product-card__icon" aria-hidden /> : null}
          </p>
          <p className="product-card__meta">
            Карго {product.cargoNo ? <>нет <i className="fa-solid fa-check product-card__icon" aria-hidden /></> : 'есть'}
          </p>
          <p className="product-card__delivery">
            Доставка <i className="fa-solid fa-truck product-card__icon" aria-hidden />: {product.deliveryDays}
          </p>
          {product.adminContact && (
            <p className="product-card__admin">
              Admin: {product.adminContact}
              {product.adminContact2 && ` ${product.adminContact2}`}
            </p>
          )}
          <div className="product-card__footer">
            <div className="product-card__reactions">
              {product.reactions?.heart !== undefined && (
                <span><i className="fa-solid fa-heart product-card__icon" aria-hidden /> {product.reactions.heart}</span>
              )}
              {product.reactions?.fire !== undefined && (
                <span><i className="fa-solid fa-fire product-card__icon" aria-hidden /> {product.reactions.fire}</span>
              )}
            </div>
            <div className="product-card__views">
              {product.views != null && (
                <>
                  <span><i className="fa-solid fa-eye product-card__icon" aria-hidden /> {product.views}</span>
                  {product.updatedAt && (
                    <span> изменено {product.updatedAt}</span>
                  )}
                </>
              )}
            </div>
          </div>
          {variant === 'full' && (
            <button
              type="button"
              className="product-card__add"
              onClick={handleAddToCart}
            >
              <i className="fa-solid fa-cart-plus" aria-hidden /> В корзину
            </button>
          )}
        </div>
      </Link>
    </article>
  );
}
