import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback } from "react";
import { Header } from "@/components/marketplace/Header";
import { Hero } from "@/components/marketplace/Hero";
import { Categories } from "@/components/marketplace/Categories";
import { ProductGrid } from "@/components/marketplace/ProductGrid";
import { AboutFounder } from "@/components/marketplace/AboutFounder";
import { CartDrawer, type CartItem } from "@/components/marketplace/CartDrawer";
import { BottomNav } from "@/components/marketplace/BottomNav";
import { Footer } from "@/components/marketplace/Footer";
import type { Product } from "@/components/marketplace/data";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Riaz Digital Store — Premium Marketplace" },
      {
        name: "description",
        content:
          "Riaz Digital Store — a curated minimalist marketplace for premium electronics, fashion, home and lifestyle essentials. Free delivery, fair prices.",
      },
      { property: "og:title", content: "Riaz Digital Store — Premium Marketplace" },
      {
        property: "og:description",
        content: "Curated essentials from world-class makers. Designed for the everyday.",
      },
    ],
  }),
});

function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = useCallback((p: Product) => {
    setCart((prev) => {
      const ex = prev.find((i) => i.id === p.id);
      if (ex) return prev.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { ...p, qty: 1 }];
    });
    setCartOpen(true);
  }, []);

  const updateQty = useCallback((id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />
      <main>
        <Hero />
        <Categories />
        <ProductGrid onAdd={addToCart} />
        <AboutFounder />
      </main>
      <Footer />
      <BottomNav cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onQty={updateQty}
        onRemove={removeItem}
      />
    </div>
  );
}
