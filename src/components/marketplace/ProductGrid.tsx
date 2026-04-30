import { useMemo, useState } from "react";
import { categories, products, type Product } from "./data";
import { ProductCard } from "./ProductCard";

interface Props {
  onAdd: (p: Product) => void;
}

export function ProductGrid({ onAdd }: Props) {
  const [active, setActive] = useState("All");

  const filtered = useMemo(
    () => (active === "All" ? products : products.filter((p) => p.category === active)),
    [active]
  );

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
            Trending now
          </h2>
          <p className="text-muted-foreground mt-2">Hand-picked products our customers love.</p>
        </div>

        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`shrink-0 h-9 px-4 rounded-full text-sm font-medium transition-all ${
                active === c
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "bg-surface text-foreground hover:bg-accent"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div
        key={active}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10 animate-fade-in"
      >
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={onAdd} />
        ))}
      </div>
    </section>
  );
}
