import { Home, Search, Heart, ShoppingBag, User } from "lucide-react";
import { useState } from "react";

interface Props {
  cartCount: number;
  onCartOpen: () => void;
}

export function BottomNav({ cartCount, onCartOpen }: Props) {
  const [active, setActive] = useState("home");

  const items = [
    { id: "home", icon: Home, label: "Home" },
    { id: "search", icon: Search, label: "Search" },
    { id: "wishlist", icon: Heart, label: "Wishlist" },
    { id: "cart", icon: ShoppingBag, label: "Cart", badge: cartCount },
    { id: "profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 pb-[env(safe-area-inset-bottom)]">
      <div className="mx-3 mb-3 glass-strong rounded-full shadow-lift border border-border/60">
        <div className="flex items-center justify-around h-14 px-2">
          {items.map((i) => {
            const Icon = i.icon;
            const isActive = active === i.id;
            return (
              <button
                key={i.id}
                onClick={() => {
                  setActive(i.id);
                  if (i.id === "cart") onCartOpen();
                }}
                className="relative flex-1 h-full grid place-items-center"
                aria-label={i.label}
              >
                <div
                  className={`relative h-10 w-10 grid place-items-center rounded-full transition-all ${
                    isActive ? "bg-primary text-primary-foreground scale-100" : "text-muted-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                  {i.badge ? (
                    <span className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 rounded-full bg-destructive text-destructive-foreground text-[10px] font-semibold grid place-items-center">
                      {i.badge}
                    </span>
                  ) : null}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
