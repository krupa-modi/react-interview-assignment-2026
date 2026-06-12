const SIZES = ['XS', 'S', 'M', 'L', 'XL'];

const COLORS = [
  { name: 'Black', hex: '#1a1a1a' },
  { name: 'Navy', hex: '#1e3a5f' },
  { name: 'White', hex: '#f5f5f5' },
  { name: 'Red', hex: '#c0392b' },
  { name: 'Green', hex: '#2d6a4f' },
];

export function getProductVariants(productId) {
  const id = Number(productId);
  const sizeCount = 3 + (id % 3);
  const colorCount = 2 + (id % 3);

  return {
    sizes: SIZES.slice(0, sizeCount),
    colors: COLORS.slice(0, colorCount),
  };
}

export function getVariantStock(productId, size, color) {
  const id = Number(productId);
  const sizeIndex = SIZES.indexOf(size);
  const colorIndex = COLORS.findIndex((c) => c.name === color);
  const value = id * 7 + sizeIndex * 3 + colorIndex;

  if (value % 7 === 0) return 0;
  return 1 + (value % 15);
}

export function buildCartItemId(productId, size, color) {
  return `${productId}-${size}-${color}`;
}

export function getGalleryImages(product) {
  return [
    { id: 'main', src: product.image, alt: product.title },
    { id: 'detail', src: product.image, alt: `${product.title} detail` },
    { id: 'side', src: product.image, alt: `${product.title} side` },
    { id: 'back', src: product.image, alt: `${product.title} back` },
  ];
}

export function getBrand(product) {
  if (!product?.category) return 'Store Brand';
  return product.category
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function getSalePrice(product) {
  if (product.id % 2 === 0) return null;
  const salePrice = product.price;
  const originalPrice = Math.round(product.price * 1.2 * 100) / 100;
  return { salePrice, originalPrice };
}
