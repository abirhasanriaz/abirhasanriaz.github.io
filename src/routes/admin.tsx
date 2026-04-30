import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Plus, Pencil, Trash2, ArrowLeft, Upload, X, Package, ShoppingCart } from "lucide-react";
import { categories } from "@/components/marketplace/data";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({ meta: [{ title: "Admin — Riaz Digital Store" }] }),
});

type OrderRow = {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string | null;
  shipping_address: string;
  shipping_city: string | null;
  shipping_country: string | null;
  total_amount: number;
  currency: string;
  status: string;
};

type OrderItemRow = {
  id: string;
  product_name: string;
  product_image: string | null;
  quantity: number;
  unit_price: number;
  subtotal: number;
};

const ORDER_STATUSES = ["pending", "paid", "shipped", "delivered", "cancelled"] as const;

type ProductRow = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  compare_at_price: number | null;
  image_url: string | null;
  category: string | null;
  stock: number;
  is_published: boolean;
};

type FormState = {
  name: string;
  slug: string;
  description: string;
  price: number;
  compare_at_price: number | null;
  image_url: string;
  category: string;
  stock: number;
  is_published: boolean;
};

const blank: FormState = {
  name: "",
  slug: "",
  description: "",
  price: 0,
  compare_at_price: null,
  image_url: "",
  category: "Electronics",
  stock: 10,
  is_published: true,
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function AdminPage() {
  const navigate = useNavigate();
  const { user, isAdmin, loading } = useAuth();
  const [tab, setTab] = useState<"products" | "orders">("products");

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate({ to: "/auth" });
    } else if (!isAdmin) {
      toast.error("Admin access required");
      navigate({ to: "/" });
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading || !user || !isAdmin) {
    return (
      <div className="min-h-screen grid place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="h-9 w-9 grid place-items-center rounded-full hover:bg-muted">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <h1 className="font-display font-semibold text-lg">Admin</h1>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 flex gap-1 -mb-px">
          {[
            { id: "products" as const, label: "Products", Icon: Package },
            { id: "orders" as const, label: "Orders", Icon: ShoppingCart },
          ].map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-2 px-4 h-11 text-sm font-medium border-b-2 transition-colors ${
                tab === id
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" /> {label}
            </button>
          ))}
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
        {tab === "products" ? <ProductsTab /> : <OrdersTab />}
      </main>
    </div>
  );
}

