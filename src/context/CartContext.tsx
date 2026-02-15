import { createContext, useContext, useReducer, useCallback, type ReactNode } from 'react';
import type { Product, CartItem } from '../types';

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD'; product: Product; quantity?: number; selectedImage?: string }
  | { type: 'REMOVE'; productId: string }
  | { type: 'SET_QUANTITY'; productId: string; quantity: number }
  | { type: 'CLEAR' };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find((i) => i.product.id === action.product.id);
      const q = action.quantity ?? 1;
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === action.product.id
              ? { ...i, quantity: i.quantity + q, selectedImage: action.selectedImage ?? i.selectedImage }
              : i
          ),
        };
      }
      return {
        items: [...state.items, { product: action.product, quantity: q, selectedImage: action.selectedImage }],
      };
    }
    case 'REMOVE':
      return { items: state.items.filter((i) => i.product.id !== action.productId) };
    case 'SET_QUANTITY': {
      if (action.quantity <= 0) {
        return { items: state.items.filter((i) => i.product.id !== action.productId) };
      }
      return {
        items: state.items.map((i) =>
          i.product.id === action.productId ? { ...i, quantity: action.quantity } : i
        ),
      };
    }
    case 'CLEAR':
      return { items: [] };
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  totalCount: number;
  totalSum: number;
  addItem: (product: Product, quantity?: number, selectedImage?: string) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addItem = useCallback(
    (product: Product, quantity = 1, selectedImage?: string) => {
      dispatch({ type: 'ADD', product, quantity, selectedImage });
    },
    []
  );
  const removeItem = useCallback((productId: string) => {
    dispatch({ type: 'REMOVE', productId });
  }, []);
  const setQuantity = useCallback((productId: string, quantity: number) => {
    dispatch({ type: 'SET_QUANTITY', productId, quantity });
  }, []);
  const clearCart = useCallback(() => dispatch({ type: 'CLEAR' }), []);

  const totalCount = state.items.reduce((s, i) => s + i.quantity, 0);
  const totalSum = state.items.reduce((s, i) => s + i.product.price * i.quantity, 0);

  const value: CartContextValue = {
    items: state.items,
    totalCount,
    totalSum,
    addItem,
    removeItem,
    setQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
