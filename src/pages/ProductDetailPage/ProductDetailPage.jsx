import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { fetchProductById } from '../../services/productService';
import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../utils/formatPrice';
import {
  getBrand,
  getGalleryImages,
  getProductVariants,
  getSalePrice,
  getVariantStock,
} from '../../utils/variants';
import VariantSelector from '../../components/VariantSelector/VariantSelector';
import QuantitySelector from '../../components/QuantitySelector/QuantitySelector';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import styles from './ProductDetailPage.module.scss';

function getStockStatus(productId, size, color) {
  const stock = getVariantStock(productId, size, color);
  if (stock === 0) return 'sold-out';
  if (stock <= 3) return 'low';
  return 'available';
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { addItem, openDrawer } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchProductById(id)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Could not load this product.');
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (!product) return;

    const { sizes, colors } = getProductVariants(product.id);
    const next = new URLSearchParams(searchParams);
    let changed = false;

    if (!next.get('size') || !sizes.includes(next.get('size'))) {
      next.set('size', sizes[0]);
      changed = true;
    }
    if (!next.get('color') || !colors.some((c) => c.name === next.get('color'))) {
      next.set('color', colors[0].name);
      changed = true;
    }

    if (changed) {
      setSearchParams(next, { replace: true });
    }
  }, [product, searchParams, setSearchParams]);

  if (loading) {
    return <LoadingSpinner label="Loading product..." />;
  }

  if (error || !product) {
    return (
      <div className={styles.errorWrapper}>
        <ErrorMessage
          message={error || 'Product not found.'}
          onRetry={() => window.location.reload()}
        />
        <Link to="/" className={styles.backLink}>
          Back to products
        </Link>
      </div>
    );
  }

  const variants = getProductVariants(product.id);
  const selectedSize = searchParams.get('size') || variants.sizes[0];
  const selectedColor = searchParams.get('color') || variants.colors[0].name;
  const stock = getVariantStock(product.id, selectedSize, selectedColor);
  const galleryImages = getGalleryImages(product);
  const sale = getSalePrice(product);
  const brand = getBrand(product);

  function updateVariant(key, value) {
    setQuantity(1);
    setActiveImage(0);
    const next = new URLSearchParams(searchParams);
    next.set(key, value);
    setSearchParams(next, { replace: true });
  }

  function handleAddToCart() {
    if (stock === 0) return;
    addItem(product, {
      size: selectedSize,
      color: selectedColor,
      quantity,
      maxStock: stock,
    });
    openDrawer();
  }

  return (
    <div className={styles.page}>
      <Link to="/" className={styles.backLink}>
        Back to products
      </Link>

      <div className={styles.content}>
        <div className={styles.gallery}>
          <div className={styles.mainImageWrapper}>
            <img
              src={galleryImages[activeImage].src}
              alt={galleryImages[activeImage].alt}
              className={styles.mainImage}
            />
          </div>
          <div className={styles.thumbnails}>
            {galleryImages.map((img, index) => (
              <button
                key={img.id}
                type="button"
                className={`${styles.thumbnail} ${index === activeImage ? styles.active : ''}`}
                onClick={() => setActiveImage(index)}
              >
                <img src={img.src} alt="" />
              </button>
            ))}
          </div>
        </div>

        <div className={styles.details}>
          <p className={styles.brand}>{brand}</p>
          <h1 className={styles.title}>{product.title}</h1>

          <div className={styles.priceRow}>
            {sale ? (
              <>
                <span className={styles.salePrice}>{formatPrice(sale.salePrice)}</span>
                <span className={styles.originalPrice}>{formatPrice(sale.originalPrice)}</span>
              </>
            ) : (
              <span className={styles.price}>{formatPrice(product.price)}</span>
            )}
          </div>

          <p className={styles.description}>{product.description}</p>

          <VariantSelector
            label="Size"
            options={variants.sizes}
            value={selectedSize}
            onChange={(size) => updateVariant('size', size)}
            getStockStatus={(size) => getStockStatus(product.id, size, selectedColor)}
          />
          <VariantSelector
            label="Color"
            type="color"
            options={variants.colors}
            value={selectedColor}
            onChange={(color) => updateVariant('color', color)}
            getStockStatus={(color) => getStockStatus(product.id, selectedSize, color.name)}
          />

          <p className={styles.stock}>
            {stock === 0 && <span className={styles.outOfStock}>Sold out</span>}
            {stock > 0 && stock <= 3 && (
              <span className={styles.lowStock}>Only {stock} left</span>
            )}
            {stock > 3 && <span className={styles.inStock}>{stock} in stock</span>}
          </p>

          <div className={styles.purchase}>
            <QuantitySelector
              value={quantity}
              onChange={setQuantity}
              min={1}
              max={stock}
              disabled={stock === 0}
            />
            <button
              type="button"
              className={styles.addBtn}
              onClick={handleAddToCart}
              disabled={stock === 0}
            >
              {stock === 0 ? 'Sold Out' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
