import { Search, Heart, ShoppingBag, User, Menu, LayoutDashboard, LogOut, LogIn } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useRef, useEffect } from "react";

interface HeaderProps {
  cartCount: number;
  onCartOpen: () => void;
}

export function Header({ cartCount, onCartOpen }: HeaderProps) {
  const { user, isAdmin, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="glass-strong border-b border-border/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="h-8 w-8 rounded-xl bg-primary grid place-items-center">
              <span className="text-primary-foreground font-bold text-sm">N</span>
            </div>
            <span className="font-display font-semibold text-lg tracking-tight hidden sm:inline">
              Noir
            </span>
          </Link>

          <div className="flex-1 max-w-xl mx-auto">
            <div className="group relative">
              <div className="glass flex items-center gap-2 rounded-full border border-border/80 px-4 h-11 shadow-soft transition-all focus-within:border-primary/40 focus-within:shadow-card">
                <Search className="h-4 w-4 text-muted-foreground shrink-0" strokeWidth={1.75} />
                <input
                  type="search"
                  placeholder="Search products, brands and more"
                  className="flex-1 bg-transparent text-sm placeholder:text-muted-foreground outline-none"
                />
                <kbd className="hidden sm:inline-flex h-6 px-1.5 items-center text-[10px] font-medium text-muted-foreground bg-muted rounded-md border border-border">
                  ⌘K
                </kbd>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {isAdmin && (
              <Link
                to="/admin"
                aria-label="Admin"
                className="hidden sm:grid h-10 w-10 place-items-center rounded-full hover:bg-muted transition-colors"
                title="Admin dashboard"
              >
                <LayoutDashboard className="h-5 w-5" strokeWidth={1.5} />
              </Link>
            )}
            <button
              aria-label="Wishlist"
              className="hidden sm:grid h-10 w-10 place-items-center rounded-full hover:bg-muted transition-colors"
            >
              <Heart className="h-5 w-5" strokeWidth={1.5} />
            </button>
            <button
              aria-label="Cart"
              onClick={onCartOpen}
              className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-muted transition-colors"
            >
              <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 h-4 min-w-4 px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold grid place-items-center animate-scale-in">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Profile menu */}
            <div className="relative" ref={menuRef}>
              <button
                aria-label="Profile"
                onClick={() => setMenuOpen((v) => !v)}
                className="hidden sm:grid h-10 w-10 place-items-center rounded-full hover:bg-muted transition-colors"
              >
                <User className="h-5 w-5" strokeWidth={1.5} />
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-border bg-popover shadow-lift overflow-hidden">
                  {user ? (
                    <>
                      <div className="px-4 py-3 border-b border-border">
                        <p className="text-xs text-muted-foreground">Signed in as</p>
                        <p className="text-sm font-medium truncate">{user.email}</p>
                      </div>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-muted"
                        >
                          <LayoutDashboard className="h-4 w-4" /> Admin
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          setMenuOpen(false);
                          signOut();
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-muted text-left"
                      >
                        <LogOut className="h-4 w-4" /> Sign out
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/auth"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-muted"
                    >
                      <LogIn className="h-4 w-4" /> Sign in
                    </Link>
                  )}
                </div>
              )}
            </div>

            <button
              aria-label="Menu"
              className="sm:hidden grid h-10 w-10 place-items-center rounded-full hover:bg-muted transition-colors"
            >
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
