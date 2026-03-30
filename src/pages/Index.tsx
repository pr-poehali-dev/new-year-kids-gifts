import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const IMAGES = {
  hero: "https://cdn.poehali.dev/projects/e6309206-2dbb-4076-919d-e77eaf57bc28/files/13d6f67d-742f-4a22-a8aa-cf5f23df700e.jpg",
  gift: "https://cdn.poehali.dev/projects/e6309206-2dbb-4076-919d-e77eaf57bc28/files/f8633c2b-ae65-4ef4-b82e-38f6c7c347b7.jpg",
  assortment: "https://cdn.poehali.dev/projects/e6309206-2dbb-4076-919d-e77eaf57bc28/files/c985cc89-33ed-4721-ad0d-88540a40822f.jpg",
};

const PRODUCTS = [
  { id: 1, name: "Подарок «Овечка»", price: 890, age: "3-5", type: "шоколад", weight: "350г", image: IMAGES.gift, badge: "Хит", desc: "Шоколадные фигурки, мармелад, конфеты" },
  { id: 2, name: "Набор «Сладкий снег»", price: 1290, age: "6-9", type: "мармелад", weight: "500г", image: IMAGES.assortment, badge: "Новинка", desc: "Мармелад, зефир, маршмеллоу" },
  { id: 3, name: "Корзинка «Новый год»", price: 1850, age: "10+", type: "ассорти", weight: "700г", image: IMAGES.gift, badge: "", desc: "Шоколад, карамель, мармелад, орехи" },
  { id: 4, name: "Мини-набор «Барашек»", price: 590, age: "1-3", type: "мармелад", weight: "200г", image: IMAGES.assortment, badge: "Малышам", desc: "Мягкий мармелад без красителей" },
  { id: 5, name: "Подарок «Праздник»", price: 2200, age: "6-9", type: "шоколад", weight: "900г", image: IMAGES.hero, badge: "Премиум", desc: "Бельгийский шоколад, трюфели, конфеты" },
  { id: 6, name: "Набор «Зимняя сказка»", price: 1100, age: "3-5", type: "карамель", weight: "400г", image: IMAGES.assortment, badge: "", desc: "Леденцы, карамель, шоколадные монеты" },
];

