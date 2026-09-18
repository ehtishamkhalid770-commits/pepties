import { Product } from "./types";

export const PRODUCTS: Product[] = [
  // CATEGORY: PATISSERIE ("PATTIES")
  {
    id: "pat-emperor",
    name: "The Emperor's Truffle Chicken",
    urduName: "شاہی مرغ پیٹیز",
    category: "patisserie",
    price: 1200,
    rating: 5.0,
    reviews: 148,
    tagline: "Saffron-infused chicken baked inside 144 gold-brushed, paper-thin pastry sheets.",
    description: "Our signature puff pastry crafted using the ancient French lamination technique with organic grass-fed butter, stuffed with a decadent filling of pulled chicken simmered in black truffle cream and saffron threads.",
    longDescription: "Re-imagining the traditional South Asian 'Patty' (pepties), this masterpiece combines culinary heritage with supreme luxury. Every single piece is individually brushed with organic edible 24K gold dust and baked to crispy, airy, golden perfection. It is a taste designed exclusively for emperors.",
    features: [
      "144 flaky butter-laminated layers",
      "Creamy slow-cooked black truffle chicken",
      "Infused with rare Kashmiri saffron",
      "Lightly dusted with 24K edible gold"
    ],
    image: "🥐",
    colorAccent: "amber-400",
    specLabel: "Lamination Layers",
    specValue: "144 Layers"
  },
  {
    id: "pat-beef",
    name: "Majestic Braised Wagyu Puff",
    urduName: "تاجدار بیف پیٹیز",
    category: "patisserie",
    price: 1800,
    rating: 4.9,
    reviews: 94,
    tagline: "12-hour slow-cooked Wagyu beef and bone marrow glaze in a crisp golden dome.",
    description: "Premium A5 Wagyu beef brisket slow-braised with rich bone marrow, royal cardamom, and charred onion reduction, nestled inside a flaky puff pastry dome.",
    longDescription: "The absolute zenith of savory pastries. We slow-cook imported Wagyu beef brisket for twelve hours in clay pots before glaze-cooking with concentrated bone marrow. It is then enveloped in our royal blue salt-cured flaky pastry dough and baked fresh upon your command.",
    features: [
      "Imported melt-in-your-mouth Wagyu beef",
      "12-hour clay pot braised brisket",
      "Rich glazed bone marrow infusion",
      "Crisp dome architecture"
    ],
    image: "🥮",
    colorAccent: "amber-500",
    specLabel: "Braise Time",
    specValue: "12 Hours"
  },
  {
    id: "pat-cheese",
    name: "Saffron, Gouda & Pine-Nut Crown",
    urduName: "زعفرانی پنیر تاج پیٹیز",
    category: "patisserie",
    price: 1400,
    rating: 4.8,
    reviews: 73,
    tagline: "Rich aged Gouda blended with Saffron and roasted pine nuts in a pastry crown.",
    description: "A gorgeous crown-shaped pastry loaded with premium, creamy Gouda cheese, sharp Parmigiano, Persian saffron, and lightly roasted buttery pine nuts.",
    longDescription: "For the refined vegetarian palate, this crown pastry offers an explosion of textures and flavors. We blend an exceptionally smooth, aged Gouda with a hint of earthy saffron and toasted pine nuts, presenting it in an elegant crown braided pattern that flakes beautifully with every bite.",
    features: [
      "Gourmet 18-month aged Gouda cheese",
      "Toasted Mediterranean pine nuts",
      "Distinct braided crown configuration",
      "Persian saffron aromatic base"
    ],
    image: "👑",
    colorAccent: "yellow-500",
    specLabel: "Cheese Age",
    specValue: "18 Months"
  },

  // CATEGORY: SKINCARE ("PEPTIDES")
  {
    id: "pep-gold",
    name: "24K Gold Royal Peptide Infusion",
    urduName: "طلائی پیپٹائڈ اکسیر",
    category: "skincare",
    price: 8500,
    rating: 4.9,
    reviews: 312,
    tagline: "Cellular renewal booster enriched with 24K colloidal gold and multi-peptides.",
    description: "An advanced, deeply penetrating anti-aging serum concentrated with dual-peptide chains, hyaluronic acid, and actual 24K gold flakes that melt into the skin.",
    longDescription: "This luxurious facial elixir is designed to restore youthful resilience and brilliant luster. Formulated with our proprietary Gold-Peptide-9 complex, it stimulates rapid collagen synthesis, visually erasing fine lines and imparting a royal, goddess-like glow. Fits beautifully into your night-time ritual.",
    features: [
      "High-concentration dual peptide chains",
      "Real 24K colloidal gold suspension",
      "Deep triple-hydration hyaluronic base",
      "Visibly plumps and firms within 7 nights"
    ],
    image: "🧪",
    colorAccent: "amber-400",
    specLabel: "Gold Grade",
    specValue: "24K Fine Flakes"
  },
  {
    id: "pep-copper",
    name: "Imperial GHK-Cu Blue Copper Elixir",
    urduName: "لاجورد تانبا پیپٹائڈ",
    category: "skincare",
    price: 7200,
    rating: 4.7,
    reviews: 185,
    tagline: "Pure active copper tri-peptides to heal, soothe, and dramatically sculpt.",
    description: "A mesmerizing royal blue serum featuring active GHK-Cu Copper Peptides, Centella, and Niacinamide, engineered to rebuild skin density.",
    longDescription: "The legendary skin-sculpting secret. Harnessing the healing and structural power of GHK-Cu (Copper Tripeptide-1), this serum exhibits a brilliant naturally blue hue. It accelerates skin remodeling, dramatically firms skin contours, and calms redness, rendering a flawless porcelain finish.",
    features: [
      "Therapeutic 3.0% Copper Tripeptide-1",
      "Naturally stunning sapphire-blue color",
      "Soothes sensitive or post-treatment skin",
      "Increases natural elastin production"
    ],
    image: "💎",
    colorAccent: "blue-500",
    specLabel: "Concentration",
    specValue: "3% GHK-Cu"
  },
  {
    id: "pep-collagen",
    name: "Empress Midnight Bio-Collagen",
    urduName: "شبینہ ملکہ کولیجن",
    category: "skincare",
    price: 6800,
    rating: 5.0,
    reviews: 241,
    tagline: "Overnight youth-recovery sleeping complex with time-released peptide chains.",
    description: "An ultra-nourishing, weightless sleeping complex loaded with low-molecular-weight collagen peptides and melatonin-mimics to repair skin barrier damage.",
    longDescription: "Wake up looking perfectly rested, refreshed, and radiant. This luxurious sleeping complex delivers time-released peptides directly into the skin's deepest layers throughout the night. It locks in moisture, mimics the natural skin lipid barrier, and leaves the face incredibly soft and elastic.",
    features: [
      "Ultra-low molecular weight bio-collagen",
      "Time-released nightly peptide technology",
      "Skin barrier lipid-mimic blend",
      "Non-comedogenic, deeply hydrating"
    ],
    image: "✨",
    colorAccent: "indigo-400",
    specLabel: "Molecular Mass",
    specValue: "Ultra-Low Da"
  },

  // CATEGORY: PET BOUTIQUE ("PETS")
  {
    id: "pet-collar",
    name: "The Crown Jewel Velvet Collar",
    urduName: "شاہی زرقون پٹہ",
    category: "pets",
    price: 4500,
    rating: 4.9,
    reviews: 110,
    tagline: "Hand-crafted Italian velvet collar studded with 18K gold-plated settings and zircons.",
    description: "A stunning, super-soft luxury velvet collar with an ultra-strong core, hand-embellished with flawless zircon stones and heavy-duty 18K gold-plated buckles.",
    longDescription: "For the true sovereign of your household. We source our plush, double-sided velvet from Florence, stitching it around an incredibly resilient climbing-grade core. It is completed with solid brass hardware plated in deep 18K gold and studded with sparkling emerald-colored zircons.",
    features: [
      "Florentine double-sided soft velvet",
      "Solid brass buckles plated in 18K Gold",
      "Embellished with AAA grade green zircons",
      "Reinforced heavy-duty security core"
    ],
    image: "🎗️",
    colorAccent: "amber-400",
    specLabel: "Hardware Finish",
    specValue: "18K Gold Plated"
  },
  {
    id: "pet-bed",
    name: "Sovereign Orthopedic Velvet Lounger",
    urduName: "شاہانہ مخملی بستر",
    category: "pets",
    price: 14500,
    rating: 5.0,
    reviews: 82,
    tagline: "Dual-density memory foam clad in gold-brocaded royal blue velvet.",
    description: "The ultimate sleep experience for your pet. High-density orthopedic cooling memory foam wrapped inside a removable wash-safe cover of royal blue velvet.",
    longDescription: "Give your beloved companion a royal throne of comfort. Our orthopedic lounger features dual-density pressure-relieving foam that supports joints perfectly. Clad in premium Royal Blue velvet and decorated with hand-stitched gold brocade scrollwork around the margins.",
    features: [
      "Joint-supporting medical memory foam",
      "Plush Royal Blue velvet wash-safe cover",
      "Elegant hand-braided gold borders",
      "Non-slip gold studded royal rubber base"
    ],
    image: "🛋️",
    colorAccent: "indigo-500",
    specLabel: "Memory Foam",
    specValue: "Dual-Density Gel"
  },
  {
    id: "pet-leash",
    name: "Imperial Braided Silk Leash",
    urduName: "شاہی ریشمی پٹہ",
    category: "pets",
    price: 3800,
    rating: 4.8,
    reviews: 64,
    tagline: "Heavy-duty braided silk cord with solid golden brass swivels for elegant control.",
    description: "A gorgeous, strong, hand-braided silk leash inspired by maritime royal yachts, featuring a genuine full-grain leather handle and golden brass clasp.",
    longDescription: "Walk with pride. This luxury leash is hand-braided using high-tensile silk cord, producing a shimmering texture that catches the light beautifully. Finished with a soft full-grain camel leather handle for maximum human comfort, and a quick-release solid brass snap hook.",
    features: [
      "High-tensile premium silk braiding",
      "Full-grain soft leather comfort handle",
      "Solid heavy-cast golden brass clip",
      "Polished to a brilliant luster"
    ],
    image: "📿",
    colorAccent: "yellow-600",
    specLabel: "Tensile Force",
    specValue: "250 kg Max"
  }
];

export const REVIEWS = [
  {
    id: "rev-1",
    name: "Mahrez Khan",
    rating: 5,
    date: "2 days ago",
    comment: "Yaar, Truffle Chicken Patties (pepties) was unbelievable! 144 layers were literally melting. Extremely high-class packaging too.",
    product: "The Emperor's Truffle Chicken"
  },
  {
    id: "rev-2",
    name: "Ayesha Jahangir",
    rating: 5,
    date: "1 week ago",
    comment: "The 24K Gold Peptide Infusion actually changed my skin texture. It feels so soft and glowing. Delivery was premium in a velvet royal blue box!",
    product: "24K Gold Royal Peptide Infusion"
  },
  {
    id: "rev-3",
    name: "Nael Shah",
    rating: 5,
    date: "3 days ago",
    comment: "My Persian cat looks like a literal king in the Crown Jewel Velvet Collar. The gold plating is so rich and doesn't tarnish at all.",
    product: "The Crown Jewel Velvet Collar"
  }
];
