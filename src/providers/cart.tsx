import { createContext, useContext, useState, ReactNode, useMemo } from 'react';

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  total: number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({children}: {children: ReactNode}) => {
  const [cartItems, setcartItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setcartItems(prev => {
      const existing = prev.find((i) => i.id === item.id);
      if(existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      } else {
        return [...prev, item]
      }
    });
  };

  const removeFromCart = (id: number) => {
    setcartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    setcartItems(prev => prev.map(item => 
      item.id === id ? {...item, quantity} : item
    ));
  };

  const total = useMemo(() => {
    return cartItems.reduce((sun, item) => {
      return sun + item.price * item.quantity;
    }, 0);
  }, [cartItems]);

  const clearCart = () => {
    setcartItems([]);
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, total, clearCart }}>
      {children}
    </CartContext.Provider>
  );

};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};