const SNOWFLAKES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(i * 5.7 + 3) % 100}%`,
  size: `${(i % 3) * 5 + 9}px`,
  delay: `${(i * 0.5) % 8}s`,
  duration: `${(i % 4) * 2 + 8}s`,
  char: ["❄", "❅", "❆"][i % 3],
}));

const GARLAND_COLORS = ["#e63946","#d4a017","#2d6a4f","#e63946","#d4a017","#4361ee","#e63946","#d4a017","#2d6a4f","#e63946","#d4a017","#4361ee","#2d6a4f","#e63946","#d4a017","#2d6a4f","#4361ee","#e63946","#d4a017","#2d6a4f","#e63946","#d4a017","#4361ee","#2d6a4f"];

type Page = "home" | "catalog" | "delivery" | "contacts" | "cart" | "about";

function Garland() {
  return (
    <div className="flex items-end justify-center overflow-hidden w-full">
      {GARLAND_COLORS.map((color, i) => (
        <span key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ width: 1, height: `${8 + Math.sin(i * 0.8) * 5}px`, background: "#6aab84", display: "block" }} />
          <span
            style={{
              display: "inline-block", width: 11, height: 15,
              borderRadius: "50% 50% 45% 45%",
              background: color,
              boxShadow: `0 0 6px ${color}88`,
              animation: `twinkle ${1.2 + (i % 5) * 0.3}s ease-in-out infinite`,
              animationDelay: `${i * 0.15}s`,
            }}
          />
        </span>
      ))}
    </div>
  );
}

function Snowflakes() {
  return (
    <>
      {SNOWFLAKES.map((s) => (
        <span
          key={s.id}
          style={{
            position: "fixed", left: s.left, top: "-30px", fontSize: s.size,
            animation: `snow-fall ${s.duration} ${s.delay} linear infinite`,
            pointerEvents: "none", zIndex: 0, opacity: 0.6, color: "white",
          }}
        >
          {s.char}
        </span>
      ))}
    </>
  );
}

function CartBadge({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <span style={{ position: "absolute", top: -8, right: -8, background: "#b5271a", color: "white", fontSize: 11, borderRadius: "50%", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
      {count}
    </span>
  );
}

function ProductCard({ product: p, addToCart, added }: { product: typeof PRODUCTS[0]; addToCart: (id: number) => void; added: number | null }) {
  const isAdded = added === p.id;
  return (
    <div className="product-card bg-white rounded-2xl overflow-hidden shadow-sm border border-[#e8dcc8]">
      <div className="relative h-48 overflow-hidden">
        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
        {p.badge && (
          <span className="absolute top-3 left-3 bg-[#b5271a] text-white text-xs font-bold px-2.5 py-1 rounded-full">
            {p.badge}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-[#1a4a2e] mb-1">{p.name}</h3>
        <p className="text-xs text-gray-400 mb-2">{p.desc}</p>
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="text-xs bg-[#f0ebe0] text-[#4a3728] px-2 py-0.5 rounded-full">👶 {p.age} лет</span>
          <span className="text-xs bg-[#f0ebe0] text-[#4a3728] px-2 py-0.5 rounded-full">🍬 {p.type}</span>
          <span className="text-xs bg-[#f0ebe0] text-[#4a3728] px-2 py-0.5 rounded-full">⚖️ {p.weight}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-bold text-lg text-[#1a4a2e]">{p.price} ₽</span>
          <button
            onClick={() => addToCart(p.id)}
            style={{
              background: isAdded ? "#16a34a" : "#1a4a2e",
              color: "#fdf6e3",
              padding: "8px 16px", borderRadius: 999,
              fontSize: 14, fontWeight: 600,
              transition: "all 0.2s",
              transform: isAdded ? "scale(0.95)" : "scale(1)",
              border: "none", cursor: "pointer",
            }}
          >
            {isAdded ? "✓ Добавлено" : "В корзину"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  const [page, setPage] = useState<Page>("home");
  const [cart, setCart] = useState<number[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [filterPrice, setFilterPrice] = useState<[number, number]>([0, 3000]);
  const [filterAge, setFilterAge] = useState("все");
  const [filterType, setFilterType] = useState("все");
  const [added, setAdded] = useState<number | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  const addToCart = (id: number) => {
    setCart((prev) => [...prev, id]);
    setAdded(id);
    setTimeout(() => setAdded(null), 1200);
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => {
      const idx = prev.indexOf(id);
      if (idx === -1) return prev;
      return [...prev.slice(0, idx), ...prev.slice(idx + 1)];
    });
  };

  const cartItems = PRODUCTS.filter((p) => cart.includes(p.id));
  const cartTotal = cartItems.reduce((s, p) => s + p.price, 0);

  const filteredProducts = PRODUCTS.filter((p) => {
    const priceOk = p.price >= filterPrice[0] && p.price <= filterPrice[1];
    const ageOk = filterAge === "все" || p.age === filterAge;
    const typeOk = filterType === "все" || p.type === filterType;
    return priceOk && ageOk && typeOk;
  });

  const nav: { id: Page; label: string }[] = [
    { id: "home", label: "Главная" },
    { id: "catalog", label: "Каталог" },
    { id: "delivery", label: "Доставка" },
    { id: "about", label: "О проекте" },
    { id: "contacts", label: "Контакты" },
  ];

  return (
    <div className="min-h-screen pattern-bg relative overflow-x-hidden" style={{ background: "#fdf6e3", fontFamily: "'Golos Text', sans-serif" }}>
      <Snowflakes />

      {/* HEADER */}
      <header style={{ background: "#1a4a2e", position: "relative", zIndex: 50, boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
          <Garland />
        </div>
        <div className="container mx-auto px-4 py-4" style={{ paddingBottom: 28 }}>
          <div className="flex items-center justify-between">
            <button onClick={() => setPage("home")} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <span style={{ fontSize: 32 }}>🐑</span>
              <div>
                <div style={{ fontFamily: "'Caveat', cursive", fontSize: 24, fontWeight: 700, color: "#d4a017", lineHeight: 1 }}>Сладкий Год Овцы</div>
                <div style={{ fontSize: 11, color: "#a8d5b5", marginTop: 2 }}>Новогодние подарки для детей</div>
              </div>
            </button>

            <nav className="hidden md:flex items-center gap-6">
              {nav.map((n) => (
                <button key={n.id} onClick={() => setPage(n.id)}
                  style={{ fontSize: 14, fontWeight: 500, color: page === n.id ? "#d4a017" : "#c8e6d5", background: "none", border: "none", cursor: "pointer", transition: "color 0.2s" }}
                  onMouseOver={(e) => { if (page !== n.id) (e.target as HTMLElement).style.color = "white"; }}
                  onMouseOut={(e) => { if (page !== n.id) (e.target as HTMLElement).style.color = "#c8e6d5"; }}
                >
                  {n.label}
                </button>
              ))}
              <button onClick={() => setPage("cart")} style={{ position: "relative", background: "#d4a017", border: "none", borderRadius: "50%", width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <Icon name="ShoppingCart" size={18} />
                <CartBadge count={cart.length} />
              </button>
            </nav>

            <div className="flex md:hidden items-center gap-3">
              <button onClick={() => setPage("cart")} style={{ position: "relative", background: "#d4a017", border: "none", borderRadius: "50%", width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <Icon name="ShoppingCart" size={18} />
                <CartBadge count={cart.length} />
              </button>
              <button onClick={() => setMobileOpen(!mobileOpen)} style={{ color: "#fdf6e3", background: "none", border: "none", cursor: "pointer" }}>
                <Icon name={mobileOpen ? "X" : "Menu"} size={24} />
              </button>
            </div>
          </div>

          {mobileOpen && (
            <nav className="md:hidden mt-4 flex flex-col gap-1 border-t pt-3" style={{ borderColor: "#2d6a4f" }}>
              {nav.map((n) => (
                <button key={n.id} onClick={() => { setPage(n.id); setMobileOpen(false); }}
                  className="flex items-center gap-2 py-2 px-3 rounded-xl text-sm font-medium text-left"
                  style={{ background: page === n.id ? "#d4a017" : "transparent", color: page === n.id ? "#1a1a1a" : "#c8e6d5", border: "none", cursor: "pointer" }}
                >
                  {n.label}
                </button>
              ))}
            </nav>
          )}
        </div>
      </header>

      {/* PAGES */}
      <main style={{ position: "relative", zIndex: 10 }}>
        {page === "home" && <HomePage setPage={setPage} addToCart={addToCart} added={added} />}
        {page === "catalog" && (
          <CatalogPage addToCart={addToCart} added={added} filterPrice={filterPrice} setFilterPrice={setFilterPrice}
            filterAge={filterAge} setFilterAge={setFilterAge} filterType={filterType} setFilterType={setFilterType}
            filteredProducts={filteredProducts} />
        )}
        {page === "delivery" && <DeliveryPage />}
        {page === "contacts" && <ContactsPage />}
        {page === "about" && <AboutPage />}
        {page === "cart" && <CartPage cart={cart} cartItems={cartItems} cartTotal={cartTotal} removeFromCart={removeFromCart} setPage={setPage} />}
      </main>

      {/* FOOTER */}
      <footer style={{ background: "#1a4a2e", color: "#a8d5b5", padding: "32px 0", marginTop: 64, position: "relative", zIndex: 10 }}>
        <div className="container mx-auto px-4 text-center">
          <div style={{ fontFamily: "'Caveat', cursive", fontSize: 22, color: "#d4a017", marginBottom: 8 }}>🐑 Сладкий Год Овцы</div>
          <p style={{ fontSize: 13 }}>Новогодние сладкие подарки для детей</p>
          <p style={{ fontSize: 12, color: "#6aab84", marginTop: 4 }}>© 2015 · Все права защищены</p>
        </div>
      </footer>
    </div>
  );
}

/* ====== HOME PAGE ====== */
function HomePage({ setPage, addToCart, added }: { setPage: (p: Page) => void; addToCart: (id: number) => void; added: number | null }) {
  return (
    <div>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #1a4a2e 0%, #1e5c35 50%, #0f2e1c 100%)", color: "white", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.07 }}>
          {["❄","⭐","✨","🎄","❄","⭐","✨","🎄","❄","⭐","✨","🎄","❄","⭐","✨","🎄","❄","⭐","✨","🎄"].map((ch, i) => (
            <span key={i} style={{ position: "absolute", fontSize: 36, left: `${(i * 5.2) % 100}%`, top: `${(i * 7.3) % 100}%` }}>{ch}</span>
          ))}
        </div>
        <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center gap-10" style={{ position: "relative" }}>
          <div className="flex-1 animate-fade-in">
            <div style={{ display: "inline-block", background: "#d4a017", color: "#1a1a1a", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 999, marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              🐑 Год Овцы · 2015
            </div>
            <h1 style={{ fontFamily: "'Caveat', cursive", fontSize: "clamp(2.5rem, 6vw, 3.5rem)", fontWeight: 700, lineHeight: 1.15, marginBottom: 16, color: "#fdf6e3" }}>
              Сладкие подарки<br />
              <span style={{ color: "#d4a017" }}>для любимых детей</span>
            </h1>
            <p style={{ color: "#a8d5b5", fontSize: 17, marginBottom: 32, maxWidth: 400 }}>
              Новогодние наборы сладостей с символом года — тематические подарки с шоколадом, мармеладом и карамелью
            </p>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => setPage("catalog")}
                style={{ background: "#d4a017", color: "#1a1a1a", padding: "12px 32px", borderRadius: 999, fontWeight: 600, fontSize: 15, border: "none", cursor: "pointer" }}>
                Смотреть каталог
              </button>
              <button onClick={() => setPage("delivery")}
                style={{ background: "transparent", color: "#d4a017", padding: "12px 32px", borderRadius: 999, fontWeight: 600, fontSize: 15, border: "2px solid #d4a017", cursor: "pointer" }}>
                Условия доставки
              </button>
            </div>
          </div>
          <div className="flex-shrink-0 animate-sway" style={{ width: "clamp(180px, 30vw, 280px)" }}>
            <img src={IMAGES.hero} alt="Праздничный подарок" style={{ width: "100%", borderRadius: 24, boxShadow: "0 20px 60px rgba(0,0,0,0.4)", border: "4px solid #d4a017" }} />
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "🎁", title: "Красивая упаковка", desc: "Праздничные коробки с лентами" },
            { icon: "🚚", title: "Быстрая доставка", desc: "По городу за 1-2 дня" },
            { icon: "🍬", title: "Натуральный состав", desc: "Без вредных красителей" },
            { icon: "⭐", title: "Гарантия качества", desc: "Свежие сладости" },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 text-center shadow-sm" style={{ border: "1px solid #e8dcc8" }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontWeight: 600, fontSize: 13, color: "#1a4a2e" }}>{item.title}</div>
              <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Хиты */}
      <section className="container mx-auto px-4 pb-12">
        <div className="flex items-center justify-between mb-8">
          <h2 style={{ fontFamily: "'Caveat', cursive", fontSize: 36, color: "#1a4a2e" }}>⭐ Хиты продаж</h2>
          <button onClick={() => setPage("catalog")} style={{ fontSize: 14, color: "#1a4a2e", fontWeight: 600, background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
            Весь каталог <Icon name="ArrowRight" size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRODUCTS.slice(0, 3).map((p) => (
            <ProductCard key={p.id} product={p} addToCart={addToCart} added={added} />
          ))}
        </div>
      </section>

      {/* Баннер */}
      <section className="mx-4 md:mx-auto md:container mb-12" style={{ background: "linear-gradient(135deg, #b5271a, #8b1a12)", borderRadius: 24, overflow: "hidden" }}>
        <div className="flex flex-col md:flex-row items-center gap-6 p-8 md:p-10">
          <img src={IMAGES.assortment} alt="Ассортимент" style={{ width: "100%", maxWidth: 220, height: 160, objectFit: "cover", borderRadius: 16, flexShrink: 0 }} />
          <div style={{ color: "white" }}>
            <h3 style={{ fontFamily: "'Caveat', cursive", fontSize: 32, fontWeight: 700, marginBottom: 8 }}>Закажите до 25 декабря</h3>
            <p style={{ color: "#ffb3b3", marginBottom: 16, fontSize: 14 }}>Успейте выбрать подарки для всех детей. Бесплатная доставка при заказе от 2000₽</p>
            <button onClick={() => setPage("catalog")} style={{ background: "#d4a017", color: "#1a1a1a", padding: "10px 24px", borderRadius: 999, fontWeight: 600, border: "none", cursor: "pointer" }}>
              Выбрать подарки
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ====== CATALOG PAGE ====== */
function CatalogPage({ addToCart, added, filterPrice, setFilterPrice, filterAge, setFilterAge, filterType, setFilterType, filteredProducts }: {
  addToCart: (id: number) => void; added: number | null;
  filterPrice: [number, number]; setFilterPrice: (v: [number, number]) => void;
  filterAge: string; setFilterAge: (v: string) => void;
  filterType: string; setFilterType: (v: string) => void;
  filteredProducts: typeof PRODUCTS;
}) {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 style={{ fontFamily: "'Caveat', cursive", fontSize: 44, color: "#1a4a2e", marginBottom: 32 }}>🎄 Каталог подарков</h1>
      <div className="bg-white rounded-2xl p-5 shadow-sm mb-8" style={{ border: "1px solid #e8dcc8" }}>
        <h2 className="flex items-center gap-2 font-semibold mb-4" style={{ color: "#1a4a2e" }}>
          <Icon name="SlidersHorizontal" size={18} /> Фильтры
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label style={{ fontSize: 13, color: "#9ca3af", display: "block", marginBottom: 8 }}>
              Цена до: <strong style={{ color: "#1a4a2e" }}>{filterPrice[1]} ₽</strong>
            </label>
            <input type="range" min={0} max={3000} step={100} value={filterPrice[1]}
              onChange={(e) => setFilterPrice([filterPrice[0], Number(e.target.value)])}
              style={{ width: "100%", accentColor: "#1a4a2e" }} />
            <div className="flex justify-between" style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}><span>0 ₽</span><span>3000 ₽</span></div>
          </div>
          <div>
            <label style={{ fontSize: 13, color: "#9ca3af", display: "block", marginBottom: 8 }}>Возраст ребёнка</label>
            <div className="flex flex-wrap gap-2">
              {["все", "1-3", "3-5", "6-9", "10+"].map((a) => (
                <button key={a} onClick={() => setFilterAge(a)}
                  style={{ padding: "4px 12px", borderRadius: 999, fontSize: 13, fontWeight: 500, border: "none", cursor: "pointer", background: filterAge === a ? "#1a4a2e" : "#f0ebe0", color: filterAge === a ? "#fdf6e3" : "#4a3728" }}>
                  {a === "все" ? "Все" : `${a} лет`}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label style={{ fontSize: 13, color: "#9ca3af", display: "block", marginBottom: 8 }}>Тип сладостей</label>
            <div className="flex flex-wrap gap-2">
              {["все", "шоколад", "мармелад", "карамель", "ассорти"].map((t) => (
                <button key={t} onClick={() => setFilterType(t)}
                  style={{ padding: "4px 12px", borderRadius: 999, fontSize: 13, fontWeight: 500, border: "none", cursor: "pointer", background: filterType === t ? "#b5271a" : "#f0ebe0", color: filterType === t ? "white" : "#4a3728" }}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div style={{ fontSize: 13, color: "#9ca3af", marginBottom: 16 }}>
        Найдено подарков: <strong style={{ color: "#1a4a2e" }}>{filteredProducts.length}</strong>
      </div>
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20">
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
          <p style={{ color: "#9ca3af" }}>По выбранным фильтрам ничего не найдено</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} addToCart={addToCart} added={added} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ====== DELIVERY PAGE ====== */
function DeliveryPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 style={{ fontFamily: "'Caveat', cursive", fontSize: 44, color: "#1a4a2e", marginBottom: 32 }}>🚚 Доставка</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
        {[
          { icon: "🏙️", title: "По городу", desc: "Доставка курьером в течение 1-2 дней. Бесплатно при заказе от 2000 ₽, иначе 200 ₽.", time: "1-2 дня" },
          { icon: "📦", title: "Самовывоз", desc: "Заберите заказ самостоятельно из нашего магазина. Адрес уточняйте при заказе.", time: "В день заказа" },
          { icon: "🌍", title: "Транспортная компания", desc: "Отправляем по всей России через ТК СДЭК и Почту России. Сроки уточняются.", time: "3-7 дней" },
          { icon: "🎄", title: "Экспресс под Новый год", desc: "С 20 по 31 декабря работаем в усиленном режиме. Успейте заказать заранее!", time: "В день заказа" },
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-sm" style={{ border: "1px solid #e8dcc8" }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>{item.icon}</div>
            <h3 style={{ fontWeight: 600, color: "#1a4a2e", fontSize: 17, marginBottom: 8 }}>{item.title}</h3>
            <p style={{ color: "#6b7280", fontSize: 14, marginBottom: 12 }}>{item.desc}</p>
            <span style={{ fontSize: 12, background: "#f0ebe0", color: "#1a4a2e", fontWeight: 600, padding: "4px 12px", borderRadius: 999 }}>⏱ {item.time}</span>
          </div>
        ))}
      </div>
      <div className="mt-8 max-w-3xl rounded-2xl p-6" style={{ background: "#1a4a2e", color: "#fdf6e3" }}>
        <h3 style={{ fontFamily: "'Caveat', cursive", fontSize: 26, color: "#d4a017", marginBottom: 12 }}>🎁 Важно знать</h3>
        <ul style={{ color: "#a8d5b5", fontSize: 14, lineHeight: 2 }}>
          <li>• Все подарки упаковываются в праздничные коробки</li>
          <li>• Возможна персональная открытка с поздравлением</li>
          <li>• Оплата при получении или онлайн</li>
          <li>• Хранение сладостей: прохладное сухое место</li>
        </ul>
      </div>
    </div>
  );
}

/* ====== CONTACTS PAGE ====== */
function ContactsPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 style={{ fontFamily: "'Caveat', cursive", fontSize: 44, color: "#1a4a2e", marginBottom: 32 }}>📞 Контакты</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
        <div className="space-y-4">
          {[
            { icon: "Phone", label: "Телефон", value: "+7 (XXX) XXX-XX-XX" },
            { icon: "Mail", label: "Email", value: "info@sweetyear.ru" },
            { icon: "MapPin", label: "Адрес", value: "г. Москва, ул. Праздничная, 1" },
            { icon: "Clock", label: "Режим работы", value: "Пн-Пт 9:00–20:00, Сб 10:00–18:00" },
          ].map((c, i) => (
            <div key={i} className="flex items-start gap-4 bg-white rounded-2xl p-4 shadow-sm" style={{ border: "1px solid #e8dcc8" }}>
              <div style={{ width: 40, height: 40, background: "#1a4a2e", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon name={c.icon} size={18} style={{ color: "#d4a017" }} />
              </div>
              <div>
                <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 2 }}>{c.label}</div>
                <div style={{ fontWeight: 500, color: "#1a4a2e" }}>{c.value}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm" style={{ border: "1px solid #e8dcc8" }}>
          <h3 style={{ fontWeight: 600, color: "#1a4a2e", marginBottom: 16 }}>Написать нам</h3>
          <div className="space-y-3">
            <input type="text" placeholder="Ваше имя" className="w-full rounded-xl px-4 py-2.5 text-sm focus:outline-none" style={{ border: "1px solid #e8dcc8" }} />
            <input type="tel" placeholder="Телефон" className="w-full rounded-xl px-4 py-2.5 text-sm focus:outline-none" style={{ border: "1px solid #e8dcc8" }} />
            <textarea placeholder="Сообщение" rows={3} className="w-full rounded-xl px-4 py-2.5 text-sm focus:outline-none resize-none" style={{ border: "1px solid #e8dcc8" }} />
            <button className="w-full py-2.5 rounded-xl font-semibold" style={{ background: "#1a4a2e", color: "#fdf6e3", border: "none", cursor: "pointer" }}>Отправить</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ====== ABOUT PAGE ====== */
function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 style={{ fontFamily: "'Caveat', cursive", fontSize: 44, color: "#1a4a2e", marginBottom: 32 }}>🐑 О проекте</h1>
      <div className="max-w-2xl space-y-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm" style={{ border: "1px solid #e8dcc8" }}>
          <img src={IMAGES.assortment} alt="О нас" className="w-full h-48 object-cover rounded-xl mb-5" />
          <p style={{ color: "#6b7280", lineHeight: 1.8, marginBottom: 12 }}>
            «Сладкий Год Овцы» — специализированный каталог новогодних сладких подарков для детей, созданный с любовью к праздникам и к детству.
          </p>
          <p style={{ color: "#6b7280", lineHeight: 1.8 }}>
            Мы тщательно отбираем лучшие сладости, создаём красивые тематические наборы с символом 2015 года — милой овечкой, и дарим детям настоящее новогоднее волшебство.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { num: "500+", label: "Довольных семей" },
            { num: "6", label: "Вариантов подарков" },
            { num: "100%", label: "Натуральный состав" },
          ].map((s, i) => (
            <div key={i} className="rounded-2xl p-4 text-center" style={{ background: "#1a4a2e", color: "white" }}>
              <div style={{ fontFamily: "'Caveat', cursive", fontSize: 28, color: "#d4a017" }}>{s.num}</div>
              <div style={{ fontSize: 11, color: "#a8d5b5", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ====== CART PAGE ====== */
function CartPage({ cart, cartItems, cartTotal, removeFromCart, setPage }: {
  cart: number[]; cartItems: typeof PRODUCTS; cartTotal: number;
  removeFromCart: (id: number) => void; setPage: (p: Page) => void;
}) {
  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div style={{ fontSize: 56, marginBottom: 12 }}>🛒</div>
        <h2 style={{ fontFamily: "'Caveat', cursive", fontSize: 40, color: "#1a4a2e", marginBottom: 12 }}>Корзина пуста</h2>
        <p style={{ color: "#9ca3af", marginBottom: 24 }}>Выберите подарки в каталоге</p>
        <button onClick={() => setPage("catalog")} style={{ background: "#1a4a2e", color: "#fdf6e3", padding: "12px 32px", borderRadius: 999, fontWeight: 600, border: "none", cursor: "pointer" }}>
          Перейти в каталог
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 style={{ fontFamily: "'Caveat', cursive", fontSize: 44, color: "#1a4a2e", marginBottom: 32 }}>🛒 Корзина</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {cartItems.map((p, idx) => (
            <div key={`${p.id}-${idx}`} className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm" style={{ border: "1px solid #e8dcc8" }}>
              <img src={p.image} alt={p.name} style={{ width: 64, height: 64, borderRadius: 12, objectFit: "cover", flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, color: "#1a4a2e", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</div>
                <div style={{ fontSize: 12, color: "#9ca3af" }}>{p.weight} · {p.type}</div>
              </div>
              <div style={{ fontWeight: 700, color: "#1a4a2e", whiteSpace: "nowrap" }}>{p.price} ₽</div>
              <button onClick={() => removeFromCart(p.id)} style={{ color: "#d1d5db", background: "none", border: "none", cursor: "pointer", marginLeft: 4 }}
                onMouseOver={(e) => (e.currentTarget.style.color = "#b5271a")}
                onMouseOut={(e) => (e.currentTarget.style.color = "#d1d5db")}>
                <Icon name="X" size={18} />
              </button>
            </div>
          ))}
        </div>
        <div className="md:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-4" style={{ border: "1px solid #e8dcc8" }}>
            <h3 style={{ fontWeight: 600, color: "#1a4a2e", marginBottom: 16 }}>Итого</h3>
            <div className="flex justify-between mb-2" style={{ fontSize: 14, color: "#9ca3af" }}>
              <span>Товаров:</span><span>{cart.length} шт.</span>
            </div>
            {cartTotal >= 2000 ? (
              <div style={{ fontSize: 12, color: "#16a34a", background: "#f0fdf4", borderRadius: 12, padding: "8px 12px", marginBottom: 12 }}>🎉 Бесплатная доставка!</div>
            ) : (
              <div style={{ fontSize: 12, color: "#9ca3af", background: "#f9fafb", borderRadius: 12, padding: "8px 12px", marginBottom: 12 }}>До бесплатной доставки: {2000 - cartTotal} ₽</div>
            )}
            <div className="flex justify-between" style={{ fontWeight: 700, fontSize: 18, color: "#1a4a2e", borderTop: "1px solid #e8dcc8", paddingTop: 12, marginBottom: 16 }}>
              <span>Сумма:</span><span>{cartTotal} ₽</span>
            </div>
            <button className="w-full py-3 rounded-xl font-semibold text-base" style={{ background: "#d4a017", color: "#1a1a1a", border: "none", cursor: "pointer" }}>
              Оформить заказ
            </button>
            <button onClick={() => setPage("catalog")} style={{ width: "100%", marginTop: 8, fontSize: 13, color: "#1a4a2e", background: "none", border: "none", cursor: "pointer", padding: "8px 0" }}>
              Продолжить покупки
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
