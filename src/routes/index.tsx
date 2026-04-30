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
      { title: "Abir Hasan Riaz — Founder of Riaz Digital Store" },
      {
        name: "description",
        content:
          "Official website of Abir Hasan Riaz — Founder of Riaz Digital Store, a curated premium marketplace for electronics, fashion, home and lifestyle essentials.",
      },
      { name: "keywords", content: "Abir Hasan Riaz, Abir Hasan, Riaz Digital Store, Abir Riaz, Bangladesh entrepreneur, online store" },
      { name: "author", content: "Abir Hasan Riaz" },
      { property: "og:title", content: "Abir Hasan Riaz — Riaz Digital Store" },
      {
        property: "og:description",
        content: "Official site of Abir Hasan Riaz, founder of Riaz Digital Store — a curated premium marketplace.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Abir Hasan Riaz — Riaz Digital Store" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Person",
              "name": "Abir Hasan Riaz",
              "alternateName": ["Abir Hasan", "Abir Riaz"],
              "jobTitle": "Founder",
              "worksFor": { "@type": "Organization", "name": "Riaz Digital Store" },
              "description": "Founder of Riaz Digital Store, a premium curated online marketplace.",
            },
            {
              "@type": "Organization",
              "name": "Riaz Digital Store",
              "founder": { "@type": "Person", "name": "Abir Hasan Riaz" },
            },
          ],
        }),
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
