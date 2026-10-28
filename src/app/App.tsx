import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingBag, ChevronRight, Star, Heart, X, Plus, Minus, Menu, ArrowLeft, Check, ChevronDown, Wine, Package, Sparkles, Instagram, Facebook, Twitter, MapPin, Clock, Phone, Car, Tag, ZoomIn } from "lucide-react";
import { Toaster, toast } from "sonner";

// ─── Image Imports ──────────────────────────────────────────────────────────
import BlackGrapeLogo from "@/imports/BlackGrapeLogo/index";
import imgHero from "@/imports/Homepage/hero-vineyard.jpg";
import imgWineMockup from "@/imports/Homepage/wine-pairing-feature.jpg";
import imgChampagneGirl from "@/imports/Homepage/wine-tasting-lifestyle.png";
import imgVisitUs from "@/imports/Homepage/visit-vineyard.png";
import imgHeaderBg from "@/imports/Homepage/header-texture.png";
import imgPinotNoir from "@/imports/Shop/catalog-01-pinot-noir.jpg";
import imgCabernet from "@/imports/Shop/catalog-02-cabernet-sauvignon.jpg";
import imgSauvignonBlanc from "@/imports/Shop/catalog-03-sauvignon-blanc.png";
import imgPinotGris from "@/imports/Shop/catalog-04-pinot-gris.jpg";
import imgRose from "@/imports/Shop/catalog-05-voyageur-rose.jpg";
import imgRose2 from "@/imports/Shop/catalog-08-diamond-rose.jpg";
import imgChardonnay from "@/imports/Shop/catalog-06-chardonnay-reserve.png";
import imgMalbec from "@/imports/Shop/catalog-07-malbec-and-10-zinfandel.jpg";
import imgProsecco from "@/imports/Shop/catalog-11-prosecco.jpg";
import imgSyrah from "@/imports/Shop/catalog-12-syrah.jpg";
import imgMerlot from "@/imports/Shop/catalog-09-merlot.jpg";
import imgPersona1 from "@/imports/Product/review-yuki.png";
import imgPersona2 from "@/imports/Product/review-robin.jpg";
import imgPersona3 from "@/imports/Product/review-carlos.jpg";
import imgPersona4 from "@/imports/Product/review-marie.jpg";
import imgStamp from "@/imports/Cart/security-geotrust.png";
import imgMemberPerson from "@/imports/Member/member-portrait.png";
import imgMemberWine from "@/imports/Member/member-gift-set.jpg";

// ─── Types ───────────────────────────────────────────────────────────────────
type Page = "home" | "shop" | "product" | "cart" | "checkout" | "member" | "confirmation" | "visit" | "about" | "blog";

type Occasion = "Dinner Party" | "Gift" | "Celebration" | "Everyday";

interface WineDetails {
  taste: string;
  blend: string;
  appellation: string;
  alcohol: string;
  occasions: Occasion[];
  pairings: string[];
  winemakerNote: string;
}

interface Wine extends WineDetails {
  id: number;
  name: string;
  type: string;
  year: number;
  price: number;
  memberPrice: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  description: string;
  notes: string;
}

interface CartItem {
  wine: Wine;
  quantity: number;
}

// ─── Wine Catalog ─────────────────────────────────────────────────────────────
const BASE_WINES: Omit<Wine, keyof WineDetails>[] = [
  {
    id: 1,
    name: "Voyageur Pinot Noir",
    type: "Red wine",
    year: 2012,
    price: 55,
    memberPrice: 37,
    rating: 4.6,
    reviews: 32,
    image: imgPinotNoir,
    description: "Diamond Collection Pinot Noir. Along with silky textures, warm, dense flavors of strawberry, mocha, raspberry jam and spice carry through to a spectacular finish.",
    notes: "Strawberry · Mocha · Raspberry · Spice",
  },
  {
    id: 2,
    name: "Voyageur Cabernet",
    type: "Red wine",
    year: 2021,
    price: 65,
    memberPrice: 44,
    rating: 4.8,
    reviews: 128,
    image: imgCabernet,
    description: "This Cabernet Sauvignon is an exciting member of our family of Diamond Collection Cabernet Sauvignons, expressing vibrant notes of black fruit and spices, with an opulent body and long finish.",
    notes: "Black Fruit · Dark Cherry · Spice · Oak",
  },
  {
    id: 3,
    name: "Sauvignon Blanc",
    type: "White wine",
    year: 2022,
    price: 45,
    memberPrice: 30,
    rating: 4.4,
    reviews: 88,
    image: imgSauvignonBlanc,
    description: "Our Diamond Collection Appellation Series Sauvignon Blanc continues this tradition, grown on our Temecula Valley estate. A wonderful tribute to this beautiful place and enticing varietal.",
    notes: "Citrus · Tropical · Grass · Mineral",
  },
  {
    id: 4,
    name: "Voyageur Pinot Gris",
    type: "White wine",
    year: 2010,
    price: 45,
    memberPrice: 30,
    rating: 4.7,
    reviews: 406,
    image: imgPinotGris,
    badge: "BEST SELLER",
    description: "A crisp vibrant wine with flavors of orange blossom, grapefruit, lime and a natural acidity. This Pinot Gris is grown in California's cooler appellations, where chilly evening temperatures help the grapes retain their natural acidity.",
    notes: "Orange Blossom · Grapefruit · Lime · Acidity",
  },
  {
    id: 5,
    name: "Voyageur Rosé",
    type: "Sparkling wine",
    year: 2022,
    price: 45,
    memberPrice: 30,
    rating: 4.6,
    reviews: 366,
    image: imgRose,
    description: "Set in a hue reminiscent of cherry blossoms and peach, Diamond Collection Rosé of Pinot Noir offers a delicate texture and vibrant notes of freshly picked fruit.",
    notes: "Cherry Blossom · Peach · Strawberry · Fresh",
  },
  {
    id: 6,
    name: "Chardonnay Reserve",
    type: "White wine",
    year: 2012,
    price: 52,
    memberPrice: 35,
    rating: 4.9,
    reviews: 201,
    image: imgChardonnay,
    description: "Our Chardonnay Reserve is a statement of place, expressing the rich complexity of our estate vineyards with notes of vanilla, toasted oak, and ripe stone fruit.",
    notes: "Vanilla · Toasted Oak · Stone Fruit · Butter",
  },
  {
    id: 7,
    name: "Rogue Malbec",
    type: "Red wine",
    year: 2019,
    price: 58,
    memberPrice: 39,
    rating: 4.5,
    reviews: 94,
    image: imgMalbec,
    description: "Deep violet in color with a rich, velvety texture. The Rogue Malbec delivers layers of dark berry, plum, and subtle earthy notes with a long, smooth finish.",
    notes: "Dark Berry · Plum · Earth · Violet",
  },
  {
    id: 8,
    name: "Diamond Rosé",
    type: "Sparkling wine",
    year: 2023,
    price: 48,
    memberPrice: 32,
    rating: 4.3,
    reviews: 53,
    image: imgRose2,
    badge: "NEW",
    description: "Effervescent and elegant, our Diamond Rosé sparkles with notes of wild strawberry and fresh cream, finishing with a delicate minerality that lingers on the palate.",
    notes: "Wild Strawberry · Fresh Cream · Mineral · Effervescent",
  },
  {
    id: 9,
    name: "Voyageur Merlot",
    type: "Red wine",
    year: 2019,
    price: 54,
    memberPrice: 36,
    rating: 4.6,
    reviews: 74,
    image: imgMerlot,
    description: "An exceptional vintage with flavors of raspberry, blueberry, cranberry and crème brûlée. Crafted as a way for our winemakers to express their own unique interpretation of fine wine.",
    notes: "Raspberry · Blueberry · Cranberry · Crème Brûlée",
  },
  {
    id: 10,
    name: "Voyageur Zinfandel",
    type: "Red wine",
    year: 2020,
    price: 52,
    memberPrice: 35,
    rating: 4.5,
    reviews: 61,
    image: imgMalbec,
    description: "Bold and expressive, our Zinfandel delivers layers of blackberry jam, black pepper, and smoky oak. A rich, full-bodied wine with a long and satisfying finish.",
    notes: "Blackberry · Black Pepper · Smoked Oak · Spice",
  },
  {
    id: 11,
    name: "Voyageur Prosecco",
    type: "Sparkling wine",
    year: 2023,
    price: 42,
    memberPrice: 28,
    rating: 4.7,
    reviews: 119,
    image: imgProsecco,
    badge: "BEST SELLER",
    description: "Make every day a celebration with our sparkling, refreshingly effervescent Prosecco. Expect scents of pear, green apple, and bright citrus with a lightly sweet, vivacious texture.",
    notes: "Pear · Green Apple · Citrus · Effervescent",
  },
  {
    id: 12,
    name: "Voyageur Syrah",
    type: "Red wine",
    year: 2018,
    price: 60,
    memberPrice: 40,
    rating: 4.8,
    reviews: 47,
    image: imgSyrah,
    description: "The connection between vine and soil creates the essence of a wine. Our Syrah is a vineyard-specific creation produced in limited quantities — deep, structured, and built to age.",
    notes: "Dark Plum · Violet · Black Pepper · Leather",
  },
];


// Facts, pairings and occasions shown on the shop filters and product pages.
const WINE_DETAILS: Record<number, WineDetails> = {
  1: {
    taste: "Silky and bright",
    blend: "100% Pinot Noir",
    appellation: "Temecula Valley",
    alcohol: "13.8%",
    occasions: ["Dinner Party", "Celebration"],
    pairings: ["Roast duck or salmon", "Mushroom risotto", "Gruyère and soft cheeses"],
    winemakerNote: "We pick our Pinot Noir in the cool early morning to keep its red fruit fresh, then age it gently in French oak.",
  },
  2: {
    taste: "Bold and structured",
    blend: "Cabernet Sauvignon, a touch of Merlot",
    appellation: "Temecula Valley",
    alcohol: "14.5%",
    occasions: ["Dinner Party", "Gift"],
    pairings: ["Grilled ribeye", "Braised short ribs", "Aged cheddar"],
    winemakerNote: "Cabernet is the backbone of our estate. Long time in barrel gives it the depth to age for another decade.",
  },
  3: {
    taste: "Crisp and zesty",
    blend: "100% Sauvignon Blanc",
    appellation: "Temecula Valley",
    alcohol: "13.2%",
    occasions: ["Everyday", "Dinner Party"],
    pairings: ["Goat cheese salad", "Grilled shrimp", "Fish tacos"],
    winemakerNote: "Fermented cold in stainless steel, so every glass tastes like the morning it was picked.",
  },
  4: {
    taste: "Light and refreshing",
    blend: "100% Pinot Gris",
    appellation: "California",
    alcohol: "13.0%",
    occasions: ["Everyday", "Gift"],
    pairings: ["Seafood appetizers", "Citrus salads", "Thai green curry"],
    winemakerNote: "Our best seller for a reason: easy to love, and bright enough to pair with almost anything on the table.",
  },
  5: {
    taste: "Delicate and fruity",
    blend: "Rosé of Pinot Noir",
    appellation: "Temecula Valley",
    alcohol: "12.5%",
    occasions: ["Celebration", "Everyday"],
    pairings: ["Charcuterie boards", "Strawberry desserts", "Summer salads"],
    winemakerNote: "A short time on the skins gives this rosé its blush color and a soft, fresh-picked fruit character.",
  },
  6: {
    taste: "Rich and creamy",
    blend: "100% Chardonnay",
    appellation: "Temecula Valley",
    alcohol: "14.0%",
    occasions: ["Gift", "Dinner Party"],
    pairings: ["Lobster with butter", "Roast chicken", "Creamy pasta"],
    winemakerNote: "Our crown jewel. Barrel fermented and aged on its lees for a rich, rounded texture.",
  },
  7: {
    taste: "Velvety and dark",
    blend: "100% Malbec",
    appellation: "Temecula Valley",
    alcohol: "14.2%",
    occasions: ["Dinner Party", "Everyday"],
    pairings: ["Grilled steak with chimichurri", "Lamb burgers", "Smoked gouda"],
    winemakerNote: "Malbec loves our warm days and cool nights. We let it ripen fully for deep color and plush fruit.",
  },
  8: {
    taste: "Elegant and sparkling",
    blend: "Pinot Noir and Chardonnay",
    appellation: "Temecula Valley",
    alcohol: "12.0%",
    occasions: ["Celebration", "Gift"],
    pairings: ["Oysters", "Fried chicken", "Berry tarts"],
    winemakerNote: "Our newest release, made for toasts. Fine bubbles and a clean, mineral finish.",
  },
  9: {
    taste: "Smooth and juicy",
    blend: "Merlot, a touch of Cabernet Franc",
    appellation: "Temecula Valley",
    alcohol: "14.0%",
    occasions: ["Everyday", "Dinner Party"],
    pairings: ["Roast pork", "Margherita pizza", "Mushroom burgers"],
    winemakerNote: "A crowd-pleaser with soft tannins. Our winemakers' favorite for a weeknight dinner.",
  },
  10: {
    taste: "Bold and spicy",
    blend: "100% Zinfandel",
    appellation: "Temecula Valley",
    alcohol: "14.8%",
    occasions: ["Dinner Party", "Celebration"],
    pairings: ["Barbecue ribs", "Spiced sausages", "Blue cheese burgers"],
    winemakerNote: "Old-style California Zinfandel: generous, peppery, and made for the grill.",
  },
  11: {
    taste: "Light and bubbly",
    blend: "Glera",
    appellation: "California",
    alcohol: "11.0%",
    occasions: ["Celebration", "Everyday", "Gift"],
    pairings: ["Brunch dishes", "Prosciutto and melon", "Light appetizers"],
    winemakerNote: "Made in a fresh, fruity style to open any gathering. Serve well chilled.",
  },
  12: {
    taste: "Deep and peppery",
    blend: "Syrah, a touch of Viognier",
    appellation: "Temecula Valley",
    alcohol: "14.6%",
    occasions: ["Gift", "Dinner Party"],
    pairings: ["Lamb chops", "Venison stew", "Grilled portobello"],
    winemakerNote: "Made in small lots from a single vineyard block. Built to age, and even better in five years.",
  },
};

