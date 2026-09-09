import { BusinessType } from "./supabase/types";

interface CatalogItem {
  name: string;
  category: string;
  unitPrice: number;
  costPrice: number;
  popularityWeight: number; // 1 - 10
}

const BUSINESS_CATALOGS: Record<string, CatalogItem[]> = {
  "Clothing & Fashion": [
    { name: "Pure Linen Long Sleeve Shirt", category: "Men's Apparel", unitPrice: 5800, costPrice: 3100, popularityWeight: 9 },
    { name: "Slim Fit Stretch Denim Jeans", category: "Men's Apparel", unitPrice: 6500, costPrice: 3600, popularityWeight: 8 },
    { name: "Floral Batik Summer Dress", category: "Women's Apparel", unitPrice: 7200, costPrice: 3800, popularityWeight: 10 },
    { name: "Handloom Cotton Saree", category: "Ethnic & Formal", unitPrice: 12500, costPrice: 6800, popularityWeight: 6 },
    { name: "Classic Polo Cotton Tee", category: "Casual Tops", unitPrice: 3200, costPrice: 1600, popularityWeight: 9 },
    { name: "Genuine Leather Belt", category: "Accessories", unitPrice: 2800, costPrice: 1200, popularityWeight: 7 },
    { name: "Embroidered Silk Kurti", category: "Women's Apparel", unitPrice: 5400, costPrice: 2900, popularityWeight: 8 },
    { name: "Casual Chino Trousers", category: "Men's Apparel", unitPrice: 5200, costPrice: 2700, popularityWeight: 7 },
    { name: "Handmade Leather Sandals", category: "Footwear", unitPrice: 4800, costPrice: 2400, popularityWeight: 8 },
    { name: "Canvas Weekend Tote Bag", category: "Accessories", unitPrice: 3400, costPrice: 1500, popularityWeight: 6 },
  ],
  "Restaurant / Café": [
    { name: "Signature Ceylon Seafood Kottu", category: "Mains & Kottu", unitPrice: 1850, costPrice: 780, popularityWeight: 10 },
    { name: "Authentic Black Pork Rice & Curry", category: "Traditional Mains", unitPrice: 1450, costPrice: 590, popularityWeight: 9 },
    { name: "Double Smash Beef Burger", category: "Burgers & Sandwiches", unitPrice: 2200, costPrice: 980, popularityWeight: 8 },
    { name: "Artisanal Flat White Coffee", category: "Specialty Coffee", unitPrice: 950, costPrice: 320, popularityWeight: 10 },
    { name: "Iced Passionfruit Green Tea", category: "Beverages", unitPrice: 750, costPrice: 210, popularityWeight: 9 },
    { name: "Crispy Calamari Rings with Aioli", category: "Starters & Bites", unitPrice: 1650, costPrice: 690, popularityWeight: 7 },
    { name: "New York Baked Cheesecake Slice", category: "Desserts", unitPrice: 1200, costPrice: 450, popularityWeight: 8 },
    { name: "Butter Chicken & Garlic Naan Set", category: "Traditional Mains", unitPrice: 1950, costPrice: 820, popularityWeight: 8 },
    { name: "Avocado & Poached Egg Sourdough", category: "Breakfast & Brunch", unitPrice: 1750, costPrice: 650, popularityWeight: 7 },
    { name: "Wood-Fired Margherita Pizza", category: "Pizza & Pasta", unitPrice: 2400, costPrice: 920, popularityWeight: 8 },
  ],
  "Electronics": [
    { name: "Noise Cancelling Wireless Earbuds", category: "Audio Devices", unitPrice: 14500, costPrice: 8900, popularityWeight: 9 },
    { name: "20,000mAh PD Fast-Charge Power Bank", category: "Power & Charging", unitPrice: 7800, costPrice: 4400, popularityWeight: 10 },
    { name: "Braided 65W USB-C to Lightning Cable", category: "Cables & Adapters", unitPrice: 2200, costPrice: 850, popularityWeight: 10 },
    { name: "Tempered 9H Privacy Screen Guard", category: "Protection & Cases", unitPrice: 1500, costPrice: 400, popularityWeight: 9 },
    { name: "Magnetic Car Phone Mount & Charger", category: "Accessories", unitPrice: 4200, costPrice: 2100, popularityWeight: 7 },
    { name: "Portable Waterproof Bluetooth Speaker", category: "Audio Devices", unitPrice: 11900, costPrice: 6800, popularityWeight: 8 },
    { name: "Ergonomic Silent Wireless Mouse", category: "Computer Peripherals", unitPrice: 3800, costPrice: 1900, popularityWeight: 7 },
    { name: "Mechanical RGB Gaming Keyboard", category: "Computer Peripherals", unitPrice: 16500, costPrice: 10200, popularityWeight: 6 },
    { name: "Smart Fitness Tracker Band 7", category: "Wearables", unitPrice: 13500, costPrice: 8400, popularityWeight: 8 },
    { name: "Shockproof Clear Hybrid Phone Case", category: "Protection & Cases", unitPrice: 2400, costPrice: 750, popularityWeight: 9 },
  ],
  "Pharmacy": [
    { name: "Paracetamol 500mg (Pack of 100)", category: "Pain & Fever", unitPrice: 650, costPrice: 380, popularityWeight: 10 },
    { name: "Vitamin C 1000mg Effervescent (20s)", category: "Vitamins & Supplements", unitPrice: 2400, costPrice: 1450, popularityWeight: 9 },
    { name: "Digital Upper Arm BP Monitor", category: "Medical Devices", unitPrice: 11500, costPrice: 7200, popularityWeight: 6 },
    { name: "Antiseptic Disinfectant Liquid 500ml", category: "First Aid & Hygiene", unitPrice: 1200, costPrice: 680, popularityWeight: 8 },
    { name: "Multivitamin & Mineral Complex (30s)", category: "Vitamins & Supplements", unitPrice: 3800, costPrice: 2200, popularityWeight: 8 },
    { name: "Oral Rehydration Salts (Box of 10)", category: "Emergency Care", unitPrice: 850, costPrice: 420, popularityWeight: 9 },
    { name: "Herbal Cough & Sore Throat Syrup", category: "Cold & Allergy", unitPrice: 950, costPrice: 510, popularityWeight: 8 },
    { name: "Non-Contact Infrared Thermometer", category: "Medical Devices", unitPrice: 4900, costPrice: 2800, popularityWeight: 7 },
  ],
  "Salon & Beauty": [
    { name: "Signature Hair Cut & Styling", category: "Hair Services", unitPrice: 3500, costPrice: 800, popularityWeight: 10 },
    { name: "Brazilian Keratin Smoothing Treatment", category: "Hair Services", unitPrice: 18500, costPrice: 5500, popularityWeight: 7 },
    { name: "Gold Radiance Herbal Facial Kit", category: "Skin Care Services", unitPrice: 6500, costPrice: 1800, popularityWeight: 8 },
    { name: "Deluxe Gel Manicure & Pedicure", category: "Nail Care", unitPrice: 4800, costPrice: 1200, popularityWeight: 9 },
    { name: "Sulfate-Free Argan Hair Oil 100ml", category: "Retail Products", unitPrice: 4200, costPrice: 2100, popularityWeight: 8 },
    { name: "Purifying Charcoal Face Mask Jar", category: "Retail Products", unitPrice: 2800, costPrice: 1100, popularityWeight: 7 },
  ],
  "Grocery / Supermarket": [
    { name: "Keeri Samba Premium Rice 5kg", category: "Grains & Rice", unitPrice: 1650, costPrice: 1320, popularityWeight: 10 },
    { name: "Red Lentils / Dhal 1kg", category: "Pulses & Essentials", unitPrice: 420, costPrice: 340, popularityWeight: 10 },
    { name: "Cold-Pressed Virgin Coconut Oil 1L", category: "Oils & Condiments", unitPrice: 1850, costPrice: 1250, popularityWeight: 8 },
    { name: "Full Cream Milk Powder 400g", category: "Dairy & Beverage", unitPrice: 1150, costPrice: 980, popularityWeight: 9 },
    { name: "Pure Ceylon Cinnamon Powder 200g", category: "Spices & Seasoning", unitPrice: 1200, costPrice: 700, popularityWeight: 7 },
    { name: "Assorted Cream Biscuits Family Pack", category: "Bakery & Snacks", unitPrice: 680, costPrice: 490, popularityWeight: 9 },
  ],
  "Online Store": [
    { name: "Ergonomic Laptop Riser Stand", category: "Home Office", unitPrice: 6800, costPrice: 3400, popularityWeight: 9 },
    { name: "Smart Aroma Essential Oil Diffuser", category: "Home & Living", unitPrice: 5200, costPrice: 2600, popularityWeight: 8 },
    { name: "Insulated Stainless Steel Water Flask", category: "Fitness & Outdoor", unitPrice: 3400, costPrice: 1600, popularityWeight: 10 },
    { name: "Ring Light with Adjustable Tripod", category: "Studio & Content", unitPrice: 7500, costPrice: 4100, popularityWeight: 8 },
    { name: "UV Sanitizing Wireless Charging Box", category: "Gadgets", unitPrice: 4900, costPrice: 2300, popularityWeight: 7 },
  ],
  "Other": [
    { name: "Standard Retail Item A", category: "General Goods", unitPrice: 4500, costPrice: 2400, popularityWeight: 9 },
    { name: "Premium Specialty Product B", category: "Specialty Items", unitPrice: 8500, costPrice: 4800, popularityWeight: 8 },
    { name: "High-Volume Commodity C", category: "General Goods", unitPrice: 2200, costPrice: 1300, popularityWeight: 10 },
    { name: "Service & Consultation D", category: "Services", unitPrice: 6000, costPrice: 1500, popularityWeight: 7 },
  ],
};

