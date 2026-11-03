// ===== FreshMart — Frontend JavaScript =====
// ===== Theme controls =====
const THEME_KEY = 'freshmart-theme';

function applyTheme(theme) {
  const isDark = theme === 'dark';
  document.documentElement.classList.toggle('dark', isDark);
  document.querySelector('#theme-icon-sun')?.classList.toggle('hidden', !isDark);
  document.querySelector('#theme-icon-moon')?.classList.toggle('hidden', isDark);
  const toggle = document.querySelector('#theme-toggle');
  if (toggle) {
    toggle.setAttribute('aria-pressed', String(isDark));
    toggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    toggle.title = isDark ? 'Switch to light mode' : 'Switch to dark mode';
  }
}

function toggleTheme() {
  const nextTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
  try { localStorage.setItem(THEME_KEY, nextTheme); } catch (error) { /* Theme still works when storage is unavailable. */ }
  applyTheme(nextTheme);
}

function getSavedTheme() {
  try { return localStorage.getItem(THEME_KEY) || 'light'; } catch (error) { return 'light'; }
}


// ──────────────────────────────────────
// 1. PRODUCT DATA
// ──────────────────────────────────────
const products = [
  // Fruits & Vegetables
  { id: 1,  name: "Organic Bananas",        category: "Fruits & Vegetables", price: 1.49,  originalPrice: 1.99,  rating: 4.8, reviews: 234, image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop", badge: "Organic" },
  { id: 2,  name: "Fresh Strawberries",      category: "Fruits & Vegetables", price: 3.99,  originalPrice: null,  rating: 4.7, reviews: 189, image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=400&fit=crop", badge: null },
  { id: 3,  name: "Avocado (3 pack)",        category: "Fruits & Vegetables", price: 4.49,  originalPrice: 5.99,  rating: 4.6, reviews: 312, image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=400&fit=crop", badge: "Sale" },
  { id: 4,  name: "Baby Spinach 250g",       category: "Fruits & Vegetables", price: 2.99,  originalPrice: null,  rating: 4.5, reviews: 98,  image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop", badge: "Fresh" },

  // Dairy
  { id: 5,  name: "Whole Milk 1L",           category: "Dairy",               price: 2.49,  originalPrice: null,  rating: 4.9, reviews: 456, image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop", badge: null },
  { id: 6,  name: "Greek Yogurt 500g",       category: "Dairy",               price: 3.29,  originalPrice: 4.29,  rating: 4.7, reviews: 278, image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop", badge: "Sale" },
  { id: 7,  name: "Cheddar Cheese Block",    category: "Dairy",               price: 5.99,  originalPrice: null,  rating: 4.8, reviews: 167, image: "https://images.unsplash.com/photo-1618164436241-4473940d1f5c?w=400&h=400&fit=crop", badge: null },
  { id: 8,  name: "Farm Fresh Eggs (12)",    category: "Dairy",               price: 3.99,  originalPrice: 4.99,  rating: 4.9, reviews: 534, image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=400&fit=crop", badge: "Best Seller" },

  // Bakery
  { id: 9,  name: "Sourdough Bread",         category: "Bakery",              price: 4.49,  originalPrice: null,  rating: 4.8, reviews: 203, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop", badge: "Fresh" },
  { id: 10, name: "Croissants (4 pack)",     category: "Bakery",              price: 5.99,  originalPrice: 7.49,  rating: 4.6, reviews: 145, image: "https://images.unsplash.com/photo-1555507036-ab1f4038024a?w=400&h=400&fit=crop", badge: "Sale" },
  { id: 11, name: "Chocolate Muffins (6)",   category: "Bakery",              price: 6.49,  originalPrice: null,  rating: 4.5, reviews: 112, image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400&h=400&fit=crop", badge: null },
  { id: 12, name: "Multigrain Bagels (6)",   category: "Bakery",              price: 3.99,  originalPrice: null,  rating: 4.4, reviews: 87,  image: "https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=400&h=400&fit=crop", badge: null },

  // Meat & Seafood
  { id: 13, name: "Chicken Breast 500g",     category: "Meat & Seafood",      price: 7.99,  originalPrice: 9.99,  rating: 4.7, reviews: 345, image: "https://images.unsplash.com/photo-1604503468506-a8da13d82571?w=400&h=400&fit=crop", badge: "Sale" },
  { id: 14, name: "Atlantic Salmon Fillet",   category: "Meat & Seafood",      price: 12.99, originalPrice: null,  rating: 4.9, reviews: 198, image: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?w=400&h=400&fit=crop", badge: "Premium" },
  { id: 15, name: "Ground Beef 400g",        category: "Meat & Seafood",      price: 6.49,  originalPrice: null,  rating: 4.6, reviews: 267, image: "https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=400&h=400&fit=crop", badge: null },
  { id: 16, name: "Jumbo Shrimp 300g",       category: "Meat & Seafood",      price: 10.99, originalPrice: 13.99, rating: 4.8, reviews: 156, image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&h=400&fit=crop", badge: "Sale" },

  // Snacks
  { id: 17, name: "Mixed Nuts 350g",         category: "Snacks",              price: 7.49,  originalPrice: null,  rating: 4.7, reviews: 213, image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&h=400&fit=crop", badge: null },
  { id: 18, name: "Dark Chocolate Bar",      category: "Snacks",              price: 3.49,  originalPrice: null,  rating: 4.8, reviews: 342, image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400&h=400&fit=crop", badge: "Popular" },
  { id: 19, name: "Potato Chips Variety",     category: "Snacks",              price: 4.99,  originalPrice: 6.49,  rating: 4.4, reviews: 178, image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&h=400&fit=crop", badge: "Sale" },
  { id: 20, name: "Granola Bars (8 pack)",   category: "Snacks",              price: 5.29,  originalPrice: null,  rating: 4.5, reviews: 134, image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&h=400&fit=crop", badge: null },

  // Beverages
  { id: 21, name: "Fresh Orange Juice 1L",   category: "Beverages",           price: 4.99,  originalPrice: null,  rating: 4.8, reviews: 289, image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=400&fit=crop", badge: "Fresh" },
  { id: 22, name: "Sparkling Water 6-pack",  category: "Beverages",           price: 5.49,  originalPrice: 6.99,  rating: 4.6, reviews: 167, image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400&h=400&fit=crop", badge: "Sale" },
  { id: 23, name: "Green Tea (20 bags)",     category: "Beverages",           price: 3.99,  originalPrice: null,  rating: 4.7, reviews: 234, image: "https://images.unsplash.com/photo-1556881286-fc6915169721?w=400&h=400&fit=crop", badge: null },
  { id: 24, name: "Cold Brew Coffee 500ml",  category: "Beverages",           price: 6.49,  originalPrice: 7.99,  rating: 4.9, reviews: 312, image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop", badge: "Popular" },
];

const categories = [
  { name: "Fruits & Vegetables", icon: "🥬", image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=300&fit=crop", color: "from-green-400 to-green-600" },
  { name: "Dairy",               icon: "🥛", image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400&h=300&fit=crop", color: "from-blue-400 to-blue-600" },
  { name: "Bakery",              icon: "🥐", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop", color: "from-amber-400 to-amber-600" },
  { name: "Meat & Seafood",      icon: "🥩", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&h=300&fit=crop", color: "from-red-400 to-red-600" },
  { name: "Snacks",              icon: "🍿", image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&h=300&fit=crop", color: "from-purple-400 to-purple-600" },
  { name: "Beverages",           icon: "🧃", image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop", color: "from-orange-400 to-orange-600" },
];

const testimonials = [
  { name: "Sarah M.", avatar: "SM", text: "FreshMart has completely changed how I shop for groceries. The produce is always fresh and delivery is lightning fast!", rating: 5 },
  { name: "James K.", avatar: "JK", text: "Best online grocery store I've used. Great selection, competitive prices, and the app is so easy to navigate.", rating: 5 },
  { name: "Priya R.", avatar: "PR", text: "I love the organic selection and the deals are unbeatable. My family saves so much every week!", rating: 4 },
];

// ──────────────────────────────────────
// 2. STATE
// ──────────────────────────────────────
let cart = [];
let activeCategory = "All";
let searchQuery = "";
let cartCloseTimer = null;

// ──────────────────────────────────────
// 3. DOM HELPERS
// ──────────────────────────────────────
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ──────────────────────────────────────
// 4. RENDER FUNCTIONS
// ──────────────────────────────────────

/** Star rating HTML */
function starsHTML(rating) {
  let html = '';
  for (let i = 1; i <= 5; i++) {
    html += i <= Math.round(rating)
      ? '<svg class="w-4 h-4 star-filled inline" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>'
      : '<svg class="w-4 h-4 star-empty inline" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>';
  }
  return html;
}

/** Badge color map */
function badgeColor(badge) {
  const map = {
    "Sale": "bg-red-500",
    "Organic": "bg-green-600",
    "Fresh": "bg-emerald-500",
    "Best Seller": "bg-amber-500",
    "Popular": "bg-purple-500",
    "Premium": "bg-indigo-600",
  };
  return map[badge] || "bg-gray-500";
}

/** Render category tiles */
function renderCategoryTiles() {
  const container = $('#category-tiles');
  container.innerHTML = categories.map(cat => `
    <button onclick="filterByCategory('${cat.name}')"
            class="category-tile group relative rounded-2xl overflow-hidden shadow-md cursor-pointer focus:outline-none"
            aria-label="Browse ${cat.name}">
      <img src="${cat.image}" alt="${cat.name}" class="w-full h-40 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy"/>
      <div class="absolute inset-0 bg-gradient-to-t ${cat.color} opacity-60 group-hover:opacity-70 transition-opacity"></div>
      <div class="absolute inset-0 flex flex-col items-center justify-center text-white">
        <span class="text-3xl sm:text-4xl mb-1">${cat.icon}</span>
        <span class="font-semibold text-sm sm:text-base drop-shadow">${cat.name}</span>
      </div>
    </button>
  `).join('');
}

/** Render product cards */
function renderProducts() {
  const container = $('#products-grid');
  let filtered = products;

  if (activeCategory !== "All") {
    filtered = filtered.filter(p => p.category === activeCategory);
  }
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-16">
        <p class="text-6xl mb-4">🔍</p>
        <p class="text-xl text-gray-500 dark:text-gray-400 font-medium">No products found</p>
        <p class="text-gray-400 dark:text-gray-500 mt-1">Try a different search or category</p>
        <button onclick="clearFilters()" class="mt-4 px-5 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition">Show All Products</button>
      </div>`;
    return;
  }

  container.innerHTML = filtered.map((p, i) => `
    <div class="product-card bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden animate-fade-in-up" style="animation-delay:${i * 40}ms">
      <div class="relative">
        <img src="${p.image}" alt="${p.name}" class="w-full h-44 sm:h-52 object-cover" loading="lazy"/>
        ${p.badge ? `<span class="${badgeColor(p.badge)} text-white text-xs font-bold px-3 py-1 rounded-full absolute top-3 left-3 shadow">${p.badge}</span>` : ''}
        ${p.originalPrice ? `<span class="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full absolute top-3 right-3">-${Math.round((1 - p.price/p.originalPrice)*100)}%</span>` : ''}
      </div>
      <div class="p-4">
        <p class="text-xs text-green-600 font-medium mb-1">${p.category}</p>
        <h3 class="font-semibold text-gray-800 dark:text-gray-100 text-sm sm:text-base leading-snug mb-2 line-clamp-2">${p.name}</h3>
        <div class="flex items-center gap-1 mb-3">
          ${starsHTML(p.rating)}
          <span class="text-xs text-gray-400 ml-1">(${p.reviews})</span>
        </div>
        <div class="flex items-end justify-between">
          <div>
            <span class="text-lg font-bold text-gray-900 dark:text-gray-100">\$${p.price.toFixed(2)}</span>
            ${p.originalPrice ? `<span class="text-sm text-gray-400 line-through ml-2">\$${p.originalPrice.toFixed(2)}</span>` : ''}
          </div>
          <button onclick="addToCart(${p.id})"
                  class="add-btn bg-green-600 hover:bg-green-700 text-white p-2.5 rounded-xl shadow-md focus:outline-none"
                  aria-label="Add ${p.name} to cart"
                  title="Add to cart">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

/** Render testimonials */
function renderTestimonials() {
  const container = $('#testimonials-grid');
  container.innerHTML = testimonials.map(t => `
    <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-sm">${t.avatar}</div>
        <div>
          <p class="font-semibold text-gray-800 dark:text-gray-100">${t.name}</p>
          <div class="flex gap-0.5">${starsHTML(t.rating)}</div>
        </div>
      </div>
      <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed italic">"${t.text}"</p>
    </div>
  `).join('');
}

// ──────────────────────────────────────
// 5. CART LOGIC
// ──────────────────────────────────────

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  const existing = cart.find(c => c.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCartUI();
  showToast(`${product.name} added to cart!`, "✅");
}

function removeFromCart(productId) {
  cart = cart.filter(c => c.id !== productId);
  updateCartUI();
  renderCartDrawer();
}

function updateQty(productId, delta) {
  const item = cart.find(c => c.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
    return;
  }
  updateCartUI();
  renderCartDrawer();
}

function getCartCount() {
  return cart.reduce((sum, c) => sum + c.qty, 0);
}

function getCartTotal() {
  return cart.reduce((sum, c) => sum + c.price * c.qty, 0);
}

function updateCartUI() {
  const badges = $$('.cart-count');
  const count = getCartCount();
  badges.forEach(b => {
    b.textContent = count;
    b.classList.toggle('hidden', count === 0);
    // quick pulse
    b.classList.remove('animate-pulse-badge');
    void b.offsetWidth;            // force reflow
    b.classList.add('animate-pulse-badge');
  });
}

function renderCartDrawer() {
  const container = $('#cart-items');
  const totalEl = $('#cart-total');
  const emptyEl = $('#cart-empty');
  const contentEl = $('#cart-content');

  if (cart.length === 0) {
    emptyEl.classList.remove('hidden');
    contentEl.classList.add('hidden');
    return;
  }
  emptyEl.classList.add('hidden');
  contentEl.classList.remove('hidden');

  container.innerHTML = cart.map(item => `
    <div class="flex gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
      <img src="${item.image}" alt="${item.name}" class="w-16 h-16 rounded-lg object-cover flex-shrink-0" loading="lazy"/>
      <div class="flex-1 min-w-0">
        <p class="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">${item.name}</p>
        <p class="text-xs text-gray-500 dark:text-gray-400">\$${item.price.toFixed(2)} each</p>
        <div class="flex items-center gap-2 mt-2">
          <button onclick="updateQty(${item.id},-1)" class="w-7 h-7 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-200 font-bold text-sm transition" aria-label="Decrease quantity">−</button>
          <span class="text-sm font-semibold w-6 text-center">${item.qty}</span>
          <button onclick="updateQty(${item.id},+1)" class="w-7 h-7 rounded-lg bg-green-100 dark:bg-green-900 hover:bg-green-200 dark:hover:bg-green-800 flex items-center justify-center text-green-700 dark:text-green-300 font-bold text-sm transition" aria-label="Increase quantity">+</button>
          <button onclick="removeFromCart(${item.id})" class="ml-auto text-red-400 hover:text-red-600 transition" aria-label="Remove ${item.name} from cart">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
          </button>
        </div>
      </div>
      <p class="text-sm font-bold text-gray-900 dark:text-gray-100 flex-shrink-0">\$${(item.price * item.qty).toFixed(2)}</p>
    </div>
  `).join('');

  totalEl.textContent = `$${getCartTotal().toFixed(2)}`;
}

// ──────────────────────────────────────
// 6. CART DRAWER OPEN/CLOSE
// ──────────────────────────────────────
function openCart() {
  const overlay = $('#cart-overlay');
  const drawer = $('#cart-drawer');
  clearTimeout(cartCloseTimer);
  overlay.classList.remove('hidden');
  drawer.classList.remove('translate-x-full');
  document.body.style.overflow = 'hidden';
  renderCartDrawer();
}

function closeCart() {
  const overlay = $('#cart-overlay');
  const drawer = $('#cart-drawer');
  if (!overlay || overlay.classList.contains('hidden')) return;
  clearTimeout(cartCloseTimer);
  drawer.classList.add('translate-x-full');
  cartCloseTimer = setTimeout(() => {
    if (drawer.classList.contains('translate-x-full')) {
      overlay.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }, 300);
}

// ──────────────────────────────────────
// 7. FILTERING & SEARCH
// ──────────────────────────────────────
function updateCategoryButtons(activeCat) {
  $$('.cat-btn').forEach(btn => {
    const isActive = btn.dataset.cat === activeCat;
    btn.classList.toggle('bg-green-600', isActive);
    btn.classList.toggle('dark:bg-green-700', isActive);
    btn.classList.toggle('text-white', isActive);
    btn.classList.toggle('bg-white', !isActive);
    btn.classList.toggle('dark:bg-gray-800', !isActive);
    btn.classList.toggle('text-gray-700', !isActive);
    btn.classList.toggle('dark:text-gray-200', !isActive);
    btn.setAttribute('aria-pressed', String(isActive));
  });
}

function filterByCategory(cat) {
  activeCategory = cat;
  updateCategoryButtons(cat);
  renderProducts();
  // scroll to products
  document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function clearFilters() {
  activeCategory = "All";
  searchQuery = "";
  ['#search-input', '#mobile-search-input'].forEach(selector => {
    const input = $(selector);
    if (input) input.value = "";
  });
  updateCategoryButtons("All");
  renderProducts();
}

function handleSearch(e) {
  searchQuery = e.target.value.trim();
  const otherInput = e.target.id === 'search-input' ? $('#mobile-search-input') : $('#search-input');
  if (otherInput) otherInput.value = e.target.value;
  renderProducts();
}

// ──────────────────────────────────────
// 8. MOBILE MENU
// ──────────────────────────────────────
function toggleMobileMenu() {
  const menu = $('#mobile-menu');
  if (!menu) return;
  menu.classList.toggle('open');
  const icon = $('#mobile-menu-icon');
  const isOpen = menu.classList.contains('open');
  const toggle = $('#mobile-menu-toggle');
  if (toggle) {
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  }
  if (icon) {
    icon.innerHTML = isOpen
      ? '<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>'
      : '<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>';
  }
}

// ──────────────────────────────────────
// 9. TOAST NOTIFICATIONS
// ──────────────────────────────────────
function showToast(message, icon = "✅") {
  const container = $('#toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast flex items-center gap-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-xl px-5 py-3 mb-2 max-w-sm';
  toast.innerHTML = `<span class="text-xl flex-shrink-0">${icon}</span><p class="text-sm font-medium text-gray-700 dark:text-gray-200">${message}</p>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('toast-exit');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// ──────────────────────────────────────
// 10. NEWSLETTER
// ──────────────────────────────────────
function handleNewsletter(e) {
  e.preventDefault();
  const input = $('#newsletter-email');
  const email = input.value.trim();
  if (!email || !email.includes('@')) {
    showToast("Please enter a valid email address.", "⚠️");
    return;
  }
  showToast("Thanks for subscribing! 🎉", "📬");
  input.value = "";
}

// ──────────────────────────────────────
// 11. COUNTDOWN TIMER (Deal of the Day)
// ──────────────────────────────────────
function startCountdown() {
  // End time: midnight tonight (rolls over each day)
  function getEndOfDay() {
    const now = new Date();
    const end = new Date(now);
    end.setHours(23, 59, 59, 999);
    return end;
  }
  function update() {
    const diff = getEndOfDay() - new Date();
    if (diff <= 0) return;
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    const pad = n => String(n).padStart(2, '0');
    const el = $('#countdown');
    if (el) el.innerHTML = `
      <div class="flex gap-2 sm:gap-3 justify-center">
        <div class="bg-white/20 backdrop-blur rounded-lg px-3 py-2 min-w-[3.5rem] text-center"><span class="text-2xl sm:text-3xl font-bold">${pad(h)}</span><p class="text-[10px] uppercase tracking-wider mt-0.5 text-green-200">Hours</p></div>
        <span class="text-2xl sm:text-3xl font-bold self-start mt-2">:</span>
        <div class="bg-white/20 backdrop-blur rounded-lg px-3 py-2 min-w-[3.5rem] text-center"><span class="text-2xl sm:text-3xl font-bold">${pad(m)}</span><p class="text-[10px] uppercase tracking-wider mt-0.5 text-green-200">Minutes</p></div>
        <span class="text-2xl sm:text-3xl font-bold self-start mt-2">:</span>
        <div class="bg-white/20 backdrop-blur rounded-lg px-3 py-2 min-w-[3.5rem] text-center"><span class="text-2xl sm:text-3xl font-bold">${pad(s)}</span><p class="text-[10px] uppercase tracking-wider mt-0.5 text-green-200">Seconds</p></div>
      </div>`;
  }
  update();
  setInterval(update, 1000);
}

// ──────────────────────────────────────
// 12. BACK-TO-TOP BUTTON
// ──────────────────────────────────────
function initBackToTop() {
  const btn = $('#back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('hidden', window.scrollY < 400);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ──────────────────────────────────────
// 13. INITIALISE
// ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(getSavedTheme());
  updateCategoryButtons(activeCategory);
  renderCategoryTiles();
  renderProducts();
  renderTestimonials();
  startCountdown();
  updateCartUI();
  initBackToTop();

  // search input listeners
  const searchInput = $('#search-input');
  const mobileSearchInput = $('#mobile-search-input');
  if (searchInput) searchInput.addEventListener('input', handleSearch);
  if (mobileSearchInput) mobileSearchInput.addEventListener('input', handleSearch);

  // Newsletter form
  const nlForm = $('#newsletter-form');
  if (nlForm) nlForm.addEventListener('submit', handleNewsletter);

  // Cart overlay click to close
  const overlay = $('#cart-overlay');
  if (overlay) overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeCart();
  });

  // Escape key closes cart / mobile menu
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCart();
      const menu = $('#mobile-menu');
      if (menu && menu.classList.contains('open')) toggleMobileMenu();
    }
  });
});

