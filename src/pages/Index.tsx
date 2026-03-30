import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

/* ─── Images ─────────────────────────────────────────────────────── */
const IMG = {
  hero:       "https://cdn.poehali.dev/projects/e6309206-2dbb-4076-919d-e77eaf57bc28/files/13d6f67d-742f-4a22-a8aa-cf5f23df700e.jpg",
  gift:       "https://cdn.poehali.dev/projects/e6309206-2dbb-4076-919d-e77eaf57bc28/files/f8633c2b-ae65-4ef4-b82e-38f6c7c347b7.jpg",
  assortment: "https://cdn.poehali.dev/projects/e6309206-2dbb-4076-919d-e77eaf57bc28/files/c985cc89-33ed-4721-ad0d-88540a40822f.jpg",
};

/* ─── Products ───────────────────────────────────────────────────── */
const PRODUCTS = [
  { id: 1, name: "Подарок «Овечка»",       price:  1890, type: "шоколад",  weightG: 350, weight: "350 г", image: IMG.gift,       badge: "Хит",    desc: "Шоколадные фигурки, мармелад, конфеты" },
  { id: 2, name: "Набор «Сладкий снег»",   price:  2990, type: "мармелад", weightG: 500, weight: "500 г", image: IMG.assortment, badge: "Новинка", desc: "Мармелад, зефир, маршмеллоу" },
  { id: 3, name: "Корзинка «Новый год»",   price:  4850, type: "ассорти",  weightG: 700, weight: "700 г", image: IMG.gift,       badge: "",        desc: "Шоколад, карамель, мармелад, орехи" },
  { id: 4, name: "Мини-набор «Барашек»",   price:   990, type: "мармелад", weightG: 200, weight: "200 г", image: IMG.assortment, badge: "Малышам", desc: "Мягкий мармелад без красителей" },
  { id: 5, name: "Подарок «Праздник»",     price: 12200, type: "шоколад",  weightG: 900, weight: "900 г", image: IMG.hero,       badge: "Премиум", desc: "Бельгийский шоколад, трюфели, конфеты" },
  { id: 6, name: "Набор «Зимняя сказка»",  price:  3100, type: "карамель", weightG: 400, weight: "400 г", image: IMG.assortment, badge: "",        desc: "Леденцы, карамель, шоколадные монеты" },
];

const FREE_DELIVERY = 30_000;

/* ─── Decorative constants ───────────────────────────────────────── */
const SNOWFLAKES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left:     `${(i * 5.3 + 2) % 100}%`,
  size:     `${(i % 3) * 5 + 9}px`,
  delay:    `${(i * 0.55) % 9}s`,
  duration: `${(i % 4) * 2.5 + 9}s`,
  char:     ["❄", "❅", "❆"][i % 3],
}));

const GARLAND = [
  "#d4a017","#8b2318","#6b3a1f","#d4a017","#c4935a","#8b2318",
  "#d4a017","#6b3a1f","#c4935a","#d4a017","#8b2318","#6b3a1f",
  "#d4a017","#c4935a","#8b2318","#d4a017","#6b3a1f","#c4935a",
  "#d4a017","#8b2318","#6b3a1f","#d4a017","#c4935a","#8b2318",
  "#d4a017","#6b3a1f","#c4935a","#d4a017",
];

type Page = "home" | "catalog" | "delivery" | "contacts" | "cart" | "about";

/* ─── Styles ─────────────────────────────────────────────────────── */
const C = {
  dark:  "#2c1a0e",
  brown: "#6b3a1f",
  wood:  "#9b6a3a",
  tan:   "#c4935a",
  cream: "#f5ead8",
  gold:  "#d4a017",
  red:   "#8b2318",
  sand:  "#e8d5b0",
};

/* ─── Components ─────────────────────────────────────────────────── */
function Snowflakes() {
  return (
    <>
      {SNOWFLAKES.map((s) => (
        <span key={s.id} style={{
          position: "fixed", left: s.left, top: "-30px",
          fontSize: s.size, pointerEvents: "none", zIndex: 0,
          animation: `snow-fall ${s.duration} ${s.delay} linear infinite`,
          color: C.tan, opacity: 0.5,
        }}>{s.char}</span>
      ))}
    </>
  );
}