export function generateSyntheticTransactions(userId: string, businessType?: BusinessType | string | null, count: number = 135) {
  const catalog = BUSINESS_CATALOGS[businessType as string] || BUSINESS_CATALOGS["Clothing & Fashion"];

  const transactions = [];
  const now = new Date();

  // Distribute over the past 90 days
  for (let i = 0; i < count; i++) {
    // Generate date between (now - 90 days) and now
    // Create a realistic upward trajectory with occasional weekend spikes
    const dayOffset = Math.floor(Math.random() * 90);
    const txDate = new Date(now.getTime() - dayOffset * 24 * 60 * 60 * 1000);
    const dateStr = txDate.toISOString().split("T")[0];

    // Pick random item biased by popularity
    const randomPick = catalog[Math.floor(Math.random() * catalog.length)];

    // Add some price elasticity / minor discounts
    const discountMultiplier = Math.random() > 0.85 ? 0.9 : 1.0;
    const unitPrice = Math.round(randomPick.unitPrice * discountMultiplier);
    const costPrice = randomPick.costPrice;

    // Quantity (1 to 4)
    const quantity = Math.random() > 0.7 ? Math.floor(Math.random() * 3) + 1 : 1;

    const revenue = unitPrice * quantity;
    const cost = costPrice * quantity;
    const profit = revenue - cost;

    transactions.push({
      user_id: userId,
      date: dateStr,
      product_name: randomPick.name,
      category: randomPick.category,
      quantity,
      unit_price: unitPrice,
      cost_price: costPrice,
      revenue,
      cost,
      profit,
    });
  }

  // Sort by date ascending
  return transactions.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}
