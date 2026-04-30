import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useEffect } from "react";
import type { Product } from "./data";

export type CartItem = Product & { qty: number };

interface Props {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onQty: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

export function CartDrawer({ open, onClose, items, onQty, onRemove }: Props) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-full sm:w-[420px] bg-background shadow-lift transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 h-16 border-b border-border">
          <h3 className="font-display font-semibold text-lg">Your Cart</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="h-9 w-9 grid place-items-center rounded-full hover:bg-muted transition-colors"
          >
            <X className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-20">
              <div className="h-16 w-16 rounded-full bg-surface grid place-items-center">
                <ShoppingBag className="h-7 w-7 text-muted-foreground" strokeWidth={1.5} />
              </div>
              <div>
                <div className="font-medium">Your cart is empty</div>
                <div className="text-sm text-muted-foreground mt-1">Add some products to get started.</div>
              </div>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((it) => (
                <li key={it.id} className="flex gap-4 p-3 rounded-2xl hover:bg-surface transition-colors">
                  <div className="h-20 w-20 rounded-xl overflow-hidden bg-surface shrink-0">
                    <img src={it.image} alt={it.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    {it.brand && <div className="text-xs text-muted-foreground">{it.brand}</div>}
                    <div className="text-sm font-medium truncate">{it.name}</div>
                    <div className="font-display font-semibold text-sm mt-1">${it.price}</div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center bg-surface rounded-full">
                        <button
                          onClick={() => onQty(it.id, -1)}
                          className="h-7 w-7 grid place-items-center rounded-full hover:bg-muted"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-xs font-medium w-6 text-center">{it.qty}</span>
                        <button
                          onClick={() => onQty(it.id, 1)}
                          className="h-7 w-7 grid place-items-center rounded-full hover:bg-muted"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => onRemove(it.id)}
                        className="text-xs text-muted-foreground hover:text-destructive ml-auto"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border p-6 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-display font-semibold text-lg">${subtotal.toFixed(2)}</span>
            </div>
            <div className="text-xs text-muted-foreground">Shipping and taxes calculated at checkout.</div>
            <button className="btn-glossy w-full h-12 rounded-full text-primary-foreground font-medium text-sm transition-transform hover:scale-[1.01] active:scale-[0.99]">
              Checkout
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
