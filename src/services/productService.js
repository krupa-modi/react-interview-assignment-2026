const API_BASE = 'https://fakestoreapi.com';

async function getJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Request failed');
  return res.json();
}

export function fetchProducts() {
  return getJson(`${API_BASE}/products`);
}

export function fetchProductById(id) {
  return getJson(`${API_BASE}/products/${id}`);
}