function ProductsTab() {
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [busy, setBusy] = useState(false);
  const [editing, setEditing] = useState<ProductRow | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setBusy(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    else setProducts((data as ProductRow[]) || []);
    setBusy(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("Product deleted");
      load();
    }
  }

  return (
    <>
      <div className="flex justify-end mb-6">
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="btn-glossy h-10 px-4 rounded-full text-primary-foreground text-sm font-medium flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> New product
        </button>
      </div>

      {busy ? (
        <div className="py-20 grid place-items-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : products.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-muted-foreground">No products yet. Click "New product" to create your first one.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((p) => (
            <div key={p.id} className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="aspect-square bg-muted relative">
                {p.image_url ? (
                  <img src={p.image_url} alt={p.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full grid place-items-center text-muted-foreground text-xs">
                    No image
                  </div>
                )}
                {!p.is_published && (
                  <div className="absolute top-3 left-3 bg-background/90 backdrop-blur px-2 py-1 rounded-full text-[10px] font-medium">
                    Draft
                  </div>
                )}
              </div>
              <div className="p-4">
                <p className="text-xs text-muted-foreground">{p.category}</p>
                <h3 className="font-medium text-sm truncate mt-0.5">{p.name}</h3>
                <div className="flex items-baseline justify-between mt-2">
                  <span className="font-display font-semibold">${Number(p.price).toFixed(2)}</span>
                  <span className="text-xs text-muted-foreground">Stock: {p.stock}</span>
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => {
                      setEditing(p);
                      setShowForm(true);
                    }}
                    className="flex-1 h-9 rounded-full border border-border text-xs font-medium flex items-center justify-center gap-1.5 hover:bg-muted"
                  >
                    <Pencil className="h-3 w-3" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="h-9 w-9 rounded-full border border-border grid place-items-center hover:bg-destructive hover:text-destructive-foreground hover:border-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <ProductForm
          initial={editing}
          onClose={() => setShowForm(false)}
          onSaved={() => {
            setShowForm(false);
            load();
          }}
        />
      )}
    </>
  );
}

function OrdersTab() {
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [busy, setBusy] = useState(false);
  const [openOrder, setOpenOrder] = useState<OrderRow | null>(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setBusy(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    else setOrders((data as OrderRow[]) || []);
    setBusy(false);
  }

  async function updateStatus(id: string, status: string) {
    const { error } = await supabase.from("orders").update({ status }).eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("Order updated");
      load();
    }
  }

  const totalRevenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((s, o) => s + Number(o.total_amount), 0);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total orders", value: orders.length.toString() },
          { label: "Pending", value: orders.filter((o) => o.status === "pending").length.toString() },
          { label: "Shipped", value: orders.filter((o) => o.status === "shipped").length.toString() },
          { label: "Revenue", value: `$${totalRevenue.toFixed(2)}` },
        ].map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-2xl p-4">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="font-display text-xl font-semibold mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      {busy ? (
        <div className="py-20 grid place-items-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : orders.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-muted-foreground">No orders yet.</p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="text-left px-4 py-3 font-medium">Order</th>
                  <th className="text-left px-4 py-3 font-medium">Customer</th>
                  <th className="text-left px-4 py-3 font-medium">Date</th>
                  <th className="text-right px-4 py-3 font-medium">Total</th>
                  <th className="text-left px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-muted/30">
                    <td className="px-4 py-3 font-mono text-xs">#{o.id.slice(0, 8)}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium">{o.full_name}</div>
                      <div className="text-xs text-muted-foreground">{o.email}</div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(o.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right font-medium">
                      ${Number(o.total_amount).toFixed(2)}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={o.status}
                        onChange={(e) => updateStatus(o.id, e.target.value)}
                        className={`text-xs rounded-full px-3 py-1 border ${statusClass(o.status)}`}
                      >
                        {ORDER_STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => setOpenOrder(o)}
                        className="text-xs font-medium hover:underline"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {openOrder && <OrderDetail order={openOrder} onClose={() => setOpenOrder(null)} />}
    </>
  );
}

function statusClass(status: string) {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-900 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-200";
    case "paid":
      return "bg-blue-100 text-blue-900 border-blue-200 dark:bg-blue-900/30 dark:text-blue-200";
    case "shipped":
      return "bg-purple-100 text-purple-900 border-purple-200 dark:bg-purple-900/30 dark:text-purple-200";
    case "delivered":
      return "bg-green-100 text-green-900 border-green-200 dark:bg-green-900/30 dark:text-green-200";
    case "cancelled":
      return "bg-red-100 text-red-900 border-red-200 dark:bg-red-900/30 dark:text-red-200";
    default:
      return "bg-muted text-foreground border-border";
  }
}

function OrderDetail({ order, onClose }: { order: OrderRow; onClose: () => void }) {
  const [items, setItems] = useState<OrderItemRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("order_items")
        .select("*")
        .eq("order_id", order.id);
      if (error) toast.error(error.message);
      else setItems((data as OrderItemRow[]) || []);
      setLoading(false);
    })();
  }, [order.id]);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm grid place-items-center p-4 overflow-y-auto">
      <div className="bg-background rounded-3xl shadow-lift w-full max-w-2xl my-8">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="font-display font-semibold text-lg">Order #{order.id.slice(0, 8)}</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {new Date(order.created_at).toLocaleString()}
            </p>
          </div>
          <button onClick={onClose} className="h-9 w-9 grid place-items-center rounded-full hover:bg-muted">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-6 space-y-5">
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Customer</p>
              <p className="font-medium">{order.full_name}</p>
              <p className="text-muted-foreground">{order.email}</p>
              {order.phone && <p className="text-muted-foreground">{order.phone}</p>}
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Shipping</p>
              <p>{order.shipping_address}</p>
              {order.shipping_city && <p>{order.shipping_city}</p>}
              {order.shipping_country && <p>{order.shipping_country}</p>}
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Items</p>
            {loading ? (
              <div className="py-6 grid place-items-center">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <div className="border border-border rounded-2xl divide-y divide-border">
                {items.map((it) => (
                  <div key={it.id} className="flex items-center gap-3 p-3">
                    <div className="h-12 w-12 rounded-lg bg-muted overflow-hidden shrink-0">
                      {it.product_image && (
                        <img src={it.product_image} alt="" className="h-full w-full object-cover" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{it.product_name}</p>
                      <p className="text-xs text-muted-foreground">
                        ${Number(it.unit_price).toFixed(2)} × {it.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-semibold">${Number(it.subtotal).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-between items-center pt-3 border-t border-border">
            <span className="font-medium">Total</span>
            <span className="font-display text-xl font-semibold">
              ${Number(order.total_amount).toFixed(2)} {order.currency}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductForm({
  initial,
  onClose,
  onSaved,
}: {
  initial: ProductRow | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState(
    initial
      ? {
          name: initial.name,
          slug: initial.slug,
          description: initial.description || "",
          price: initial.price,
          compare_at_price: initial.compare_at_price,
          image_url: initial.image_url || "",
          category: initial.category || "Electronics",
          stock: initial.stock,
          is_published: initial.is_published,
        }
      : blank
  );
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage
        .from("product-images")
        .upload(path, file, { cacheControl: "3600", upsert: false });
      if (error) throw error;
      const { data } = supabase.storage.from("product-images").getPublicUrl(path);
      setForm((f) => ({ ...f, image_url: data.publicUrl }));
      toast.success("Image uploaded");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const slug = form.slug || slugify(form.name);
      const payload = {
        name: form.name,
        slug,
        description: form.description || null,
        price: Number(form.price),
        compare_at_price: form.compare_at_price ? Number(form.compare_at_price) : null,
        image_url: form.image_url || null,
        category: form.category,
        stock: Number(form.stock),
        is_published: form.is_published,
      };
      if (initial) {
        const { error } = await supabase.from("products").update(payload).eq("id", initial.id);
        if (error) throw error;
        toast.success("Product updated");
      } else {
        const { error } = await supabase.from("products").insert(payload);
        if (error) throw error;
        toast.success("Product created");
      }
      onSaved();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm grid place-items-center p-4 overflow-y-auto">
      <div className="bg-background rounded-3xl shadow-lift w-full max-w-2xl my-8">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-display font-semibold text-lg">
            {initial ? "Edit product" : "New product"}
          </h2>
          <button onClick={onClose} className="h-9 w-9 grid place-items-center rounded-full hover:bg-muted">
            <X className="h-4 w-4" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Image</label>
              <div className="mt-2 aspect-square rounded-2xl bg-muted overflow-hidden relative border border-border">
                {form.image_url ? (
                  <img src={form.image_url} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full grid place-items-center text-xs text-muted-foreground">
                    No image
                  </div>
                )}
                {uploading && (
                  <div className="absolute inset-0 bg-background/70 grid place-items-center">
                    <Loader2 className="h-5 w-5 animate-spin" />
                  </div>
                )}
              </div>
              <label className="mt-2 cursor-pointer h-9 rounded-full border border-border text-xs font-medium flex items-center justify-center gap-1.5 hover:bg-muted">
                <Upload className="h-3.5 w-3.5" /> Upload
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </div>

            <div className="space-y-3">
              <Field label="Name" required>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input-base"
                />
              </Field>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Price ($)" required>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })}
                    className="input-base"
                  />
                </Field>
                <Field label="Compare price ($)">
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={form.compare_at_price ?? ""}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        compare_at_price: e.target.value ? parseFloat(e.target.value) : null,
                      })
                    }
                    className="input-base"
                  />
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Category">
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="input-base"
                  >
                    {categories.filter((c) => c !== "All").map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Stock">
                  <input
                    type="number"
                    min="0"
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: parseInt(e.target.value) || 0 })}
                    className="input-base"
                  />
                </Field>
              </div>
            </div>
          </div>

          <Field label="Description">
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="input-base resize-none"
            />
          </Field>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.is_published}
              onChange={(e) => setForm({ ...form, is_published: e.target.checked })}
              className="h-4 w-4 rounded"
            />
            Published (visible on store)
          </label>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-11 rounded-full border border-border text-sm font-medium hover:bg-muted"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 h-11 rounded-full btn-glossy text-primary-foreground text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              {initial ? "Save changes" : "Create product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">
        {label}
        {required && " *"}
      </span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