function Garland() {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", width: "100%", overflow: "hidden" }}>
      {GARLAND.map((color, i) => (
        <span key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ width: 1, height: `${7 + Math.sin(i * 0.75) * 5}px`, background: C.wood, display: "block" }} />
          <span style={{
            display: "inline-block", width: 10, height: 14,
            borderRadius: "50% 50% 44% 44%",
            background: color,
            boxShadow: `0 0 7px ${color}bb`,
            animation: `twinkle ${1.1 + (i % 6) * 0.25}s ease-in-out infinite`,
            animationDelay: `${i * 0.13}s`,
          }} />
        </span>
      ))}
    </div>
  );
}

function Badge({ text }: { text: string }) {
  if (!text) return null;
  return (
    <span style={{
      position: "absolute", top: 10, left: 10,
      background: C.red, color: C.cream,
      fontSize: 11, fontWeight: 700,
      padding: "3px 10px", borderRadius: 999,
      letterSpacing: "0.04em",
    }}>{text}</span>
  );
}

function ProductCard({ p, addToCart, added }: { p: typeof PRODUCTS[0]; addToCart: (id: number) => void; added: number | null }) {
  const isAdded = added === p.id;
  return (
    <div className="product-card" style={{
      background: "#fffdf7", borderRadius: 18,
      border: `1px solid ${C.sand}`,
      overflow: "hidden",
      boxShadow: "0 2px 12px rgba(44,26,14,.07)",
    }}>
      <div style={{ position: "relative", height: 190, overflow: "hidden" }}>
        <img src={p.image} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <Badge text={p.badge} />
      </div>
      <div style={{ padding: "14px 16px 16px" }}>
        <h3 style={{ fontWeight: 600, color: C.dark, marginBottom: 4, fontSize: 15 }}>{p.name}</h3>
        <p style={{ fontSize: 12, color: C.wood, marginBottom: 10 }}>{p.desc}</p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
          {[`🍬 ${p.type}`, `⚖️ ${p.weight}`].map((tag) => (
            <span key={tag} style={{ fontSize: 11, background: C.sand, color: C.brown, padding: "2px 9px", borderRadius: 999 }}>{tag}</span>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontWeight: 700, fontSize: 18, color: C.dark }}>{p.price.toLocaleString("ru")} ₽</span>
          <button onClick={() => addToCart(p.id)} style={{
            background: isAdded ? "#5a7a2e" : C.dark,
            color: C.cream, padding: "8px 18px", borderRadius: 999,
            fontSize: 13, fontWeight: 600, border: "none", cursor: "pointer",
            transform: isAdded ? "scale(0.95)" : "scale(1)",
            transition: "all .2s",
          }}>{isAdded ? "✓ Добавлено" : "В корзину"}</button>
        </div>
      </div>
    </div>
  );
}

function CartBadge({ count }: { count: number }) {
  if (!count) return null;
  return (
    <span style={{
      position: "absolute", top: -8, right: -8,
      background: C.red, color: C.cream,
      fontSize: 11, fontWeight: 700,
      borderRadius: "50%", width: 20, height: 20,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>{count}</span>
  );
}

/* ─── Main App ───────────────────────────────────────────────────── */
export default function Index() {
  const [page, setPage]           = useState<Page>("home");
  const [cart, setCart]           = useState<number[]>([]);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [added, setAdded]         = useState<number | null>(null);
  const [maxPrice, setMaxPrice]   = useState(15000);
  const [filterType, setFilterType] = useState("все");
  const [filterWeight, setFilterWeight] = useState("все");

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  const addToCart = (id: number) => {
    setCart((p) => [...p, id]);
    setAdded(id);
    setTimeout(() => setAdded(null), 1300);
  };

  const removeFromCart = (id: number) => {
    setCart((p) => { const i = p.indexOf(id); return i === -1 ? p : [...p.slice(0, i), ...p.slice(i + 1)]; });
  };

  const cartItems = PRODUCTS.filter((p) => cart.includes(p.id));
  const cartTotal = cartItems.reduce((s, p) => s + p.price, 0);

  const WEIGHT_RANGES = ["все", "до 300 г", "300–600 г", "600+ г"];
  const filteredProducts = PRODUCTS.filter((p) => {
    if (p.price > maxPrice) return false;
    if (filterType !== "все" && p.type !== filterType) return false;
    if (filterWeight !== "все") {
      if (filterWeight === "до 300 г"  && p.weightG >= 300) return false;
      if (filterWeight === "300–600 г" && (p.weightG < 300 || p.weightG >= 600)) return false;
      if (filterWeight === "600+ г"    && p.weightG < 600) return false;
    }
    return true;
  });

  const NAV: { id: Page; label: string }[] = [
    { id: "home",     label: "Главная"  },
    { id: "catalog",  label: "Каталог"  },
    { id: "delivery", label: "Доставка" },
    { id: "about",    label: "О нас"    },
    { id: "contacts", label: "Контакты" },
  ];

  return (
    <div className="ethno-page-bg" style={{ minHeight: "100vh", overflowX: "hidden", position: "relative", fontFamily: "'Golos Text', sans-serif" }}>
      <Snowflakes />

      {/* ── HEADER ─────────────────────────────────────────── */}
      <header className="header-wood" style={{ position: "relative", zIndex: 50, boxShadow: "0 4px 24px rgba(0,0,0,.35)" }}>
        {/* ethno stripe top */}
        <div className="ethno-stripe" />

        <div className="container mx-auto px-4 py-4" style={{ paddingBottom: 26 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {/* Logo */}
            <button onClick={() => setPage("home")} style={{ display: "flex", alignItems: "center", gap: 12, background: "none", border: "none", cursor: "pointer" }}>
              <span style={{ fontSize: 34 }}>🐑</span>
              <div>
                <div style={{ fontFamily: "'Caveat', cursive", fontSize: 23, fontWeight: 700, color: C.gold, lineHeight: 1 }}>
                  Год Овцы
                </div>
                <div style={{ fontSize: 11, color: C.tan, marginTop: 2, letterSpacing: "0.05em" }}>
                  Детские сладкие подарки
                </div>
              </div>
            </button>

            {/* Desktop nav */}
            <nav style={{ display: "flex", alignItems: "center", gap: 28 }} className="hidden md:flex">
              {NAV.map((n) => (
                <button key={n.id} onClick={() => setPage(n.id)} style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontSize: 14, fontWeight: page === n.id ? 700 : 500,
                  color: page === n.id ? C.gold : C.tan,
                  borderBottom: page === n.id ? `2px solid ${C.gold}` : "2px solid transparent",
                  paddingBottom: 2, transition: "color .2s",
                }}>{n.label}</button>
              ))}
              <button onClick={() => setPage("cart")} style={{
                position: "relative", background: C.gold, border: "none", borderRadius: "50%",
                width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
              }}>
                <Icon name="ShoppingCart" size={17} />
                <CartBadge count={cart.length} />
              </button>
            </nav>

            {/* Mobile */}
            <div className="flex md:hidden items-center gap-3">
              <button onClick={() => setPage("cart")} style={{ position: "relative", background: C.gold, border: "none", borderRadius: "50%", width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <Icon name="ShoppingCart" size={17} />
                <CartBadge count={cart.length} />
              </button>
              <button onClick={() => setMenuOpen(!menuOpen)} style={{ color: C.cream, background: "none", border: "none", cursor: "pointer" }}>
                <Icon name={menuOpen ? "X" : "Menu"} size={24} />
              </button>
            </div>
          </div>

          {menuOpen && (
            <div className="md:hidden" style={{ marginTop: 12, borderTop: `1px solid ${C.brown}`, paddingTop: 12, display: "flex", flexDirection: "column", gap: 4 }}>
              {NAV.map((n) => (
                <button key={n.id} onClick={() => { setPage(n.id); setMenuOpen(false); }} style={{
                  background: page === n.id ? C.gold : "transparent",
                  color: page === n.id ? C.dark : C.tan,
                  border: "none", cursor: "pointer", textAlign: "left",
                  padding: "8px 12px", borderRadius: 10, fontSize: 14, fontWeight: 500,
                }}>{n.label}</button>
              ))}
            </div>
          )}
        </div>

        {/* Garland at bottom of header */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
          <Garland />
        </div>
      </header>

      {/* ── PAGES ──────────────────────────────────────────── */}
      <main style={{ position: "relative", zIndex: 10 }}>
        {page === "home"     && <HomePage setPage={setPage} addToCart={addToCart} added={added} />}
        {page === "catalog"  && <CatalogPage addToCart={addToCart} added={added} maxPrice={maxPrice} setMaxPrice={setMaxPrice} filterType={filterType} setFilterType={setFilterType} filterWeight={filterWeight} setFilterWeight={setFilterWeight} filteredProducts={filteredProducts} weightRanges={WEIGHT_RANGES} />}
        {page === "delivery" && <DeliveryPage />}
        {page === "about"    && <AboutPage />}
        {page === "contacts" && <ContactsPage />}
        {page === "cart"     && <CartPage cartItems={cartItems} cartTotal={cartTotal} removeFromCart={removeFromCart} setPage={setPage} />}
      </main>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer style={{ background: C.dark, color: C.tan, padding: "32px 0", marginTop: 72, position: "relative", zIndex: 10 }}>
        <div className="ethno-stripe" style={{ position: "absolute", top: 0, left: 0, right: 0 }} />
        <div className="container mx-auto px-4 text-center" style={{ paddingTop: 12 }}>
          <div style={{ fontFamily: "'Caveat', cursive", fontSize: 22, color: C.gold, marginBottom: 6 }}>🐑 Год Овцы</div>
          <p style={{ fontSize: 13 }}>Детские сладкие новогодние подарки</p>
          <p style={{ fontSize: 11, color: C.brown, marginTop: 4 }}>© 2015 · Все права защищены</p>
        </div>
      </footer>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   HOME PAGE
════════════════════════════════════════════════════════ */
function HomePage({ setPage, addToCart, added }: { setPage: (p: Page) => void; addToCart: (id: number) => void; added: number | null }) {
  return (
    <div>
      {/* Hero */}
      <section style={{
        background: `linear-gradient(135deg, ${C.dark} 0%, #3d2410 55%, #1e0f06 100%)`,
        color: "white", position: "relative", overflow: "hidden",
      }}>
        {/* Decorative ethno dots */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.06, pointerEvents: "none" }}>
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} style={{ position: "absolute", fontSize: 28, left: `${(i * 4.3) % 100}%`, top: `${(i * 6.7) % 100}%` }}>
              {["✦", "◆", "❋", "✿"][i % 4]}
            </span>
          ))}
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24" style={{ position: "relative", display: "flex", flexWrap: "wrap", gap: 40, alignItems: "center" }}>
          <div className="animate-fade-up" style={{ flex: "1 1 300px" }}>
            <div style={{
              display: "inline-block", background: C.gold, color: C.dark,
              fontSize: 11, fontWeight: 700, padding: "4px 14px", borderRadius: 999,
              marginBottom: 18, textTransform: "uppercase", letterSpacing: "0.08em",
            }}>🐑 Год Овцы · 2015</div>

            <h1 style={{
              fontFamily: "'Caveat', cursive",
              fontSize: "clamp(2.6rem, 6vw, 3.6rem)",
              fontWeight: 700, lineHeight: 1.15, marginBottom: 18, color: C.cream,
            }}>
              Сладкие подарки<br />
              <span style={{ color: C.gold }}>в традиционном стиле</span>
            </h1>

            <p style={{ color: C.tan, fontSize: 16, marginBottom: 32, maxWidth: 400, lineHeight: 1.7 }}>
              Новогодние наборы с символом года — ручная упаковка в этно-стиле, натуральные сладости, тепло традиций
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <button onClick={() => setPage("catalog")} style={{ background: C.gold, color: C.dark, padding: "12px 32px", borderRadius: 999, fontWeight: 700, fontSize: 15, border: "none", cursor: "pointer" }}>
                Смотреть каталог
              </button>
              <button onClick={() => setPage("delivery")} style={{ background: "transparent", color: C.gold, padding: "12px 30px", borderRadius: 999, fontWeight: 600, fontSize: 15, border: `2px solid ${C.gold}`, cursor: "pointer" }}>
                Доставка
              </button>
            </div>
          </div>

          <div className="animate-sway" style={{ flexShrink: 0, width: "clamp(180px, 28vw, 270px)" }}>
            <img src={IMG.hero} alt="Подарок" style={{ width: "100%", borderRadius: 20, boxShadow: "0 24px 60px rgba(0,0,0,.5)", border: `4px solid ${C.gold}` }} />
          </div>
        </div>
      </section>

      {/* Badges row */}
      <section className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "🎁", title: "Этно-упаковка",    desc: "Ручная работа, народные узоры" },
            { icon: "🚚", title: "Доставка",          desc: "Бесплатно от 30 000 ₽" },
            { icon: "🍬", title: "Натуральный состав",desc: "Без вредных красителей" },
            { icon: "🌿", title: "Из дерева и льна",  desc: "Эко-материалы в упаковке" },
          ].map((item, i) => (
            <div key={i} style={{ background: "#fffdf7", borderRadius: 16, padding: "18px 14px", textAlign: "center", border: `1px solid ${C.sand}` }}>
              <div style={{ fontSize: 26, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontWeight: 600, fontSize: 13, color: C.dark }}>{item.title}</div>
              <div style={{ fontSize: 11, color: C.wood, marginTop: 4 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="container mx-auto px-4 pb-12">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
          <h2 style={{ fontFamily: "'Caveat', cursive", fontSize: 38, color: C.dark }}>⭐ Популярные подарки</h2>
          <button onClick={() => setPage("catalog")} style={{ fontSize: 13, color: C.brown, fontWeight: 600, background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
            Весь каталог <Icon name="ArrowRight" size={15} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRODUCTS.slice(0, 3).map((p) => (
            <ProductCard key={p.id} p={p} addToCart={addToCart} added={added} />
          ))}
        </div>
      </section>

      {/* Banner */}
      <section className="mx-4 md:mx-auto md:container mb-14" style={{ background: `linear-gradient(135deg, ${C.red}, #5e1610)`, borderRadius: 22, overflow: "hidden" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 24, padding: "32px 36px" }}>
          <img src={IMG.assortment} alt="Ассорти" style={{ width: 200, height: 150, objectFit: "cover", borderRadius: 14, flexShrink: 0 }} />
          <div style={{ color: "white" }}>
            <h3 style={{ fontFamily: "'Caveat', cursive", fontSize: 30, fontWeight: 700, marginBottom: 8 }}>Успейте до 25 декабря</h3>
            <p style={{ color: "#ffbfbf", marginBottom: 16, fontSize: 14, lineHeight: 1.6 }}>
              Бесплатная доставка при заказе от 30 000 ₽.<br />Все подарки упакованы в традиционном этно-стиле.
            </p>
            <button onClick={() => setPage("catalog")} style={{ background: C.gold, color: C.dark, padding: "10px 26px", borderRadius: 999, fontWeight: 600, border: "none", cursor: "pointer" }}>
              Выбрать подарки
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   CATALOG PAGE
════════════════════════════════════════════════════════ */
function CatalogPage({ addToCart, added, maxPrice, setMaxPrice, filterType, setFilterType, filterWeight, setFilterWeight, filteredProducts, weightRanges }: {
  addToCart: (id: number) => void; added: number | null;
  maxPrice: number; setMaxPrice: (v: number) => void;
  filterType: string; setFilterType: (v: string) => void;
  filterWeight: string; setFilterWeight: (v: string) => void;
  filteredProducts: typeof PRODUCTS;
  weightRanges: string[];
}) {
  const TYPES = ["все", "шоколад", "мармелад", "карамель", "ассорти"];
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 style={{ fontFamily: "'Caveat', cursive", fontSize: 44, color: C.dark, marginBottom: 28 }}>🎄 Каталог подарков</h1>

      {/* Filters */}
      <div style={{ background: "#fffdf7", borderRadius: 18, padding: "20px 24px", marginBottom: 28, border: `1px solid ${C.sand}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18, fontWeight: 600, color: C.dark }}>
          <Icon name="SlidersHorizontal" size={17} /> Фильтры
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Price */}
          <div>
            <label style={{ fontSize: 13, color: C.wood, display: "block", marginBottom: 8 }}>
              Цена до: <strong style={{ color: C.dark }}>{maxPrice.toLocaleString("ru")} ₽</strong>
            </label>
            <input type="range" min={500} max={15000} step={500} value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              style={{ width: "100%", accentColor: C.dark }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#aaa", marginTop: 4 }}>
              <span>500 ₽</span><span>15 000 ₽</span>
            </div>
          </div>

          {/* Type */}
          <div>
            <label style={{ fontSize: 13, color: C.wood, display: "block", marginBottom: 8 }}>Тип сладостей</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {TYPES.map((t) => (
                <button key={t} onClick={() => setFilterType(t)} style={{
                  padding: "4px 12px", borderRadius: 999, fontSize: 13, fontWeight: 500,
                  border: "none", cursor: "pointer",
                  background: filterType === t ? C.dark : C.sand,
                  color: filterType === t ? C.cream : C.brown,
                }}>{t.charAt(0).toUpperCase() + t.slice(1)}</button>
              ))}
            </div>
          </div>

          {/* Weight */}
          <div>
            <label style={{ fontSize: 13, color: C.wood, display: "block", marginBottom: 8 }}>Вес набора</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {weightRanges.map((w) => (
                <button key={w} onClick={() => setFilterWeight(w)} style={{
                  padding: "4px 12px", borderRadius: 999, fontSize: 13, fontWeight: 500,
                  border: "none", cursor: "pointer",
                  background: filterWeight === w ? C.red : C.sand,
                  color: filterWeight === w ? "white" : C.brown,
                }}>{w.charAt(0).toUpperCase() + w.slice(1)}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ fontSize: 13, color: C.wood, marginBottom: 18 }}>
        Найдено: <strong style={{ color: C.dark }}>{filteredProducts.length}</strong> подарков
      </div>

      {filteredProducts.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 0" }}>
          <div style={{ fontSize: 52, marginBottom: 14 }}>🔍</div>
          <p style={{ color: C.wood }}>По выбранным фильтрам ничего не найдено</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} p={p} addToCart={addToCart} added={added} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   DELIVERY PAGE
════════════════════════════════════════════════════════ */
function DeliveryPage() {
  const items = [
    { icon: "🏙️", title: "Курьер по городу",  desc: "Доставка за 1-2 дня. Бесплатно от 30 000 ₽, иначе 500 ₽.", time: "1–2 дня" },
    { icon: "📦", title: "Самовывоз",           desc: "Заберите заказ из нашего шоурума. Адрес уточняйте при заказе.", time: "В день заказа" },
    { icon: "🌍", title: "По России (СДЭК)",    desc: "Отправляем в любой город. Срок зависит от региона.", time: "3–7 дней" },
    { icon: "🎄", title: "Экспресс к Новому году", desc: "20–31 декабря — приоритетная обработка. Торопитесь!", time: "В день заказа" },
  ];
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 style={{ fontFamily: "'Caveat', cursive", fontSize: 44, color: C.dark, marginBottom: 30 }}>🚚 Доставка</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ maxWidth: 740 }}>
        {items.map((item, i) => (
          <div key={i} style={{ background: "#fffdf7", borderRadius: 18, padding: 24, border: `1px solid ${C.sand}` }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>{item.icon}</div>
            <h3 style={{ fontWeight: 600, color: C.dark, fontSize: 16, marginBottom: 8 }}>{item.title}</h3>
            <p style={{ color: C.wood, fontSize: 14, marginBottom: 12, lineHeight: 1.6 }}>{item.desc}</p>
            <span style={{ fontSize: 12, background: C.sand, color: C.brown, fontWeight: 600, padding: "4px 12px", borderRadius: 999 }}>⏱ {item.time}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 28, maxWidth: 740, background: C.dark, borderRadius: 18, padding: 24, color: C.cream }}>
        <h3 style={{ fontFamily: "'Caveat', cursive", fontSize: 26, color: C.gold, marginBottom: 12 }}>🎁 Важно знать</h3>
        <ul style={{ color: C.tan, fontSize: 14, lineHeight: 2.1 }}>
          <li>• Все подарки упакованы вручную в этно-стиле</li>
          <li>• Возможна именная открытка с поздравлением</li>
          <li>• Оплата онлайн или при получении</li>
          <li>• Бесплатная доставка при сумме заказа от <strong style={{ color: C.gold }}>30 000 ₽</strong></li>
        </ul>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   ABOUT PAGE
════════════════════════════════════════════════════════ */
function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 style={{ fontFamily: "'Caveat', cursive", fontSize: 44, color: C.dark, marginBottom: 30 }}>🐑 О нас</h1>
      <div style={{ maxWidth: 680 }}>
        <div style={{ background: "#fffdf7", borderRadius: 18, padding: 24, border: `1px solid ${C.sand}`, marginBottom: 20 }}>
          <img src={IMG.assortment} alt="О нас" style={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 14, marginBottom: 20 }} />
          <p style={{ color: C.wood, lineHeight: 1.8, marginBottom: 12 }}>
            «Год Овцы» — авторский проект новогодних подарков для детей, вдохновлённый народными традициями и теплом зимних праздников.
          </p>
          <p style={{ color: C.wood, lineHeight: 1.8 }}>
            Каждый набор упакован вручную с использованием льна, дерева и природных материалов. Символ года — добрая овечка — украшает каждую коробку.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { num: "500+", label: "Довольных семей" },
            { num: "6",    label: "Видов наборов"   },
            { num: "100%", label: "Ручная упаковка"  },
          ].map((s, i) => (
            <div key={i} style={{ background: C.dark, borderRadius: 16, padding: "16px 12px", textAlign: "center" }}>
              <div style={{ fontFamily: "'Caveat', cursive", fontSize: 28, color: C.gold }}>{s.num}</div>
              <div style={{ fontSize: 11, color: C.tan, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   CONTACTS PAGE
════════════════════════════════════════════════════════ */
function ContactsPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 style={{ fontFamily: "'Caveat', cursive", fontSize: 44, color: C.dark, marginBottom: 30 }}>📞 Контакты</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{ maxWidth: 740 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            { icon: "Phone",  label: "Телефон",       value: "+7 (XXX) XXX-XX-XX" },
            { icon: "Mail",   label: "Email",          value: "info@godovtsy.ru" },
            { icon: "MapPin", label: "Адрес",          value: "г. Москва, ул. Ремесленная, 5" },
            { icon: "Clock",  label: "Режим работы",   value: "Пн–Пт 9:00–20:00, Сб 10:00–18:00" },
          ].map((c, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14, background: "#fffdf7", borderRadius: 16, padding: 16, border: `1px solid ${C.sand}` }}>
              <div style={{ width: 40, height: 40, background: C.dark, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon name={c.icon} size={17} style={{ color: C.gold }} />
              </div>
              <div>
                <div style={{ fontSize: 11, color: C.wood, marginBottom: 2 }}>{c.label}</div>
                <div style={{ fontWeight: 500, color: C.dark }}>{c.value}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: "#fffdf7", borderRadius: 18, padding: 24, border: `1px solid ${C.sand}` }}>
          <h3 style={{ fontWeight: 600, color: C.dark, marginBottom: 16 }}>Написать нам</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <input type="text" placeholder="Ваше имя" style={{ border: `1px solid ${C.sand}`, borderRadius: 12, padding: "10px 14px", fontSize: 14, outline: "none", background: C.cream }} />
            <input type="tel" placeholder="Телефон" style={{ border: `1px solid ${C.sand}`, borderRadius: 12, padding: "10px 14px", fontSize: 14, outline: "none", background: C.cream }} />
            <textarea placeholder="Сообщение" rows={3} style={{ border: `1px solid ${C.sand}`, borderRadius: 12, padding: "10px 14px", fontSize: 14, outline: "none", resize: "none", background: C.cream }} />
            <button style={{ background: C.dark, color: C.cream, padding: "11px 0", borderRadius: 12, fontWeight: 600, border: "none", cursor: "pointer" }}>Отправить</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   CART PAGE
════════════════════════════════════════════════════════ */
function CartPage({ cartItems, cartTotal, removeFromCart, setPage }: {
  cartItems: typeof PRODUCTS; cartTotal: number;
  removeFromCart: (id: number) => void; setPage: (p: Page) => void;
}) {
  if (!cartItems.length) {
    return (
      <div style={{ textAlign: "center", padding: "80px 16px" }}>
        <div style={{ fontSize: 56, marginBottom: 14 }}>🛒</div>
        <h2 style={{ fontFamily: "'Caveat', cursive", fontSize: 40, color: C.dark, marginBottom: 12 }}>Корзина пуста</h2>
        <p style={{ color: C.wood, marginBottom: 24 }}>Выберите подарки в каталоге</p>
        <button onClick={() => setPage("catalog")} style={{ background: C.dark, color: C.cream, padding: "12px 32px", borderRadius: 999, fontWeight: 600, border: "none", cursor: "pointer" }}>
          Перейти в каталог
        </button>
      </div>
    );
  }

  const left = Math.max(0, FREE_DELIVERY - cartTotal);

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 style={{ fontFamily: "'Caveat', cursive", fontSize: 44, color: C.dark, marginBottom: 28 }}>🛒 Корзина</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {cartItems.map((p, idx) => (
            <div key={`${p.id}-${idx}`} style={{ background: "#fffdf7", borderRadius: 16, padding: 14, display: "flex", alignItems: "center", gap: 14, border: `1px solid ${C.sand}` }}>
              <img src={p.image} alt={p.name} style={{ width: 64, height: 64, borderRadius: 12, objectFit: "cover", flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, color: C.dark, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</div>
                <div style={{ fontSize: 12, color: C.wood, marginTop: 2 }}>{p.weight} · {p.type}</div>
              </div>
              <div style={{ fontWeight: 700, color: C.dark, whiteSpace: "nowrap" }}>{p.price.toLocaleString("ru")} ₽</div>
              <button onClick={() => removeFromCart(p.id)}
                style={{ color: "#ccc", background: "none", border: "none", cursor: "pointer", marginLeft: 6 }}
                onMouseOver={(e) => (e.currentTarget.style.color = C.red)}
                onMouseOut={(e) => (e.currentTarget.style.color = "#ccc")}>
                <Icon name="X" size={18} />
              </button>
            </div>
          ))}
        </div>

        <div>
          <div style={{ background: "#fffdf7", borderRadius: 18, padding: 22, border: `1px solid ${C.sand}`, position: "sticky", top: 16 }}>
            <h3 style={{ fontWeight: 600, color: C.dark, marginBottom: 16 }}>Итого</h3>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: C.wood, marginBottom: 8 }}>
              <span>Товаров:</span><span>{cartItems.length} шт.</span>
            </div>

            {left === 0 ? (
              <div style={{ fontSize: 12, color: "#3a7d34", background: "#f0fdf0", borderRadius: 10, padding: "8px 12px", marginBottom: 14 }}>
                🎉 Бесплатная доставка!
              </div>
            ) : (
              <div style={{ fontSize: 12, color: C.wood, background: C.sand, borderRadius: 10, padding: "8px 12px", marginBottom: 14 }}>
                До бесплатной доставки: <strong style={{ color: C.dark }}>{left.toLocaleString("ru")} ₽</strong>
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 19, color: C.dark, borderTop: `1px solid ${C.sand}`, paddingTop: 14, marginBottom: 18 }}>
              <span>Сумма:</span><span>{cartTotal.toLocaleString("ru")} ₽</span>
            </div>

            <button style={{ width: "100%", background: C.gold, color: C.dark, padding: "13px 0", borderRadius: 12, fontWeight: 700, fontSize: 15, border: "none", cursor: "pointer" }}>
              Оформить заказ
            </button>
            <button onClick={() => setPage("catalog")} style={{ width: "100%", marginTop: 8, fontSize: 13, color: C.brown, background: "none", border: "none", cursor: "pointer", padding: "8px 0" }}>
              Продолжить покупки
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