const WINES: Wine[] = BASE_WINES.map((w) => ({ ...w, ...WINE_DETAILS[w.id] }));

const wineSlug = (w: Wine) => w.name.toLowerCase().replace(/é/g, "e").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const FEATURED_WINE_IDS = [4, 2, 6, 8];

interface BlogPost {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  image: string;
  readTime: string;
  body: string[];
}

const BLOG_POSTS: BlogPost[] = [
  {
    slug: "temecula-terroir",
    title: "What Makes Temecula Valley Wine Different",
    category: "Our Region",
    excerpt: "Warm days, cool nights and granite soils. Here is how our corner of Southern California shapes every bottle.",
    image: imgHero,
    readTime: "4 min read",
    body: [
      "Temecula Valley sits about 1,500 feet above sea level, just inland from the Pacific. Each afternoon, cool ocean air flows through the Rainbow Gap and drops the evening temperature, so grapes ripen in the sun but keep their freshness overnight.",
      "Those wide swings between day and night are why our reds develop deep color and ripe fruit while our whites stay crisp and bright. The decomposed granite soils drain quickly, which keeps vine yields low and flavors concentrated.",
      "When you taste a Voyageur wine, you are tasting that balance: the warmth of Southern California and the cool breath of the ocean, in one glass.",
    ],
  },
  {
    slug: "choosing-a-wine-gift",
    title: "How to Choose a Wine Gift (Without Being an Expert)",
    category: "Gifting",
    excerpt: "Four simple questions that lead you to a bottle they will remember, at any budget.",
    image: imgChampagneGirl,
    readTime: "3 min read",
    body: [
      "Start with the occasion. A celebration calls for something sparkling, like our Diamond Rosé or Prosecco. A dinner party host will appreciate a versatile red such as our Pinot Noir or Merlot.",
      "Next, think about what they already enjoy. If they like light, refreshing drinks, choose a white or rosé. If they reach for coffee and dark chocolate, a bold Cabernet or Syrah is a safe bet.",
      "Set your budget, then let the label do some of the work. A bottle with a story, such as a Reserve or a small-lot wine, always feels special. Use the Gift and price filters in our shop to narrow it down in seconds.",
    ],
  },
  {
    slug: "food-and-wine-pairing",
    title: "Pairing 101: Matching Wine and Food",
    category: "Wine Education",
    excerpt: "The three rules our winemakers use at home, plus a cheat sheet for your next dinner.",
    image: imgWineMockup,
    readTime: "5 min read",
    body: [
      "Match weight with weight. Light dishes like salads and seafood suit light wines such as Sauvignon Blanc or Pinot Gris. Rich dishes like steak or braised short ribs need a fuller wine such as Cabernet or Malbec.",
      "Acid loves acid and fat. A crisp white cuts through creamy sauces and fried food, and it stands up to citrus and tomato.",
      "When in doubt, pair by region and by color of the sauce, not the meat. Every Voyageur product page lists three pairings our team recommends, so you can start there.",
    ],
  },
];

// ─── Shared Components ────────────────────────────────────────────────────────
function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setPct(max > 0 ? window.scrollY / max : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[200] pointer-events-none">
      <div className="h-full bg-[#DD6D38] origin-left" style={{ width: `${pct * 100}%` }} />
    </div>
  );
}

