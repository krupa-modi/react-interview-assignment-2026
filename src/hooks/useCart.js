import { useContext } from 'react';
import { CartContext } from '../context/CartProvider';

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    // for create custom error 
    throw new Error('useCart must be used inside CartProvider');
  }
  return context;
}
