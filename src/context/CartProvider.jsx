import { createContext, useEffect, useState } from 'react';
import { loadCartFromStorage, saveCartToStorage } from '../utils/cartStorage';
import { buildCartItemId } from '../utils/variants';

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => loadCartFromStorage());
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    saveCartToStorage(items);
  }, [items]);

  function addItem(product, { size, color, quantity = 1, maxStock }) {
    const cartItemId = buildCartItemId(product.id, size, color);

    setItems((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId);

      if (existing) {
        const newQty = Math.min(existing.quantity + quantity, maxStock);
        return prev.map((item) =>
          item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
        );
      }

      return [
        ...prev,
        {
          cartItemId,
          productId: product.id,
          title: product.title,
          image: product.image,
          price: product.price,
          size,
          color,
          quantity: Math.min(quantity, maxStock),
          maxStock,
        },
      ];
    });
  }

  function removeItem(cartItemId) {
    setItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  }

  function updateQuantity(cartItemId, quantity) {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.cartItemId !== cartItemId) return item;
          const qty = Math.max(0, Math.min(quantity, item.maxStock));
          return { ...item, quantity: qty };
        })
        .filter((item) => item.quantity > 0)
    );
  }

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        total: subtotal,
        isDrawerOpen,
        openDrawer: () => setIsDrawerOpen(true),
        closeDrawer: () => setIsDrawerOpen(false),
        addItem,
        removeItem,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