function StarRating({ rating, small = false }: { rating: number; small?: boolean }) {
  const size = small ? "w-3 h-3" : "w-4 h-4";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className={`${size} relative`}>
          <Star
            className={`${size} absolute inset-0`}
            fill={i <= Math.floor(rating) ? "#1C1C1C" : "none"}
            stroke="#1C1C1C"
            strokeWidth={1.5}
          />
          {i === Math.ceil(rating) && rating % 1 > 0 && (
            <div className="absolute inset-0 overflow-hidden" style={{ width: `${(rating % 1) * 100}%` }}>
              <Star className={`${size}`} fill="#1C1C1C" stroke="#1C1C1C" strokeWidth={1.5} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function WineTile({
  wine,
  onAddToCart,
  onViewProduct,
}: {
  wine: Wine;
  onAddToCart: (w: Wine) => void;
  onViewProduct: (w: Wine) => void;
}) {
  return (
    <div
      className="group flex flex-col bg-white border border-gray-100 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={() => onViewProduct(wine)}
    >
      <div className="relative h-[300px] overflow-hidden bg-gray-50">
        <img
          src={wine.image}
          alt={wine.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {wine.badge && (
          <div className="absolute top-4 left-4 bg-black text-white text-[11px] px-2 py-1 tracking-wider" style={{ fontFamily: "'Jost', sans-serif" }}>
            {wine.badge}
          </div>
        )}
      </div>
      <div className="flex flex-col flex-1 p-5">
        <p className="text-[#979797] text-[11px] tracking-[0.2em] uppercase mb-1" style={{ fontFamily: "'Jost', sans-serif" }}>
          {wine.type} · {wine.year}
        </p>
        <h3 className="text-[#1C1C1C] text-lg leading-tight mb-1" style={{ fontFamily: "'Lora', serif", fontWeight: 700 }}>
          {wine.name}
        </h3>
        <p className="text-[#87340e] text-sm mb-3" style={{ fontFamily: "'Jost', sans-serif" }}>
          {wine.taste}
        </p>
        <div className="flex items-baseline gap-3 mt-auto mb-4">
          <span className="text-[#1C1C1C] text-xl" style={{ fontFamily: "'Lora', serif" }}>${wine.price}</span>
          <span className="text-[#979797] text-xs tracking-wider" style={{ fontFamily: "'Jost', sans-serif" }}>
            Members ${wine.memberPrice}
          </span>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onAddToCart(wine); }}
          className="w-full bg-[#DD6D38] hover:bg-[#c55e2e] text-white py-3 text-sm tracking-widest uppercase transition-colors"
          style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

function BlogCard({ post, onOpen }: { post: BlogPost; onOpen: () => void }) {
  return (
    <button onClick={onOpen} className="group text-left flex flex-col bg-white hover:shadow-xl transition-shadow duration-300">
      <div className="h-56 overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      </div>
      <div className="p-6 flex flex-col gap-3">
        <p className="text-[#DD6D38] text-[11px] tracking-[0.25em] uppercase" style={{ fontFamily: "'Jost', sans-serif" }}>
          {post.category} · {post.readTime}
        </p>
        <h3 className="text-[#1C1C1C] text-xl leading-snug" style={{ fontFamily: "'Lora', serif", fontWeight: 700 }}>
          {post.title}
        </h3>
        <p className="text-[#555] text-sm leading-6" style={{ fontFamily: "'Jost', sans-serif" }}>
          {post.excerpt}
        </p>
      </div>
    </button>
  );
}

function Header({
  page,
  navigate,
  cartCount,
  transparent = false,
  onCartClick,
}: {
  page: Page;
  navigate: (p: Page) => void;
  cartCount: number;
  transparent?: boolean;
  onCartClick: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems: { label: string; page: Page }[] = [
    { label: "Shop", page: "shop" },
    { label: "Visit", page: "visit" },
    { label: "Wine Club", page: "member" },
    { label: "About Us", page: "about" },
    { label: "Blog", page: "blog" },
  ];

  const bg = transparent && !scrolled && !menuOpen
    ? "bg-transparent"
    : "bg-[#1C2436] shadow-lg";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${bg}`}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => navigate("home")}
          className="flex items-center gap-3 leading-none group"
        >
          <div className="relative w-[27px] h-[27px] shrink-0" style={{ filter: "invert(1)" }}>
            <BlackGrapeLogo />
          </div>
          <div className="flex flex-col items-start">
            <span
              className="text-white text-2xl leading-none"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontStyle: "normal", letterSpacing: "0.2em" }}
            >
              voyageur
            </span>
            <span className="text-white/60 text-[9px] tracking-[0.35em] uppercase" style={{ fontFamily: "'Jost', sans-serif" }}>
              Fine Wines
            </span>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map(({ label, page: p }) => (
            <button
              key={label}
              onClick={() => navigate(p)}
              className={`text-white/90 hover:text-white text-base tracking-wider transition-colors relative group ${page === p ? "text-white" : ""}`}
              style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}
            >
              {label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-white/60 group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </nav>

        {/* Right icons */}
        <div className="flex items-center gap-4">
          <button
            onClick={onCartClick}
            className="relative text-white hover:text-white/80 transition-colors p-1"
          >
            <ShoppingBag className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#DD6D38] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
          <button
            className="lg:hidden text-white p-1"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-[#1C2436] border-t border-white/10 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navItems.map(({ label, page: p }) => (
                <button
                  key={label}
                  onClick={() => { navigate(p); setMenuOpen(false); }}
                  className="text-white/90 hover:text-white text-left text-base tracking-wider transition-colors"
                  style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}
                >
                  {label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Footer({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <footer className="bg-[#F1F2F3] border-t border-gray-200 py-16">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-0 justify-between items-start">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="relative w-[22px] h-[22px] shrink-0 opacity-80">
                <BlackGrapeLogo />
              </div>
              <span
                className="text-3xl tracking-widest text-[#171511]"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700 }}
              >
                voyageur
              </span>
            </div>
            <p className="text-xs text-[#787879] max-w-xs leading-5" style={{ fontFamily: "'Jost', sans-serif" }}>
              © {new Date().getFullYear()} — VOYAGEUR Fine Wines — Temecula, California<br />
              Family owned since 1984 · Phone · (951) 555-0184
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Instagram, label: "Instagram" },
                { Icon: Facebook, label: "Facebook" },
                { Icon: Twitter, label: "X / Twitter" },
              ].map(({ Icon: SocialIcon, label }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="text-[#1C2436] border border-[#1C2436] w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#1C2436] hover:text-white transition-colors"
                >
                  <SocialIcon className="w-4 h-4" strokeWidth={1.5} />
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-16 flex-wrap">
            {[
              {
                title: "SHOP",
                links: [
                  { label: "All Wines", page: "shop" as Page },
                  { label: "Wine Club", page: "member" as Page },
                  { label: "Cart", page: "cart" as Page },
                ],
              },
              {
                title: "EXPLORE",
                links: [
                  { label: "Our Story", page: "about" as Page },
                  { label: "Blog", page: "blog" as Page },
                  { label: "Visit Us", page: "visit" as Page },
                ],
              },
              {
                title: "MEMBERS",
                links: [
                  { label: "Member Benefits", page: "member" as Page },
                  { label: "Tastings & Events", page: "visit" as Page },
                ],
              },
            ].map(({ title, links }) => (
              <div key={title} className="flex flex-col gap-3">
                <p className="text-[#6d819e] text-sm tracking-[0.2em] font-medium" style={{ fontFamily: "'Jost', sans-serif" }}>
                  {title}
                </p>
                {links.map(({ label, page }) => (
                  <button
                    key={label}
                    onClick={() => navigate(page)}
                    className="text-sm text-black hover:text-[#87340e] transition-colors text-left"
                    style={{ fontFamily: "'Jost', sans-serif" }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Home Page ────────────────────────────────────────────────────────────────
function HomePage({
  navigate,
  onAddToCart,
  onViewProduct,
  onOpenPost,
}: {
  navigate: (p: Page) => void;
  onAddToCart: (w: Wine) => void;
  onViewProduct: (w: Wine) => void;
  onOpenPost: (slug: string) => void;
}) {
  const featured = FEATURED_WINE_IDS.map((id) => WINES.find((w) => w.id === id)!);
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <img
          src={imgHero}
          alt="Voyageur vineyard"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C2436]/70 via-[#1C2436]/30 to-[#6B707C]/60" />

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className="text-white/80 text-lg tracking-[0.5em] uppercase mb-4"
              style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}
            >
              Temecula · California
            </p>
            <h1
              className="text-white text-7xl md:text-9xl leading-none mb-2"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, letterSpacing: "0.05em" }}
            >
              VOYAGEUR
            </h1>
            <p
              className="text-white/90 text-2xl md:text-3xl mb-6 tracking-[0.3em] uppercase"
              style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, letterSpacing: "0.4em" }}
            >
              Fine Wines
            </p>
            <p
              className="text-[#FDD7C5] text-sm md:text-base mb-10 tracking-[0.25em] uppercase"
              style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400 }}
            >
              Family grown in Temecula since 1984
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => navigate("shop")}
              className="bg-[#DD6D38] hover:bg-[#c55e2e] text-white px-10 py-4 tracking-[0.2em] uppercase text-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
              style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}
            >
              Shop Wines
            </button>
            <button
              onClick={() => navigate("member")}
              className="border border-white/60 hover:border-white text-white px-10 py-4 tracking-[0.2em] uppercase text-sm transition-all duration-300 hover:bg-white/10"
              style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}
            >
              Join the Club
            </button>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6 text-white/60" />
        </motion.div>
      </section>

      {/* Tagline Banner */}
      <section className="bg-[#404961] py-16 px-8">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <h2
            className="text-white text-3xl md:text-4xl whitespace-nowrap"
            style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}
          >
            Savor the journey
          </h2>
          <div className="hidden md:block w-px h-16 bg-white/30" />
          <p
            className="text-[#F1F6FF] text-base leading-7 max-w-xl"
            style={{ fontFamily: "'Lora', serif", fontWeight: 400 }}
          >
            We believe wine has the power to create meaningful connections, enhance special moments, and evoke a sense of discovery. Since 1984 the Altavilla family has grown and crafted wines that capture the sun and soil of Temecula Valley.
          </p>
        </div>
      </section>

      {/* Featured Wines */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-[#979797] text-xs tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "'Jost', sans-serif" }}>
                From our cellar
              </p>
              <h2 className="text-[#1C1C1C] text-4xl md:text-5xl" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700 }}>
                Our Wines
              </h2>
            </div>
            <button
              onClick={() => navigate("shop")}
              className="self-start md:self-auto text-[#87340e] text-sm tracking-[0.2em] uppercase flex items-center gap-2 hover:gap-3 transition-all"
              style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}
            >
              Shop all wines <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((wine) => (
              <WineTile key={wine.id} wine={wine} onAddToCart={onAddToCart} onViewProduct={onViewProduct} />
            ))}
          </div>
        </div>
      </section>

      {/* Wine Club CTA */}
      <section className="bg-[#87340e] py-24 px-8 text-center overflow-hidden relative">
        <div className="max-w-[900px] mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2
              className="text-white text-4xl md:text-6xl leading-tight mb-8"
              style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}
            >
              Become a Wine Club Member and
              <span className="block mt-2">SAVE 33% on Every Order</span>
            </h2>
            <button
              onClick={() => navigate("member")}
              className="bg-[#DD6D38] hover:bg-[#c55e2e] text-[#FEF6F2] px-10 py-5 text-xl tracking-widest transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 uppercase"
              style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}
            >
              Learn More
            </button>
          </motion.div>
        </div>
      </section>

      {/* Wine Mockup Section */}
      <section className="relative overflow-hidden bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[700px]">
          <div className="relative overflow-hidden">
            <img
              src={imgWineMockup}
              alt="Voyageur wine collection"
              className="w-full h-full object-cover"
              style={{ minHeight: 500 }}
            />
          </div>
          <div className="flex flex-col justify-center px-12 lg:px-20 py-20 bg-white">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p
                className="text-[#979797] text-xs tracking-[0.3em] uppercase mb-6"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                The Diamond Collection
              </p>
              <h2
                className="text-black text-3xl md:text-4xl leading-tight mb-6"
                style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400 }}
              >
                It Takes Time to Make a Diamond.
                <span className="block mt-2 font-light italic" style={{ fontFamily: "'Lora', serif" }}>
                  It takes passion to create a classic.
                </span>
              </h2>
              <p
                className="text-[#555] leading-7 mb-10"
                style={{ fontFamily: "'Lora', serif", fontWeight: 400 }}
              >
                Our award-winning wines are crafted uniquely for every wine occasion, highlighted by our popular Diamond Collection and sparkling wines, to our winery exclusive and limited production Voyageur Fine Wines.
              </p>
              <button
                onClick={() => navigate("shop")}
                className="bg-[#FDD7C5] hover:bg-[#f5c5ae] text-[#87340e] px-10 py-4 tracking-[0.2em] uppercase text-sm transition-all duration-300 hover:shadow-md font-medium"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                Shop Wines
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Champagne Girl / Experience Section */}
      <section className="relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[700px]">
          <div className="flex flex-col justify-center px-12 lg:px-20 py-20 bg-[#87340e] order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2
                className="text-white text-3xl md:text-4xl leading-tight mb-6"
                style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}
              >
                Wine, Food & Adventure!
              </h2>
              <p
                className="text-white/90 leading-7 mb-10"
                style={{ fontFamily: "'Lora', serif", fontWeight: 400 }}
              >
                Join us for a variety of tasting experiences, culinary delights, and special events while touring the vineyard history and enjoying entertainment for the whole family.
              </p>
              <button
                onClick={() => navigate("visit")}
                className="border border-[#DD6D38] bg-[#DD6D38] hover:bg-transparent text-[#FEF6F2] hover:text-[#DD6D38] px-10 py-4 tracking-[0.2em] uppercase text-sm transition-all duration-300"
                style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}
              >
                Visit Us
              </button>
            </motion.div>
          </div>
          <div className="relative overflow-hidden order-1 lg:order-2">
            <img
              src={imgChampagneGirl}
              alt="Celebrating with champagne"
              className="w-full h-full object-cover"
              style={{ minHeight: 500 }}
            />
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="relative min-h-[600px] overflow-hidden flex items-center">
        <img
          src={imgVisitUs}
          alt="The Voyageur estate in Temecula Valley"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#1C2436]/60" />
        <div className="relative z-10 max-w-[800px] mx-auto px-8 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[#FDD7C5] text-xs tracking-[0.4em] uppercase mb-4" style={{ fontFamily: "'Jost', sans-serif" }}>
              About Us · Since 1984
            </p>
            <h2
              className="text-white text-4xl md:text-5xl leading-tight mb-6"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700 }}
            >
              A Family Story, Four Decades Deep
            </h2>
            <p
              className="text-white/90 text-lg leading-8 mb-10"
              style={{ fontFamily: "'Lora', serif" }}
            >
              In 1984 Samuel Altavilla and his family planted their first vines in Temecula, California. Today we still combine those traditional techniques with a modern approach, from grape selection to fermentation and aging.
            </p>
            <button
              onClick={() => navigate("about")}
              className="bg-[#FDD7C5] hover:bg-white text-[#87340e] px-10 py-4 tracking-[0.2em] uppercase text-sm transition-all duration-300 font-medium"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              Our Story
            </button>
          </motion.div>
        </div>
      </section>

      {/* From the Blog */}
      <section className="py-20 px-8 bg-[#F9F5F2]">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-[#979797] text-xs tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "'Jost', sans-serif" }}>
                Learn &amp; explore
              </p>
              <h2 className="text-[#1C1C1C] text-4xl md:text-5xl" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700 }}>
                From the Blog
              </h2>
            </div>
            <button
              onClick={() => navigate("blog")}
              className="self-start md:self-auto text-[#87340e] text-sm tracking-[0.2em] uppercase flex items-center gap-2 hover:gap-3 transition-all"
              style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}
            >
              All articles <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post) => (
              <BlogCard key={post.slug} post={post} onOpen={() => onOpenPost(post.slug)} />
            ))}
          </div>
        </div>
      </section>

      <Footer navigate={navigate} />
    </div>
  );
}

// ─── Shop Page ────────────────────────────────────────────────────────────────
function ShopPage({
  navigate,
  onAddToCart,
  onViewProduct,
}: {
  navigate: (p: Page) => void;
  onAddToCart: (w: Wine) => void;
  onViewProduct: (w: Wine) => void;
}) {
  const [filter, setFilter] = useState<string>("All");
  const [price, setPrice] = useState<string>("Any price");
  const [occasion, setOccasion] = useState<string>("Any occasion");
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const filters = ["All", "Red wine", "White wine", "Sparkling wine"];
  const priceRanges: Record<string, (p: number) => boolean> = {
    "Any price": () => true,
    "Under $50": (p) => p < 50,
    "$50 – $59": (p) => p >= 50 && p < 60,
    "$60 & up": (p) => p >= 60,
  };
  const occasions = ["Any occasion", "Dinner Party", "Gift", "Celebration", "Everyday"];
  const filtered = WINES.filter(
    (w) =>
      (filter === "All" || w.type === filter) &&
      priceRanges[price](w.price) &&
      (occasion === "Any occasion" || w.occasions.includes(occasion as Occasion))
  );
  const resetFilters = () => {
    setFilter("All");
    setPrice("Any price");
    setOccasion("Any occasion");
  };

  const toggleLike = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setLiked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="w-full bg-white">
      {/* Header Banner */}
      <div className="bg-[#404961] pt-24 pb-6 px-8">
        <div className="max-w-[1200px] mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p
              className="text-white/60 text-xs tracking-[0.4em] uppercase mb-2"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              Discover Our Collection
            </p>
            <h1
              className="text-white text-5xl md:text-6xl mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontStyle: "italic" }}
            >
              Fine Wines
            </h1>
            <p
              className="text-[#FDD7C5] text-sm tracking-widest"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              Enjoy 10% Off Orders of 6+ Bottles — Use code '6PLUS'
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[#1C2436] py-4 px-8 sticky top-20 z-40">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-3">
          {[
            { label: "Type", options: filters, value: filter, set: setFilter },
            { label: "Price", options: Object.keys(priceRanges), value: price, set: setPrice },
            { label: "Occasion", options: occasions, value: occasion, set: setOccasion },
          ].map((group) => (
            <div key={group.label} className="flex items-center gap-2 overflow-x-auto">
              <span className="text-white/50 text-xs tracking-[0.2em] uppercase w-20 shrink-0" style={{ fontFamily: "'Jost', sans-serif" }}>
                {group.label}
              </span>
              {group.options.map((f) => (
                <button
                  key={f}
                  onClick={() => group.set(f)}
                  className={`px-4 py-1.5 text-sm tracking-wider shrink-0 transition-all duration-200 ${
                    group.value === f
                      ? "bg-[#DD6D38] text-white"
                      : "text-white/70 hover:text-white border border-white/20 hover:border-white/50"
                  }`}
                  style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}
                >
                  {f}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Wine Grid */}
      <div className="max-w-[1200px] mx-auto px-8 py-16">
        <p className="text-[#979797] text-sm mb-6" style={{ fontFamily: "'Jost', sans-serif" }}>
          {filtered.length} {filtered.length === 1 ? "wine" : "wines"}
        </p>
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#555] mb-6" style={{ fontFamily: "'Lora', serif" }}>
              No wines match those filters yet.
            </p>
            <button
              onClick={resetFilters}
              className="bg-[#DD6D38] hover:bg-[#c55e2e] text-white px-8 py-3 text-sm tracking-widest uppercase transition-colors"
              style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}
            >
              Clear filters
            </button>
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatePresence>
            {filtered.map((wine, i) => (
              <motion.div
                key={wine.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white border border-gray-100 flex flex-col sm:flex-row hover:shadow-xl transition-shadow duration-300 group cursor-pointer"
                onClick={() => onViewProduct(wine)}
              >
                {/* Image */}
                <div className="relative w-full sm:w-[260px] h-[280px] sm:h-[380px] overflow-hidden shrink-0 bg-gray-50">
                  <img
                    src={wine.image}
                    alt={wine.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {wine.badge && (
                    <div className="absolute top-4 left-4 bg-black text-white text-[11px] px-2 py-1 tracking-wider" style={{ fontFamily: "'Jost', sans-serif" }}>
                      {wine.badge}
                    </div>
                  )}
                  <button
                    className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform z-10"
                    onClick={(e) => toggleLike(e, wine.id)}
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors duration-200 ${liked.has(wine.id) ? "text-red-500 fill-red-500" : "text-[#1C1C1C]"}`}
                    />
                  </button>

                </div>

                {/* Info */}
                <div className="flex flex-col justify-between p-6 flex-1">
                  <div>
                    <p className="text-[#979797] text-[11px] tracking-[0.2em] uppercase mb-1" style={{ fontFamily: "'Jost', sans-serif" }}>
                      {wine.type}
                    </p>
                    <p className="text-[#1C1C1C] text-xs font-bold mb-1" style={{ fontFamily: "'Lora', serif" }}>
                      {wine.year}
                    </p>
                    <h3
                      className="text-[#1C1C1C] text-xl leading-tight mb-2 tracking-tight"
                      style={{ fontFamily: "'Lora', serif", fontWeight: 700 }}
                    >
                      {wine.name}
                    </h3>
                    <p className="text-[#87340e] text-sm mb-2" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>
                      {wine.taste}
                    </p>
                    <p className="text-[#555] text-sm leading-6 mb-4 line-clamp-3" style={{ fontFamily: "'Jost', sans-serif" }}>
                      {wine.description}
                    </p>
                    <div className="flex items-center gap-2 mb-4">
                      <StarRating rating={wine.rating} />
                      <span className="text-[#1C1C1C] text-sm underline" style={{ fontFamily: "'Lora', serif" }}>
                        {wine.reviews}
                      </span>
                    </div>
                    <p className="text-[#1C1C1C] text-xl font-medium" style={{ fontFamily: "'Lora', serif" }}>
                      ${wine.price}
                    </p>
                  </div>

                  <button
                    onClick={(e) => { e.stopPropagation(); onAddToCart(wine); }}
                    className="mt-6 w-full bg-[#DD6D38] hover:bg-[#c55e2e] text-white py-4 text-sm tracking-widest uppercase transition-all duration-300 hover:shadow-md"
                    style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}
                  >
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <Footer navigate={navigate} />
    </div>
  );
}

// ─── Product Page ─────────────────────────────────────────────────────────────
function ProductPage({
  wine,
  navigate,
  onAddToCart,
  onViewProduct,
}: {
  wine: Wine;
  navigate: (p: Page) => void;
  onAddToCart: (w: Wine, qty: number) => void;
  onViewProduct: (w: Wine) => void;
}) {
  const recommended = [
    ...WINES.filter((w) => w.id !== wine.id && w.type === wine.type),
    ...WINES.filter((w) => w.id !== wine.id && w.type !== wine.type),
  ].slice(0, 4);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "notes" | "reviews">("description");
  const [lightbox, setLightbox] = useState(false);

  const reviews = [
    { name: "Yuki — Los Angeles, CA", text: "This wine is PERFECT for a night in with the girls! Light, super refreshing, and the citrus notes are amazing. Definitely buying this one again.", image: imgPersona1 },
    { name: "Robin — Austin, TX", text: "Impressed! Crisp, elegant flavor that paired beautifully with the seafood appetizers I served. My guests loved it — a new staple for hosting!", image: imgPersona2 },
    { name: "Carlos — Sarasota, FL", text: "A solid find. Great balance of fruit and acidity, with some intriguing complexity that makes it stand out from the crowd. Excellent value.", image: imgPersona3 },
    { name: "Marie — New York, NY", text: "Beautifully balanced with a lingering finish. This wine transported me to the vineyard with every sip. A truly exceptional experience.", image: imgPersona4 },
  ];

  const handleAdd = () => {
    onAddToCart(wine, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="w-full bg-white">
      {/* Breadcrumb */}
      <div className="bg-[#404961] pt-24 pb-0">
        <div className="max-w-[1200px] mx-auto px-8 py-4">
          <div className="flex items-center gap-2 text-white/60 text-sm" style={{ fontFamily: "'Jost', sans-serif" }}>
            <button onClick={() => navigate("home")} className="hover:text-white transition-colors">Home</button>
            <ChevronRight className="w-3 h-3" />
            <button onClick={() => navigate("shop")} className="hover:text-white transition-colors">Shop</button>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/90">{wine.type}</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">{wine.name}</span>
          </div>
        </div>
      </div>

      {/* Product Detail */}
      <div className="bg-[#87340e] pb-16">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[700px]">
            {/* Image */}
            <div className="relative overflow-hidden group/img">
              <img
                src={wine.image}
                alt={wine.name}
                className="w-full h-full object-cover cursor-zoom-in group-hover/img:scale-105 transition-transform duration-700"
                style={{ minHeight: 600 }}
                onClick={() => setLightbox(true)}
              />
              <button
                className="absolute top-6 left-6 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors"
                onClick={() => navigate("shop")}
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <button className="absolute top-6 right-6 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors">
                <Heart className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={() => setLightbox(true)}
                className="absolute bottom-6 right-6 w-9 h-9 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors opacity-0 group-hover/img:opacity-100"
              >
                <ZoomIn className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
              {lightbox && (
                <motion.div
                  className="fixed inset-0 z-[200] bg-black/92 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setLightbox(false)}
                >
                  <motion.img
                    src={wine.image}
                    alt={wine.name}
                    className="max-h-[90vh] max-w-[90vw] object-contain shadow-2xl"
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.85, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <button
                    className="absolute top-6 right-6 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                    onClick={() => setLightbox(false)}
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Info */}
            <div className="bg-white p-10 lg:p-16 flex flex-col justify-center">
              <p className="text-[#979797] text-xs tracking-[0.3em] uppercase mb-2" style={{ fontFamily: "'Jost', sans-serif" }}>
                {wine.type}
              </p>
              <p className="text-[#1C1C1C] text-sm font-bold mb-2" style={{ fontFamily: "'Lora', serif" }}>
                {wine.year}
              </p>
              <h1
                className="text-[#1C1C1C] text-4xl leading-tight mb-4 tracking-tight"
                style={{ fontFamily: "'Lora', serif", fontWeight: 700 }}
              >
                {wine.name}
              </h1>

              <div className="flex items-center gap-3 mb-6">
                <StarRating rating={wine.rating} />
                <span className="text-[#1C1C1C] text-sm underline" style={{ fontFamily: "'Lora', serif" }}>
                  {wine.reviews} reviews
                </span>
              </div>

              {/* Tabs */}
              <div className="flex gap-0 border-b border-gray-200 mb-6">
                {(["description", "notes", "reviews"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 px-4 text-sm capitalize tracking-wider transition-colors ${
                      activeTab === tab
                        ? "border-b-2 border-[#87340e] text-[#87340e]"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                    style={{ fontFamily: "'Jost', sans-serif" }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="mb-8 min-h-[100px]">
                {activeTab === "description" && (
                  <p className="text-[#555] leading-7 text-sm" style={{ fontFamily: "'Lora', serif" }}>
                    {wine.description}
                  </p>
                )}
                {activeTab === "notes" && (
                  <div className="flex flex-wrap gap-2">
                    {wine.notes.split(" · ").map((note) => (
                      <span
                        key={note}
                        className="bg-[#FDD7C5] text-[#87340e] px-4 py-2 text-sm rounded-full"
                        style={{ fontFamily: "'Jost', sans-serif" }}
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                )}
                {activeTab === "reviews" && (
                  <div className="space-y-3">
                    {reviews.slice(0, 2).map((r) => (
                      <div key={r.name} className="bg-[#F5EFEC] rounded-lg p-4">
                        <StarRating rating={5} small />
                        <p className="text-xs text-[#555] mt-2 leading-5" style={{ fontFamily: "'Jost', sans-serif" }}>
                          "{r.text}"
                        </p>
                        <p className="text-xs text-[#1C1C1C] font-bold mt-2" style={{ fontFamily: "'Jost', sans-serif" }}>
                          {r.name}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Price & Qty */}
              <div className="flex items-center gap-6 mb-8">
                <div>
                  <p className="text-[#1C1C1C] text-3xl font-medium" style={{ fontFamily: "'Lora', serif" }}>
                    ${wine.price}
                  </p>
                  <p className="text-[#979797] text-xs tracking-[0.2em] mt-1" style={{ fontFamily: "'Jost', sans-serif" }}>
                    MEMBER PRICE:{" "}
                    <span className="text-[#87340e]">${wine.memberPrice}</span>
                  </p>
                </div>

                <div className="flex items-center border border-gray-300">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <Minus className="w-4 h-4 text-gray-600" />
                  </button>
                  <span className="w-10 text-center text-sm font-medium" style={{ fontFamily: "'Jost', sans-serif" }}>
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAdd}
                className={`w-full py-5 text-sm tracking-widest uppercase transition-all duration-300 ${
                  added
                    ? "bg-green-600 text-white"
                    : "bg-[#DD6D38] hover:bg-[#c55e2e] text-white hover:shadow-lg"
                }`}
                style={{ fontFamily: "'Jost', sans-serif", fontWeight: 600 }}
              >
                {added ? (
                  <span className="flex items-center justify-center gap-2">
                    <Check className="w-4 h-4" /> Added to Cart
                  </span>
                ) : (
                  "Add to Cart"
                )}
              </button>

              <button
                onClick={() => navigate("member")}
                className="mt-3 text-xs text-center text-[#979797] underline hover:text-[#87340e] transition-colors"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                Join the club to save ${wine.price - wine.memberPrice} on this bottle →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Wine Facts */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-center text-3xl mb-12" style={{ fontFamily: "'Lora', serif", fontWeight: 700 }}>
            Wine Facts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {[
              { label: "Taste Profile", value: wine.taste, detail: wine.notes },
              { label: "Blend", value: wine.blend, detail: `${wine.year} vintage` },
              { label: "Appellation", value: wine.appellation, detail: `${wine.alcohol} alcohol` },
            ].map((f) => (
              <div key={f.label} className="bg-[#F9F5F2] p-8 text-center">
                <p className="text-[#979797] text-xs tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "'Jost', sans-serif" }}>
                  {f.label}
                </p>
                <p className="text-[#1C1C1C] text-xl mb-2" style={{ fontFamily: "'Lora', serif", fontWeight: 700 }}>
                  {f.value}
                </p>
                <p className="text-[#555] text-sm" style={{ fontFamily: "'Jost', sans-serif" }}>
                  {f.detail}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pairs Well With */}
            <div className="border border-gray-100 p-8">
              <h3 className="text-2xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700 }}>
                Pairs Well With
              </h3>
              <ul className="space-y-4">
                {wine.pairings.map((pairing) => (
                  <li key={pairing} className="flex items-center gap-3 text-[#1C1C1C]" style={{ fontFamily: "'Jost', sans-serif" }}>
                    <Check className="w-4 h-4 text-[#DD6D38] shrink-0" />
                    {pairing}
                  </li>
                ))}
              </ul>
            </div>

            {/* Winemaker's Note */}
            <div className="bg-[#1C2436] p-8 flex flex-col justify-center">
              <p className="text-[#FDD7C5] text-xs tracking-[0.3em] uppercase mb-4" style={{ fontFamily: "'Jost', sans-serif" }}>
                Winemaker's Note
              </p>
              <p className="text-white text-xl leading-8 italic" style={{ fontFamily: "'Lora', serif" }}>
                "{wine.winemakerNote}"
              </p>
              <p className="text-white/60 text-sm mt-4" style={{ fontFamily: "'Jost', sans-serif" }}>
                The Altavilla family winemaking team
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 px-8 bg-[#F9F5F2]">
        <div className="max-w-[1200px] mx-auto">
          <h2
            className="text-center text-3xl mb-12"
            style={{ fontFamily: "'Lora', serif", fontWeight: 700 }}
          >
            What Our Members Say
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#F5EFEC] rounded-xl shadow-sm p-6 flex flex-col items-center text-center gap-4"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden shadow-md">
                  <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
                </div>
                <StarRating rating={5} small />
                <p className="text-xs text-[#333] leading-5" style={{ fontFamily: "'Jost', sans-serif" }}>
                  "{r.text}"
                </p>
                <p className="text-xs font-bold text-[#1C1C1C]" style={{ fontFamily: "'Jost', sans-serif" }}>
                  {r.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Products */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-center text-3xl mb-12" style={{ fontFamily: "'Lora', serif", fontWeight: 700 }}>
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommended.map((w) => (
              <WineTile key={w.id} wine={w} onAddToCart={(x) => onAddToCart(x, 1)} onViewProduct={onViewProduct} />
            ))}
          </div>
        </div>
      </section>

      <Footer navigate={navigate} />
    </div>
  );
}

// ─── Cart Page ────────────────────────────────────────────────────────────────
function CartPage({
  cart,
  navigate,
  onUpdate,
  onRemove,
}: {
  cart: CartItem[];
  navigate: (p: Page) => void;
  onUpdate: (id: number, qty: number) => void;
  onRemove: (id: number) => void;
}) {
  const subtotal = cart.reduce((sum, { wine, quantity }) => sum + wine.price * quantity, 0);
  const shipping = subtotal > 75 ? 0 : 15;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="w-full min-h-screen bg-white flex flex-col items-center justify-center pt-20 px-8">
        <div className="text-center max-w-md">
          <ShoppingBag className="w-16 h-16 text-gray-200 mx-auto mb-6" />
          <h2 className="text-2xl text-gray-800 mb-4" style={{ fontFamily: "'Lora', serif", fontWeight: 700 }}>
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-8 text-sm" style={{ fontFamily: "'Jost', sans-serif" }}>
            Discover our award-winning wines and start your journey.
          </p>
          <button
            onClick={() => navigate("shop")}
            className="bg-[#87340e] hover:bg-[#6d2a0a] text-white px-10 py-4 tracking-widest uppercase text-sm transition-colors"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            Browse Wines
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white">
      <div className="bg-[#404961] pt-24 pb-8 px-8">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="text-white text-4xl" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontStyle: "italic" }}>
            Your Cart
          </h1>
          <p className="text-white/60 text-sm mt-2" style={{ fontFamily: "'Jost', sans-serif" }}>
            {cart.reduce((s, c) => s + c.quantity, 0)} items
          </p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map(({ wine, quantity }) => (
              <motion.div
                key={wine.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex gap-6 pb-6 border-b border-gray-100"
              >
                <div
                  className="w-24 h-28 shrink-0 overflow-hidden cursor-pointer"
                  onClick={() => navigate("product")}
                >
                  <img
                    src={wine.image}
                    alt={wine.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-[#979797] text-[10px] tracking-[0.2em] uppercase" style={{ fontFamily: "'Jost', sans-serif" }}>
                      {wine.type} · {wine.year}
                    </p>
                    <h3 className="text-[#1C1C1C] text-base font-semibold mt-1" style={{ fontFamily: "'Lora', serif" }}>
                      {wine.name}
                    </h3>
                    <p className="text-[#1C1C1C] text-sm mt-1" style={{ fontFamily: "'Lora', serif" }}>
                      ${wine.price} each
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-gray-200">
                      <button
                        onClick={() => onUpdate(wine.id, Math.max(1, quantity - 1))}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-50"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-sm" style={{ fontFamily: "'Jost', sans-serif" }}>
                        {quantity}
                      </span>
                      <button
                        onClick={() => onUpdate(wine.id, quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-50"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button
                      onClick={() => onRemove(wine.id)}
                      className="text-gray-300 hover:text-red-400 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[#1C1C1C] text-base font-medium" style={{ fontFamily: "'Lora', serif" }}>
                    ${(wine.price * quantity).toFixed(0)}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Club Promo */}
            <div className="bg-[#F5EFEC] rounded-xl p-6 flex gap-4 items-start">
              <img src={imgStamp} alt="Club stamp" className="w-16 h-16 object-contain shrink-0" />
              <div>
                <p className="text-[#87340e] text-sm font-bold mb-1" style={{ fontFamily: "'Jost', sans-serif" }}>
                  Save 33% with Wine Club Membership
                </p>
                <p className="text-[#555] text-xs leading-5" style={{ fontFamily: "'Jost', sans-serif" }}>
                  Your cart qualifies for member pricing. Join the club to save ${cart.reduce((s, { wine, quantity }) => s + (wine.price - wine.memberPrice) * quantity, 0)} on this order.
                </p>
                <button
                  onClick={() => navigate("member")}
                  className="mt-3 text-xs underline text-[#87340e] hover:text-[#6d2a0a]"
                  style={{ fontFamily: "'Jost', sans-serif" }}
                >
                  Join now →
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-8 sticky top-28">
              <h2 className="text-xl font-semibold mb-6" style={{ fontFamily: "'Lora', serif" }}>
                Order Summary
              </h2>
              <div className="space-y-4 text-sm" style={{ fontFamily: "'Jost', sans-serif" }}>
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping}.00`}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-[#87340e] text-xs">
                    Add ${(75 - subtotal).toFixed(0)} more for free shipping
                  </p>
                )}
                <div className="border-t border-gray-200 pt-4 flex justify-between font-semibold text-base">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => navigate("checkout")}
                className="mt-8 w-full bg-[#87340e] hover:bg-[#6d2a0a] text-white py-5 tracking-widest uppercase text-sm transition-colors font-medium"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                Proceed to Checkout
              </button>
              <button
                onClick={() => navigate("shop")}
                className="mt-3 w-full border border-gray-200 hover:border-gray-400 text-gray-600 py-4 tracking-widest uppercase text-xs transition-colors"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer navigate={navigate} />
    </div>
  );
}

// ─── Checkout Page ────────────────────────────────────────────────────────────
function CheckoutPage({
  cart,
  navigate,
  onComplete,
}: {
  cart: CartItem[];
  navigate: (p: Page) => void;
  onComplete: () => void;
}) {
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState({
    email: "", first: "", last: "", address: "", city: "", state: "", zip: "",
    cardNumber: "", expiry: "", cvv: "", cardName: "",
  });

  const subtotal = cart.reduce((s, { wine, quantity }) => s + wine.price * quantity, 0);
  const total = subtotal + (subtotal > 75 ? 0 : 15);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const inputClass = "w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#87340e] transition-colors bg-white";
  const labelClass = "block text-xs tracking-[0.15em] uppercase text-gray-500 mb-2";

  return (
    <div className="w-full bg-white">
      <div className="bg-[#1C2436] pt-24 pb-8 px-8">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="text-white text-4xl" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontStyle: "italic" }}>
            Checkout
          </h1>
          {/* Step indicator */}
          <div className="flex items-center gap-4 mt-4">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    step >= s ? "bg-[#DD6D38] text-white" : "bg-white/20 text-white/50"
                  }`}
                  style={{ fontFamily: "'Jost', sans-serif" }}
                >
                  {step > s ? <Check className="w-3 h-3" /> : s}
                </div>
                <span className={`text-xs tracking-wider ${step >= s ? "text-white" : "text-white/40"}`} style={{ fontFamily: "'Jost', sans-serif" }}>
                  {s === 1 ? "Shipping" : "Payment"}
                </span>
                {s < 2 && <ChevronRight className="w-3 h-3 text-white/30" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="text-xl font-semibold mb-8" style={{ fontFamily: "'Lora', serif" }}>Shipping Information</h2>
                <div className="space-y-6">
                  <div>
                    <label className={labelClass} style={{ fontFamily: "'Jost', sans-serif" }}>Email Address</label>
                    <input type="email" className={inputClass} value={form.email} onChange={set("email")} placeholder="your@email.com" style={{ fontFamily: "'Jost', sans-serif" }} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass} style={{ fontFamily: "'Jost', sans-serif" }}>First Name</label>
                      <input type="text" className={inputClass} value={form.first} onChange={set("first")} style={{ fontFamily: "'Jost', sans-serif" }} />
                    </div>
                    <div>
                      <label className={labelClass} style={{ fontFamily: "'Jost', sans-serif" }}>Last Name</label>
                      <input type="text" className={inputClass} value={form.last} onChange={set("last")} style={{ fontFamily: "'Jost', sans-serif" }} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass} style={{ fontFamily: "'Jost', sans-serif" }}>Street Address</label>
                    <input type="text" className={inputClass} value={form.address} onChange={set("address")} style={{ fontFamily: "'Jost', sans-serif" }} />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className={labelClass} style={{ fontFamily: "'Jost', sans-serif" }}>City</label>
                      <input type="text" className={inputClass} value={form.city} onChange={set("city")} style={{ fontFamily: "'Jost', sans-serif" }} />
                    </div>
                    <div>
                      <label className={labelClass} style={{ fontFamily: "'Jost', sans-serif" }}>State</label>
                      <input type="text" className={inputClass} value={form.state} onChange={set("state")} placeholder="CA" style={{ fontFamily: "'Jost', sans-serif" }} />
                    </div>
                    <div>
                      <label className={labelClass} style={{ fontFamily: "'Jost', sans-serif" }}>ZIP</label>
                      <input type="text" className={inputClass} value={form.zip} onChange={set("zip")} style={{ fontFamily: "'Jost', sans-serif" }} />
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="mt-10 w-full bg-[#87340e] hover:bg-[#6d2a0a] text-white py-5 tracking-widest uppercase text-sm transition-colors"
                  style={{ fontFamily: "'Jost', sans-serif" }}
                >
                  Continue to Payment
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="flex items-center gap-3 mb-8">
                  <button onClick={() => setStep(1)} className="text-gray-400 hover:text-gray-700 transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <h2 className="text-xl font-semibold" style={{ fontFamily: "'Lora', serif" }}>Payment Details</h2>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className={labelClass} style={{ fontFamily: "'Jost', sans-serif" }}>Name on Card</label>
                    <input type="text" className={inputClass} value={form.cardName} onChange={set("cardName")} style={{ fontFamily: "'Jost', sans-serif" }} />
                  </div>
                  <div>
                    <label className={labelClass} style={{ fontFamily: "'Jost', sans-serif" }}>Card Number</label>
                    <input type="text" className={inputClass} value={form.cardNumber} onChange={set("cardNumber")} placeholder="1234 5678 9012 3456" maxLength={19} style={{ fontFamily: "'Jost', sans-serif" }} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass} style={{ fontFamily: "'Jost', sans-serif" }}>Expiry Date</label>
                      <input type="text" className={inputClass} value={form.expiry} onChange={set("expiry")} placeholder="MM / YY" maxLength={7} style={{ fontFamily: "'Jost', sans-serif" }} />
                    </div>
                    <div>
                      <label className={labelClass} style={{ fontFamily: "'Jost', sans-serif" }}>CVV</label>
                      <input type="text" className={inputClass} value={form.cvv} onChange={set("cvv")} placeholder="123" maxLength={4} style={{ fontFamily: "'Jost', sans-serif" }} />
                    </div>
                  </div>
                </div>
                <button
                  onClick={onComplete}
                  className="mt-10 w-full bg-[#87340e] hover:bg-[#6d2a0a] text-white py-5 tracking-widest uppercase text-sm transition-colors font-medium"
                  style={{ fontFamily: "'Jost', sans-serif" }}
                >
                  Place Order — ${total.toFixed(2)}
                </button>
              </motion.div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-8">
              <h2 className="text-base font-semibold mb-6" style={{ fontFamily: "'Jost', sans-serif", letterSpacing: "0.1em" }}>
                ORDER SUMMARY
              </h2>
              <div className="space-y-4 mb-6">
                {cart.map(({ wine, quantity }) => (
                  <div key={wine.id} className="flex gap-3 items-center">
                    <div className="w-12 h-14 overflow-hidden shrink-0">
                      <img src={wine.image} alt={wine.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate" style={{ fontFamily: "'Lora', serif" }}>{wine.name}</p>
                      <p className="text-xs text-gray-400" style={{ fontFamily: "'Jost', sans-serif" }}>Qty: {quantity}</p>
                    </div>
                    <p className="text-xs font-medium" style={{ fontFamily: "'Lora', serif" }}>${wine.price * quantity}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-4 space-y-2 text-sm" style={{ fontFamily: "'Jost', sans-serif" }}>
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Shipping</span><span>{subtotal > 75 ? "Free" : "$15.00"}</span>
                </div>
                <div className="flex justify-between font-bold text-base pt-2 border-t border-gray-200">
                  <span>Total</span><span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Confirmation Page ────────────────────────────────────────────────────────
function ConfirmationPage({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <div className="w-full min-h-screen bg-[#F9F5F2] flex flex-col items-center justify-center pt-20 px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-lg"
      >
        <div className="w-20 h-20 rounded-full bg-[#87340e] flex items-center justify-center mx-auto mb-8">
          <Check className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl text-[#1C1C1C] mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700 }}>
          Order Confirmed
        </h1>
        <p className="text-[#555] leading-7 mb-2" style={{ fontFamily: "'Lora', serif" }}>
          Thank you for your order. We're preparing your Voyageur wines with care.
        </p>
        <p className="text-[#979797] text-sm mb-10" style={{ fontFamily: "'Jost', sans-serif" }}>
          A confirmation email will be sent to you shortly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("shop")}
            className="bg-[#87340e] hover:bg-[#6d2a0a] text-white px-10 py-4 tracking-widest uppercase text-sm transition-colors"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            Continue Shopping
          </button>
          <button
            onClick={() => navigate("member")}
            className="border border-[#87340e] text-[#87340e] hover:bg-[#87340e] hover:text-white px-10 py-4 tracking-widest uppercase text-sm transition-colors"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            Join the Club
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Member Page ──────────────────────────────────────────────────────────────
function MemberPage({ navigate }: { navigate: (p: Page) => void }) {
  const [joined, setJoined] = useState(false);
  const [plan, setPlan] = useState<"monthly" | "quarterly" | "annual">("quarterly");
  const plans = {
    monthly: { label: "Monthly", savings: "33%", price: "$69/mo", bottles: "2 bottles a month", perks: "2 curated bottles monthly (about $104 at retail) · Free shipping · 33% off every order · Early access to new releases" },
    quarterly: { label: "Quarterly", savings: "35%", price: "$199/qtr", bottles: "6 bottles a quarter", perks: "6 curated bottles quarterly (about $312 at retail) · Free shipping · 33% off every order · Exclusive member events" },
    annual: { label: "Annual", savings: "40%", price: "$749/yr", bottles: "24 bottles a year", perks: "4 shipments of 6 bottles (about $1,248 at retail) · Free shipping · 33% off every order · VIP estate experiences" },
  };

  return (
    <div className="w-full bg-white">
      {/* Hero */}
      <section className="relative min-h-[600px] flex items-center overflow-hidden">
        <img src={imgHero} alt="Vineyard" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#1C2436]/70" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-8 pt-20 pb-8 w-full">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-[#DD6D38] text-xs tracking-[0.4em] uppercase mb-4" style={{ fontFamily: "'Jost', sans-serif" }}>
                Exclusive Membership
              </p>
              <h1
                className="text-white text-5xl md:text-7xl leading-none mb-6"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700 }}
              >
                Join the<br />
                <span className="italic">Wine Club</span>
              </h1>
              <p className="text-white/80 text-lg leading-7 mb-8" style={{ fontFamily: "'Lora', serif" }}>
                Save 33% on every order, receive curated selections, and gain access to exclusive member-only experiences at our Temecula estate.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-8 bg-[#F9F5F2]">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-center text-3xl mb-16" style={{ fontFamily: "'Lora', serif", fontWeight: 700 }}>
            Member Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Save 33%", desc: "On every bottle in our collection. Members always pay less.", Icon: Wine },
              { title: "Curated Selection", desc: "Hand-selected bottles delivered to your door, chosen by our winemakers.", Icon: Package },
              { title: "VIP Access", desc: "Early access to new releases, exclusive events, and estate tastings.", Icon: Sparkles },
            ].map((b) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center p-10 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <b.Icon className="text-[#87340e] mx-auto mb-4" width={48} height={48} strokeWidth={1.5} />
                <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "'Lora', serif" }}>{b.title}</h3>
                <p className="text-[#555] text-sm leading-6" style={{ fontFamily: "'Jost', sans-serif" }}>{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Wine Feature */}
      <section className="bg-[#87340e] py-20 px-8">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex justify-center">
            <div className="relative">
              <img
                src={imgMemberWine}
                alt="Voyageur wine selection"
                className="w-72 h-96 object-cover shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img src={imgMemberPerson} alt="Member" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
          <div>
            <p className="text-[#FDD7C5] text-xs tracking-[0.3em] uppercase mb-4" style={{ fontFamily: "'Jost', sans-serif" }}>
              Member Exclusive
            </p>
            <h2 className="text-white text-4xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700 }}>
              Curated for You
            </h2>
            <p className="text-white/80 leading-7 mb-6" style={{ fontFamily: "'Lora', serif" }}>
              Every shipment is hand-selected by our winemakers to ensure you receive the finest expressions of our estate. From award-winning Pinot Gris to our coveted Diamond Collection, membership unlocks the full range.
            </p>
            <ul className="space-y-2 mb-8">
              {["No commitment — cancel anytime", "Flexible delivery schedule", "Members-only vineyard events", "Personal tasting notes with each shipment"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-white/90 text-sm" style={{ fontFamily: "'Jost', sans-serif" }}>
                  <Check className="w-4 h-4 text-[#DD6D38] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Plan Selector */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-center text-3xl mb-4" style={{ fontFamily: "'Lora', serif", fontWeight: 700 }}>
            Choose Your Plan
          </h2>
          <p className="text-center text-[#555] mb-12 text-sm" style={{ fontFamily: "'Jost', sans-serif" }}>
            All plans include free shipping and member-only pricing.
          </p>

          <div className="grid grid-cols-3 gap-4 mb-12">
            {(["monthly", "quarterly", "annual"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPlan(p)}
                className={`p-6 border-2 text-center transition-all ${
                  plan === p
                    ? "border-[#87340e] bg-[#FEF6F2]"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <p className="text-xs tracking-widest uppercase mb-2 text-[#979797]" style={{ fontFamily: "'Jost', sans-serif" }}>
                  {plans[p].label}
                </p>
                <p className="text-2xl font-bold text-[#1C1C1C]" style={{ fontFamily: "'Lora', serif" }}>
                  {plans[p].savings}
                </p>
                <p className="text-sm text-[#87340e] mt-1" style={{ fontFamily: "'Jost', sans-serif" }}>
                  {plans[p].price}
                </p>
                <p className="text-xs text-[#555] mt-1" style={{ fontFamily: "'Jost', sans-serif" }}>
                  {plans[p].bottles}
                </p>
                {p === "quarterly" && (
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#DD6D38] mt-2" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 600 }}>
                    Most popular
                  </p>
                )}
              </button>
            ))}
          </div>

          <div className="bg-[#F9F5F2] p-8 mb-10">
            <p className="text-sm text-[#555] leading-6" style={{ fontFamily: "'Jost', sans-serif" }}>
              <strong className="text-[#1C1C1C]">Included: </strong>
              {plans[plan].perks}
            </p>
          </div>

          {joined ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-8 bg-green-50 border border-green-200"
            >
              <Check className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <p className="text-green-800 font-semibold" style={{ fontFamily: "'Jost', sans-serif" }}>
                Welcome to the Voyageur Wine Club!
              </p>
              <p className="text-green-600 text-sm mt-1" style={{ fontFamily: "'Jost', sans-serif" }}>
                Your first shipment will arrive within 5–7 business days.
              </p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#87340e] bg-white"
                  style={{ fontFamily: "'Jost', sans-serif" }}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#87340e] bg-white"
                  style={{ fontFamily: "'Jost', sans-serif" }}
                />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#87340e] bg-white"
                style={{ fontFamily: "'Jost', sans-serif" }}
              />
              <button
                onClick={() => setJoined(true)}
                className="w-full bg-[#87340e] hover:bg-[#6d2a0a] text-white py-5 tracking-widest uppercase text-sm transition-colors font-medium"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                Join {plans[plan].label} — Save {plans[plan].savings}
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer navigate={navigate} />
    </div>
  );
}

// ─── About Page ───────────────────────────────────────────────────────────────
function AboutPage({ navigate }: { navigate: (p: Page) => void }) {
  const steps = [
    {
      title: "Grape Selection",
      desc: "Every cluster is hand-picked from our Temecula Valley vineyards at the moment of ideal ripeness, then sorted by hand before it reaches the winery.",
    },
    {
      title: "Fermentation",
      desc: "Traditional methods meet modern precision. Each lot is fermented on its own so we can follow its character from the first day.",
    },
    {
      title: "Aging",
      desc: "Our reds and reserve whites rest in French oak barrels until they are ready, never on a schedule, so every bottle shows its best.",
    },
  ];

  return (
    <div className="w-full bg-white">
      {/* Hero */}
      <section className="relative min-h-[600px] flex items-end overflow-hidden">
        <img src={imgHero} alt="Voyageur vineyards in Temecula Valley" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C2436]/90 via-[#1C2436]/40 to-[#1C2436]/30" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-8 pb-20 pt-32 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-[#FDD7C5] text-xs tracking-[0.4em] uppercase mb-4" style={{ fontFamily: "'Jost', sans-serif" }}>
              About Us · Since 1984
            </p>
            <h1 className="text-white text-5xl md:text-7xl leading-none mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700 }}>
              Our <span className="italic">Story</span>
            </h1>
            <p className="text-white/85 text-lg leading-8 max-w-2xl" style={{ fontFamily: "'Lora', serif" }}>
              Four decades of the Altavilla family, one valley, and a lifelong pursuit of exceptional wine.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Founding */}
      <section className="py-24 px-8">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[#979797] text-xs tracking-[0.3em] uppercase mb-4" style={{ fontFamily: "'Jost', sans-serif" }}>
              1984 · Temecula, California
            </p>
            <h2 className="text-4xl md:text-5xl leading-tight mb-8" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700 }}>
              It Began With a Family and a Few Rows of Vines
            </h2>
            <div className="space-y-5 text-[#555] leading-8" style={{ fontFamily: "'Lora', serif" }}>
              <p>
                Voyageur Fine Wines was founded in 1984 by Samuel Altavilla, when his family planted their first vineyards in Temecula, California.
              </p>
              <p>
                Since then the family has perfected its grapes and honed its winemaking, earning a reputation for excellence by combining traditional techniques with a modern, innovative process.
              </p>
              <p>
                Today Voyageur crafts and curates a range of premium wines from renowned vineyards across Southern California, each one made to showcase the rich terroir of the region.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <img src={imgVisitUs} alt="The Voyageur estate" className="w-full h-[520px] object-cover shadow-2xl" />
            <div className="absolute -bottom-6 -left-6 bg-[#87340e] text-white px-8 py-6 shadow-xl">
              <p className="text-5xl leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700 }}>
                1984
              </p>
              <p className="text-xs tracking-[0.3em] uppercase mt-2 text-[#FDD7C5]" style={{ fontFamily: "'Jost', sans-serif" }}>
                First vines planted
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* From Vine to Glass */}
      <section className="py-24 px-8 bg-[#F9F5F2]">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-center text-4xl md:text-5xl mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700 }}>
            From Vine to Glass
          </h2>
          <p className="text-center text-[#555] mb-16 max-w-xl mx-auto" style={{ fontFamily: "'Jost', sans-serif" }}>
            Every step is carefully executed to ensure the highest quality.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white p-10"
              >
                <p className="text-[#DD6D38] text-5xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700 }}>
                  0{i + 1}
                </p>
                <h3 className="text-xl mb-3" style={{ fontFamily: "'Lora', serif", fontWeight: 700 }}>{step.title}</h3>
                <p className="text-[#555] text-sm leading-6" style={{ fontFamily: "'Jost', sans-serif" }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 px-8 bg-[#87340e] text-center">
        <div className="max-w-[900px] mx-auto">
          <p className="text-white text-3xl md:text-4xl leading-snug italic mb-10" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            "We believe wine has the power to create meaningful connections, enhance special moments, and evoke a sense of discovery and exploration."
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("shop")}
              className="bg-[#DD6D38] hover:bg-[#c55e2e] text-white px-10 py-4 tracking-[0.2em] uppercase text-sm transition-colors"
              style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}
            >
              Shop Our Wines
            </button>
            <button
              onClick={() => navigate("visit")}
              className="border border-white/60 hover:border-white text-white px-10 py-4 tracking-[0.2em] uppercase text-sm transition-colors hover:bg-white/10"
              style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}
            >
              Visit the Estate
            </button>
          </div>
        </div>
      </section>

      <Footer navigate={navigate} />
    </div>
  );
}

// ─── Blog Page ────────────────────────────────────────────────────────────────
function BlogPage({
  navigate,
  postSlug,
  onOpenPost,
}: {
  navigate: (p: Page) => void;
  postSlug: string | null;
  onOpenPost: (slug: string | null) => void;
}) {
  const post = BLOG_POSTS.find((p) => p.slug === postSlug);

  return (
    <div className="w-full bg-white">
      <div className="bg-[#404961] pt-28 pb-12 px-8">
        <div className="max-w-[1200px] mx-auto text-center">
          <p className="text-white/60 text-xs tracking-[0.4em] uppercase mb-2" style={{ fontFamily: "'Jost', sans-serif" }}>
            {post ? post.category : "Wine education, pairings & stories"}
          </p>
          <h1 className="text-white text-4xl md:text-6xl" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontStyle: "italic" }}>
            {post ? post.title : "The Voyageur Blog"}
          </h1>
        </div>
      </div>

      {post ? (
        <article className="max-w-[760px] mx-auto px-8 py-16">
          <button
            onClick={() => onOpenPost(null)}
            className="flex items-center gap-2 text-[#87340e] text-sm tracking-[0.2em] uppercase mb-10"
            style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}
          >
            <ArrowLeft className="w-4 h-4" /> All articles
          </button>
          <img src={post.image} alt={post.title} className="w-full h-[380px] object-cover mb-10" />
          <p className="text-[#979797] text-xs tracking-[0.3em] uppercase mb-6" style={{ fontFamily: "'Jost', sans-serif" }}>
            {post.readTime}
          </p>
          <div className="space-y-6 text-[#333] text-lg leading-8" style={{ fontFamily: "'Lora', serif" }}>
            {post.body.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
          <div className="mt-14 bg-[#F9F5F2] p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <p className="text-[#1C1C1C] text-lg" style={{ fontFamily: "'Lora', serif", fontWeight: 700 }}>
              Ready to put it into practice?
            </p>
            <button
              onClick={() => navigate("shop")}
              className="bg-[#DD6D38] hover:bg-[#c55e2e] text-white px-8 py-3 text-sm tracking-widest uppercase transition-colors"
              style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}
            >
              Shop Wines
            </button>
          </div>
        </article>
      ) : (
        <div className="max-w-[1200px] mx-auto px-8 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((p) => (
            <BlogCard key={p.slug} post={p} onOpen={() => onOpenPost(p.slug)} />
          ))}
        </div>
      )}

      <Footer navigate={navigate} />
    </div>
  );
}

// ─── Visit Page ───────────────────────────────────────────────────────────────
const PHOTOS = {
  hero:       "https://images.unsplash.com/photo-1778506800260-2bd8aa6cc42d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1800&q=80",
  barrelRoom: "https://images.unsplash.com/photo-1534655882117-f9eff36a1574?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
  tastingRoom:"https://images.unsplash.com/photo-1663788913186-cff79c65e7f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
  terrace:    "https://images.unsplash.com/photo-1784230804391-371d10702a54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
  vineyard:   "https://images.unsplash.com/photo-1767034232356-1874e4a36cd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
  estate:     "https://images.unsplash.com/photo-1762926627557-2b1697529767?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
  dining:     "https://images.unsplash.com/photo-1662495051087-3266e9608efd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
  barrels:    "https://images.unsplash.com/photo-1572913017567-02f0649bc4fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
};

const EXPERIENCES = [
  {
    title: "Estate Tasting",
    desc: "Explore our flagship wines in our sun-drenched tasting room. Guided flights with our sommeliers walk you through each vintage, terroir, and the story behind every bottle.",
    hours: "Daily 10am – 5pm",
    price: "$35 per person",
    img: PHOTOS.tastingRoom,
    tag: "Most Popular",
  },
  {
    title: "Vineyard Tour",
    desc: "Walk the rows with our winemakers. Learn how our estate grapes grow, the seasonal rhythms of the vine, and how the soil of Temecula Valley shapes our wines.",
    hours: "Sat & Sun 11am & 2pm",
    price: "$55 per person",
    img: PHOTOS.vineyard,
    tag: "Guided",
  },
  {
    title: "Barrel Room Experience",
    desc: "Descend into the cave and taste directly from the barrel. An intimate look at wines still in development — the closest you can get to the winemaker's art.",
    hours: "By reservation",
    price: "$75 per person",
    img: PHOTOS.barrelRoom,
    tag: "Exclusive",
  },
  {
    title: "Terrace Dining",
    desc: "Pair our wines with seasonal small plates on our canopied terrace, surrounded by the vines. Perfect for anniversaries, celebrations, or a long afternoon well spent.",
    hours: "Fri – Sun 12pm – 8pm",
    price: "À la carte",
    img: PHOTOS.terrace,
    tag: "Dining",
  },
];

const EVENTS = [
  { date: "Aug 3", title: "Harvest Sunset Dinner", desc: "Five-course dinner under the stars paired with library vintages.", img: PHOTOS.dining },
  { date: "Aug 17", title: "Winemakers Masterclass", desc: "A deep dive into blending with our head winemaker. Hands-on and intimate.", img: PHOTOS.barrels },
  { date: "Sep 6", title: "Jazz in the Vineyard", desc: "Live jazz, charcuterie boards, and our best rosés in the estate gardens.", img: PHOTOS.estate },
];

function VisitPage({ navigate }: { navigate: (p: Page) => void }) {
  const [activeExp, setActiveExp] = useState(0);
  const [formSent, setFormSent] = useState(false);

  return (
    <div className="w-full bg-white">

      {/* ── Hero ── */}
      <section className="relative h-screen min-h-[680px] flex items-end overflow-hidden">
        <img src={PHOTOS.hero} alt="Voyageur vineyard" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C2436] via-[#1C2436]/40 to-transparent" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-8 pb-20 w-full">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.22,1,0.36,1] }}>
            <p className="text-[#DD6D38] text-xs tracking-[0.5em] uppercase mb-4" style={{ fontFamily: "'Jost', sans-serif" }}>
              Temecula Valley · California
            </p>
            <h1 className="text-white text-6xl md:text-8xl leading-none mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700 }}>
              Come & Stay<br /><span className="italic">A While</span>
            </h1>
            <p className="text-white/80 text-lg max-w-xl leading-7 mb-10" style={{ fontFamily: "'Lora', serif" }}>
              Open daily. Tastings, tours, dining, and events in the heart of Southern California wine country.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#experiences" onClick={(e) => { e.preventDefault(); document.getElementById("experiences")?.scrollIntoView({ behavior: "smooth" }); }} className="bg-[#DD6D38] hover:bg-[#c55e2e] text-white px-8 py-4 tracking-widest uppercase text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl" style={{ fontFamily: "'Jost', sans-serif" }}>
                Explore Experiences
              </a>
              <a href="#reserve" onClick={(e) => { e.preventDefault(); document.getElementById("reserve")?.scrollIntoView({ behavior: "smooth" }); }} className="border border-white/60 hover:border-white text-white px-8 py-4 tracking-widest uppercase text-sm transition-all duration-300 hover:bg-white/10" style={{ fontFamily: "'Jost', sans-serif" }}>
                Make a Reservation
              </a>
            </div>
          </motion.div>
        </div>

        {/* Quick info strip */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#1C2436]/90 backdrop-blur-sm">
          <div className="max-w-[1200px] mx-auto px-8 py-5 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <MapPin />, label: "Address", value: "32720 Rancho California Rd, Temecula, CA" },
              { icon: <Clock />, label: "Hours", value: "Mon–Thu 10–5 · Fri–Sun 10–7" },
              { icon: <Phone />, label: "Phone", value: "+1 (800) 000-0000" },
              { icon: <Car />, label: "Parking", value: "Free on-site · Valet Fri & Sat" },
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex items-start gap-3">
                <span className="text-[#DD6D38] mt-0.5 shrink-0 w-4 h-4">{icon}</span>
                <div>
                  <p className="text-white/40 text-[10px] tracking-[0.2em] uppercase" style={{ fontFamily: "'Jost', sans-serif" }}>{label}</p>
                  <p className="text-white/90 text-xs leading-5 mt-0.5" style={{ fontFamily: "'Jost', sans-serif" }}>{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Experiences ── */}
      <section id="experiences" className="py-24 px-8 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16">
            <div>
              <p className="text-[#DD6D38] text-xs tracking-[0.4em] uppercase mb-3" style={{ fontFamily: "'Jost', sans-serif" }}>What We Offer</p>
              <h2 className="text-4xl md:text-5xl" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700 }}>
                Experiences
              </h2>
            </div>
            <p className="text-[#555] text-sm max-w-sm leading-6" style={{ fontFamily: "'Jost', sans-serif" }}>
              Every visit is tailored to your pace. Wander at leisure or book a guided experience with our team.
            </p>
          </div>

          {/* Tab selector */}
          <div className="flex gap-0 border-b border-gray-200 mb-10 overflow-x-auto">
            {EXPERIENCES.map((e, i) => (
              <button
                key={e.title}
                onClick={() => setActiveExp(i)}
                className={`px-6 py-4 text-sm tracking-wider shrink-0 transition-all duration-200 border-b-2 ${
                  activeExp === i
                    ? "border-[#87340e] text-[#87340e]"
                    : "border-transparent text-gray-400 hover:text-gray-700"
                }`}
                style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}
              >
                {e.title}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {(() => {
              const exp = EXPERIENCES[activeExp];
              return (
                <motion.div
                  key={exp.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[480px]"
                >
                  <div className="relative overflow-hidden">
                    <img src={exp.img} alt={exp.title} className="w-full h-full object-cover min-h-[360px]" />
                    <div className="absolute top-6 left-6 bg-[#87340e] text-white text-xs px-3 py-1.5 tracking-widest uppercase" style={{ fontFamily: "'Jost', sans-serif" }}>
                      {exp.tag}
                    </div>
                  </div>
                  <div className="bg-[#F9F5F2] p-10 lg:p-16 flex flex-col justify-center">
                    <h3 className="text-3xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700 }}>{exp.title}</h3>
                    <p className="text-[#555] leading-7 mb-8 text-base" style={{ fontFamily: "'Lora', serif" }}>{exp.desc}</p>
                    <div className="flex flex-col gap-3 mb-10">
                      <div className="flex items-center gap-3 text-sm text-[#1C1C1C]" style={{ fontFamily: "'Jost', sans-serif" }}>
                        <Clock className="w-4 h-4 text-[#87340e] shrink-0" />
                        {exp.hours}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-[#1C1C1C]" style={{ fontFamily: "'Jost', sans-serif" }}>
                        <Tag className="w-4 h-4 text-[#87340e] shrink-0" />
                        {exp.price}
                      </div>
                    </div>
                    <a href="#reserve" onClick={(e) => { e.preventDefault(); document.getElementById("reserve")?.scrollIntoView({ behavior: "smooth" }); }} className="inline-block bg-[#87340e] hover:bg-[#6d2a0a] text-white text-center py-4 px-8 tracking-widest uppercase text-sm transition-colors" style={{ fontFamily: "'Jost', sans-serif" }}>
                      Reserve a Spot
                    </a>
                  </div>
                </motion.div>
              );
            })()}
          </AnimatePresence>
        </div>
      </section>

      {/* ── Photo Grid ── */}
      <section className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 h-[600px]">
        {[
          { src: PHOTOS.estate,     cls: "col-span-2 row-span-2" },
          { src: PHOTOS.barrelRoom, cls: "col-span-1 row-span-1" },
          { src: PHOTOS.terrace,    cls: "col-span-1 row-span-1" },
          { src: PHOTOS.vineyard,   cls: "col-span-1 row-span-1" },
          { src: PHOTOS.dining,     cls: "col-span-1 row-span-1" },
        ].map(({ src, cls }, i) => (
          <div key={i} className={`${cls} overflow-hidden relative group`}>
            <img src={src} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-[#1C2436]/0 group-hover:bg-[#1C2436]/20 transition-colors duration-500" />
          </div>
        ))}
      </section>

      {/* ── Upcoming Events ── */}
      <section className="py-24 px-8 bg-[#1C2436]">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16">
            <div>
              <p className="text-[#DD6D38] text-xs tracking-[0.4em] uppercase mb-3" style={{ fontFamily: "'Jost', sans-serif" }}>At the Estate</p>
              <h2 className="text-white text-4xl md:text-5xl" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700 }}>
                Upcoming Events
              </h2>
            </div>
            <button className="text-white/60 hover:text-white text-sm tracking-wider underline-offset-4 hover:underline transition-colors" style={{ fontFamily: "'Jost', sans-serif" }}>
              View full calendar →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EVENTS.map((ev, i) => (
              <motion.div
                key={ev.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden h-56 mb-5">
                  <img src={ev.img} alt={ev.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-[#87340e] text-white px-3 py-1.5">
                    <p className="text-xs font-bold tracking-widest uppercase" style={{ fontFamily: "'Jost', sans-serif" }}>{ev.date}</p>
                  </div>
                </div>
                <h3 className="text-white text-xl mb-2" style={{ fontFamily: "'Lora', serif", fontWeight: 700 }}>{ev.title}</h3>
                <p className="text-white/60 text-sm leading-6 mb-4" style={{ fontFamily: "'Jost', sans-serif" }}>{ev.desc}</p>
                <button className="text-[#DD6D38] text-xs tracking-widest uppercase hover:text-white transition-colors flex items-center gap-2" style={{ fontFamily: "'Jost', sans-serif" }}>
                  Learn more <ChevronRight className="w-3 h-3" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Getting Here ── */}
      <section className="py-24 px-8 bg-[#F9F5F2]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#DD6D38] text-xs tracking-[0.4em] uppercase mb-3" style={{ fontFamily: "'Jost', sans-serif" }}>Getting Here</p>
            <h2 className="text-4xl mb-8" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700 }}>Find Us in<br />Temecula Valley</h2>
            <p className="text-[#555] leading-7 mb-10" style={{ fontFamily: "'Lora', serif" }}>
              Located in the heart of Temecula wine country, just 60 miles north of San Diego and 90 miles southeast of Los Angeles. We are easy to reach and impossible to forget.
            </p>
            <div className="space-y-6">
              {[
                { Icon: MapPin, title: "Address", text: "32720 Rancho California Rd\nTemecula, CA 92591" },
                { Icon: Clock, title: "Hours", text: "Mon – Thu: 10am – 5pm\nFri – Sun: 10am – 7pm" },
                { Icon: Phone, title: "Reservations", text: "+1 (800) 000-0000\nhello@voyageurwines.com" },
                { Icon: Car, title: "Parking", text: "Complimentary on-site parking\nValet available Fri & Sat evenings" },
              ].map(({ Icon: Ico, title, text }) => (
                <div key={title} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#87340e]/10 flex items-center justify-center shrink-0">
                    <Ico className="w-4 h-4 text-[#87340e]" />
                  </div>
                  <div>
                    <p className="text-[#1C1C1C] text-sm font-semibold mb-1" style={{ fontFamily: "'Jost', sans-serif" }}>{title}</p>
                    <p className="text-[#555] text-sm leading-6 whitespace-pre-line" style={{ fontFamily: "'Jost', sans-serif" }}>{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map placeholder with satellite-style styling */}
          <div className="relative">
            <div className="w-full h-96 lg:h-[520px] bg-[#D6E0D0] overflow-hidden relative">
              <img src={PHOTOS.hero} alt="Vineyard aerial" className="w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white shadow-2xl px-8 py-6 text-center max-w-xs">
                  <div className="w-10 h-10 bg-[#87340e] rounded-full flex items-center justify-center mx-auto mb-3">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-[#1C1C1C] font-semibold text-sm mb-1" style={{ fontFamily: "'Jost', sans-serif" }}>Voyageur Fine Wines</p>
                  <p className="text-[#555] text-xs" style={{ fontFamily: "'Jost', sans-serif" }}>32720 Rancho California Rd<br />Temecula, CA 92591</p>
                  <button className="mt-4 bg-[#87340e] text-white text-xs px-5 py-2.5 tracking-widest uppercase hover:bg-[#6d2a0a] transition-colors w-full" style={{ fontFamily: "'Jost', sans-serif" }}>
                    Get Directions
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Reserve Section ── */}
      <section id="reserve" className="py-24 px-8 bg-[#87340e]">
        <div className="max-w-[680px] mx-auto text-center">
          <p className="text-[#FDD7C5] text-xs tracking-[0.4em] uppercase mb-4" style={{ fontFamily: "'Jost', sans-serif" }}>Plan Your Visit</p>
          <h2 className="text-white text-4xl md:text-5xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700 }}>
            Make a Reservation
          </h2>
          <p className="text-white/80 leading-7 mb-12" style={{ fontFamily: "'Lora', serif" }}>
            Walk-ins welcome daily. For private tastings, vineyard tours, and special events we recommend booking in advance.
          </p>

          {formSent ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/10 backdrop-blur-sm px-10 py-12 text-center">
              <Check className="w-10 h-10 text-[#FDD7C5] mx-auto mb-4" />
              <p className="text-white text-xl font-semibold mb-2" style={{ fontFamily: "'Lora', serif" }}>We will be in touch soon!</p>
              <p className="text-white/70 text-sm" style={{ fontFamily: "'Jost', sans-serif" }}>Your reservation request has been received. Look out for a confirmation email within 24 hours.</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { placeholder: "First Name", type: "text", full: false },
                { placeholder: "Last Name",  type: "text", full: false },
                { placeholder: "Email Address", type: "email", full: false },
                { placeholder: "Phone Number", type: "tel",   full: false },
              ].map(({ placeholder, type }) => (
                <input
                  key={placeholder}
                  type={type}
                  placeholder={placeholder}
                  className="bg-white/10 border border-white/20 text-white placeholder-white/40 px-5 py-4 text-sm focus:outline-none focus:border-white/60 transition-colors"
                  style={{ fontFamily: "'Jost', sans-serif" }}
                />
              ))}
              <select
                className="bg-white/10 border border-white/20 text-white/70 px-5 py-4 text-sm focus:outline-none focus:border-white/60 transition-colors sm:col-span-2"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                <option value="" className="text-black">Select an Experience</option>
                {EXPERIENCES.map((e) => <option key={e.title} value={e.title} className="text-black">{e.title} — {e.price}</option>)}
              </select>
              <textarea
                placeholder="Special requests or notes…"
                rows={3}
                className="bg-white/10 border border-white/20 text-white placeholder-white/40 px-5 py-4 text-sm focus:outline-none focus:border-white/60 transition-colors resize-none sm:col-span-2"
                style={{ fontFamily: "'Jost', sans-serif" }}
              />
              <button
                onClick={() => setFormSent(true)}
                className="sm:col-span-2 bg-[#FDD7C5] hover:bg-white text-[#87340e] py-5 tracking-widest uppercase text-sm font-medium transition-all duration-300 hover:shadow-xl"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                Request Reservation
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer navigate={navigate} />
    </div>
  );
}

// ─── Cart Drawer ──────────────────────────────────────────────────────────────
function CartDrawer({
  open, cart, onClose, navigate, onUpdate, onRemove,
}: {
  open: boolean;
  cart: CartItem[];
  onClose: () => void;
  navigate: (p: Page) => void;
  onUpdate: (id: number, qty: number) => void;
  onRemove: (id: number) => void;
}) {
  const subtotal = cart.reduce((s, { wine, quantity }) => s + wine.price * quantity, 0);
  const cartCount = cart.reduce((s, c) => s + c.quantity, 0);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            key="drawer"
            className="fixed right-0 top-0 bottom-0 w-full max-w-[420px] bg-white z-[101] flex flex-col shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div>
                <h2 className="text-lg font-semibold" style={{ fontFamily: "'Lora', serif" }}>Your Cart</h2>
                <p className="text-xs text-gray-400 mt-0.5" style={{ fontFamily: "'Jost', sans-serif" }}>
                  {cartCount} {cartCount === 1 ? "item" : "items"}
                </p>
              </div>
              <button onClick={onClose} className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition-colors rounded-full">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-20">
                  <ShoppingBag className="w-12 h-12 text-gray-200 mb-4" />
                  <p className="text-gray-500 text-sm mb-6" style={{ fontFamily: "'Jost', sans-serif" }}>Your cart is empty</p>
                  <button
                    onClick={() => { navigate("shop"); onClose(); }}
                    className="bg-[#87340e] text-white px-6 py-3 text-xs tracking-widest uppercase hover:bg-[#6d2a0a] transition-colors"
                    style={{ fontFamily: "'Jost', sans-serif" }}
                  >
                    Browse Wines
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  <AnimatePresence>
                    {cart.map(({ wine, quantity }) => (
                      <motion.div
                        key={wine.id}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.25 }}
                        className="flex gap-4 pb-5 border-b border-gray-100 last:border-0"
                      >
                        <div
                          className="w-16 h-20 overflow-hidden shrink-0 cursor-pointer"
                          onClick={() => { navigate("product"); onClose(); }}
                        >
                          <img src={wine.image} alt={wine.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] text-gray-400 tracking-widest uppercase" style={{ fontFamily: "'Jost', sans-serif" }}>{wine.type}</p>
                          <p className="text-sm font-semibold text-[#1C1C1C] truncate mt-0.5" style={{ fontFamily: "'Lora', serif" }}>{wine.name}</p>
                          <p className="text-sm text-[#87340e] mt-0.5" style={{ fontFamily: "'Lora', serif" }}>${wine.price}</p>
                          <div className="flex items-center gap-0 mt-2 border border-gray-200 w-fit">
                            <button
                              onClick={() => onUpdate(wine.id, Math.max(1, quantity - 1))}
                              className="w-7 h-7 flex items-center justify-center hover:bg-gray-50 transition-colors"
                            >
                              <Minus className="w-3 h-3 text-gray-500" />
                            </button>
                            <span className="w-7 text-center text-xs font-medium" style={{ fontFamily: "'Jost', sans-serif" }}>{quantity}</span>
                            <button
                              onClick={() => onUpdate(wine.id, quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center hover:bg-gray-50 transition-colors"
                            >
                              <Plus className="w-3 h-3 text-gray-500" />
                            </button>
                          </div>
                        </div>
                        <div className="flex flex-col items-end justify-between shrink-0">
                          <button onClick={() => onRemove(wine.id)} className="text-gray-300 hover:text-red-400 transition-colors">
                            <X className="w-4 h-4" />
                          </button>
                          <p className="text-sm font-semibold text-[#1C1C1C]" style={{ fontFamily: "'Lora', serif" }}>
                            ${wine.price * quantity}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Club upsell */}
                  <div className="bg-[#FEF6F2] border border-[#FDD7C5] px-4 py-3 flex gap-3 items-start">
                    <img src={imgStamp} alt="" className="w-10 h-10 object-contain shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[#87340e] text-xs font-semibold" style={{ fontFamily: "'Jost', sans-serif" }}>Save 33% with Wine Club</p>
                      <p className="text-[#555] text-xs leading-4 mt-0.5" style={{ fontFamily: "'Jost', sans-serif" }}>
                        Save ${cart.reduce((s, { wine, quantity }) => s + (wine.price - wine.memberPrice) * quantity, 0)} on this order.{" "}
                        <button onClick={() => { navigate("member"); onClose(); }} className="underline text-[#87340e]">Join now</button>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="px-6 py-5 border-t border-gray-100 bg-white">
                <div className="flex justify-between text-sm mb-1" style={{ fontFamily: "'Jost', sans-serif" }}>
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-semibold text-[#1C1C1C]">${subtotal.toFixed(2)}</span>
                </div>
                <p className="text-[10px] text-gray-400 mb-4" style={{ fontFamily: "'Jost', sans-serif" }}>
                  {subtotal >= 75 ? "Free shipping included" : `Add $${(75 - subtotal).toFixed(0)} for free shipping`}
                </p>
                <button
                  onClick={() => { navigate("checkout"); onClose(); }}
                  className="w-full bg-[#87340e] hover:bg-[#6d2a0a] text-white py-4 tracking-widest uppercase text-sm transition-colors font-medium mb-2"
                  style={{ fontFamily: "'Jost', sans-serif" }}
                >
                  Checkout — ${subtotal.toFixed(2)}
                </button>
                <button
                  onClick={() => { navigate("cart"); onClose(); }}
                  className="w-full border border-gray-200 hover:border-gray-400 text-gray-600 py-3 tracking-widest uppercase text-xs transition-colors"
                  style={{ fontFamily: "'Jost', sans-serif" }}
                >
                  View Full Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Routing ──────────────────────────────────────────────────────────────────
// Each page gets its own #/ address so it can be shared, bookmarked and reached with Back.
const PAGE_PATHS: Record<Page, string> = {
  home: "",
  shop: "shop",
  product: "wine",
  cart: "cart",
  checkout: "checkout",
  confirmation: "confirmation",
  member: "club",
  visit: "visit",
  about: "about",
  blog: "blog",
};

const PAGE_TITLES: Record<Page, string> = {
  home: "Voyageur Fine Wines | Family Winery in Temecula Valley",
  shop: "Shop Wines | Voyageur Fine Wines",
  product: "Voyageur Fine Wines",
  cart: "Your Cart | Voyageur Fine Wines",
  checkout: "Checkout | Voyageur Fine Wines",
  confirmation: "Order Confirmed | Voyageur Fine Wines",
  member: "Wine Club | Voyageur Fine Wines",
  visit: "Visit Our Temecula Estate | Voyageur Fine Wines",
  about: "Our Story | Voyageur Fine Wines",
  blog: "Blog | Voyageur Fine Wines",
};

interface Route {
  page: Page;
  wine?: Wine;
  postSlug?: string;
}

function parseHash(hash: string): Route {
  const [section = "", sub] = hash.replace(/^#\/?/, "").split("/");
  if (section === PAGE_PATHS.product) {
    const wine = WINES.find((w) => wineSlug(w) === sub);
    return wine ? { page: "product", wine } : { page: "shop" };
  }
  if (section === PAGE_PATHS.blog) return { page: "blog", postSlug: sub };
  const page = (Object.keys(PAGE_PATHS) as Page[]).find((p) => PAGE_PATHS[p] === section);
  return { page: page ?? "home" };
}

// ─── Root App ─────────────────────────────────────────────────────────────────
export default function App() {
  const initialRoute = parseHash(window.location.hash);
  const [page, setPage] = useState<Page>(initialRoute.page);
  const [selectedWine, setSelectedWine] = useState<Wine>(initialRoute.wine ?? WINES[3]);
  const [postSlug, setPostSlug] = useState<string | null>(initialRoute.postSlug ?? null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onHashChange = () => {
      const route = parseHash(window.location.hash);
      setPage(route.page);
      if (route.wine) setSelectedWine(route.wine);
      setPostSlug(route.postSlug ?? null);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    const post = BLOG_POSTS.find((p) => p.slug === postSlug);
    document.title =
      page === "product" ? `${selectedWine.name} | Voyageur Fine Wines`
      : page === "blog" && post ? `${post.title} | Voyageur Fine Wines`
      : PAGE_TITLES[page];
  }, [page, selectedWine, postSlug]);

  const goTo = (path: string) => {
    if (window.location.hash === `#/${path}`) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.location.hash = `/${path}`;
    }
  };

  const navigate = (p: Page) => goTo(PAGE_PATHS[p]);

  const addToCart = (wine: Wine, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.wine.id === wine.id);
      if (existing) {
        return prev.map((c) =>
          c.wine.id === wine.id ? { ...c, quantity: c.quantity + qty } : c
        );
      }
      return [...prev, { wine, quantity: qty }];
    });
    toast.success(wine.name, {
      description: `${qty} bottle${qty > 1 ? "s" : ""} added · $${wine.price * qty}`,
      action: { label: "View Cart", onClick: () => setCartOpen(true) },
    });
  };

  const updateCart = (id: number, qty: number) =>
    setCart((prev) => prev.map((c) => (c.wine.id === id ? { ...c, quantity: qty } : c)));

  const removeFromCart = (id: number) => {
    const wine = cart.find((c) => c.wine.id === id)?.wine;
    setCart((prev) => prev.filter((c) => c.wine.id !== id));
    if (wine) toast(`${wine.name} removed from cart`);
  };

  const viewProduct = (wine: Wine) => goTo(`${PAGE_PATHS.product}/${wineSlug(wine)}`);

  const openPost = (slug: string | null) => goTo(slug ? `${PAGE_PATHS.blog}/${slug}` : PAGE_PATHS.blog);

  const cartCount = cart.reduce((s, c) => s + c.quantity, 0);
  const isTransparentHeader = page === "home" || page === "member" || page === "visit" || page === "about";

  return (
    <div className="min-h-screen bg-white" ref={scrollRef}>
      <ScrollProgress />
      <Toaster position="bottom-right" richColors closeButton />
      <CartDrawer
        open={cartOpen}
        cart={cart}
        onClose={() => setCartOpen(false)}
        navigate={navigate}
        onUpdate={updateCart}
        onRemove={removeFromCart}
      />
      <Header page={page} navigate={navigate} cartCount={cartCount} transparent={isTransparentHeader} onCartClick={() => setCartOpen(true)} />

      <AnimatePresence mode="wait">
        <motion.div
          key={page === "product" ? `product-${selectedWine.id}` : page === "blog" ? `blog-${postSlug ?? ""}` : page}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {page === "home" && (
            <HomePage navigate={navigate} onAddToCart={addToCart} onViewProduct={viewProduct} onOpenPost={openPost} />
          )}
          {page === "shop" && (
            <ShopPage navigate={navigate} onAddToCart={addToCart} onViewProduct={viewProduct} />
          )}
          {page === "product" && (
            <ProductPage wine={selectedWine} navigate={navigate} onAddToCart={addToCart} onViewProduct={viewProduct} />
          )}
          {page === "cart" && (
            <CartPage cart={cart} navigate={navigate} onUpdate={updateCart} onRemove={removeFromCart} />
          )}
          {page === "checkout" && (
            <CheckoutPage
              cart={cart}
              navigate={navigate}
              onComplete={() => {
                setCart([]);
                navigate("confirmation");
              }}
            />
          )}
          {page === "confirmation" && <ConfirmationPage navigate={navigate} />}
          {page === "member" && <MemberPage navigate={navigate} />}
          {page === "visit" && <VisitPage navigate={navigate} />}
          {page === "about" && <AboutPage navigate={navigate} />}
          {page === "blog" && <BlogPage navigate={navigate} postSlug={postSlug} onOpenPost={openPost} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
