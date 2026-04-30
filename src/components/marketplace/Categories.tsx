import { Headphones, Shirt, Home as HomeIcon, Watch, Glasses, Coffee } from "lucide-react";

const items = [
  { icon: Headphones, label: "Audio" },
  { icon: Watch, label: "Watches" },
  { icon: Shirt, label: "Fashion" },
  { icon: HomeIcon, label: "Home" },
  { icon: Glasses, label: "Eyewear" },
  { icon: Coffee, label: "Lifestyle" },
];

export function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
        {items.map((it, i) => {
          const Icon = it.icon;
          return (
            <button
              key={it.label}
              className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-surface hover:bg-surface-elevated transition-all hover:-translate-y-0.5 shadow-soft hover:shadow-card animate-fade-up"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className="h-12 w-12 grid place-items-center rounded-xl bg-background shadow-soft group-hover:scale-110 transition-transform">
                <Icon className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <span className="text-xs sm:text-sm font-medium">{it.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
