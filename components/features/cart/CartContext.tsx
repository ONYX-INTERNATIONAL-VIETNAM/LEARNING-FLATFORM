"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = {
  id: string;           // course id
  title: string;
  level?: string;
  duration?: string;
  price: number;        // VND
  qty: number;
  image: string;       // course image
};

type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
  subtotal: number;
  clearCart: () => void;
};

const Ctx = createContext<CartState | null>(null);
const KEY = "onyx_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // load
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);
  // persist
  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (it: CartItem) =>
    setItems((prev) => {
      const found = prev.find((p) => p.id === it.id);
      if (found) {
        return prev.map((p) =>
          p.id === it.id ? { ...p, qty: p.qty + it.qty } : p
        );
      }
      return [...prev, it];
    });

  const removeItem = (id: string) =>
    setItems((prev) => prev.filter((p) => p.id !== id));

  const updateQty = (id: string, qty: number) =>
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, qty } : p))
    );

  const clear = () => setItems([]);

  const subtotal = useMemo(
    () => items.reduce((s, it) => s + it.price * it.qty, 0),
    [items]
  );

  const value: CartState = { items, addItem, removeItem, updateQty, clear, subtotal, clearCart: clear };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
