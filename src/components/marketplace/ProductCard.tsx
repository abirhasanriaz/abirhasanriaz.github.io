import { Heart, Plus } from "lucide-react";
import type { Product } from "./data";

interface Props {
  product: Product;
  onAdd: (p: Product) => void;
}

export function ProductCard({ product, onAdd }: Props) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group relative flex flex-col">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-surface shadow-soft transition-all duration-500 group-hover:shadow-lift group-hover:-translate-y-1">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={800}
          height={800}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {discount > 0 && (
          <div className="absolute top-3 left-3 glass rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide">
            −{discount}%
          </div>
        )}

        <button
          aria-label="Wishlist"
          className="absolute top-3 right-3 h-9 w-9 grid place-items-center rounded-full glass-strong opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
        >
          <Heart className="h-4 w-4" strokeWidth={1.75} />
        </button>

        <button
          onClick={() => onAdd(product)}
          aria-label="Add to cart"
          className="absolute bottom-3 right-3 h-10 w-10 grid place-items-center rounded-full btn-glossy text-primary-foreground translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all hover:scale-110"
        >
          <Plus className="h-4 w-4" strokeWidth={2.5} />
        </button>
      </div>

      <div className="pt-4 px-1 space-y-1">
        <div className="text-xs text-muted-foreground">{product.brand}</div>
        <h3 className="font-medium text-sm leading-snug truncate">{product.name}</h3>
        <div className="flex items-baseline gap-2 pt-1">
          <span className="font-display font-semibold">${product.price}</span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">${product.originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
}
