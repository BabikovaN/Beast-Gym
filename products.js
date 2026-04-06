// =========================
// MENU
// =========================
const menu = document.getElementById("menu");
const menuOverlay = document.getElementById("menuOverlay");

function openMenu() {
  if (menu) menu.classList.add("active");
  if (menuOverlay) menuOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  if (menu) menu.classList.remove("active");
  if (menuOverlay) menuOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

function toggleMenu() {
  if (!menu) return;
  if (menu.classList.contains("active")) {
    closeMenu();
  } else {
    openMenu();
  }
}

if (menuOverlay) {
  menuOverlay.addEventListener("click", closeMenu);
}

document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    closeMenu();
  }
});

const menuLinks = document.querySelectorAll("#menu a");
menuLinks.forEach(link => {
  link.addEventListener("click", closeMenu);
});

// =========================
// PRODUCT DETAILS
// =========================
function toggleDetails(button) {
  const details = button.parentElement.nextElementSibling;
  if (!details) return;
  details.classList.toggle("open");
  button.classList.toggle("active");
}

// =========================
// PRODUCT TABS
// =========================
const productTabs = document.querySelectorAll(".product-tab");
const catalogPanels = document.querySelectorAll(".catalog-panel");

productTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;

    productTabs.forEach(btn => btn.classList.remove("active"));
    catalogPanels.forEach(panel => panel.classList.remove("active"));

    tab.classList.add("active");

    const activePanel = document.getElementById(target);
    if (activePanel) {
      activePanel.classList.add("active");
    }
  });
});

// =========================
// FIREBASE
// =========================
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

// ВСТАВ ТУТ СВІЙ CONFIG ІЗ FIREBASE
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// =========================
// ТОВАРИ З КОДУ
// =========================
const defaultProducts = {
  shot: [
    {
      name: "Енергетичний шот",
      price: "80 грн",
      image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=80",
      description: "Швидкий заряд енергії перед тренуванням для концентрації та активності."
    }
  ],
  snacks: [
    {
      name: "Протеїновий батончик",
      price: "65 грн",
      image: "https://images.unsplash.com/photo-1589985270958-b3f576c2d6ee?auto=format&fit=crop&w=900&q=80",
      description: "Зручний перекус до або після тренування для підтримки енергії."
    },
    {
      name: "Печиво",
      price: "40 грн",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80",
      description: "Легкий перекус для швидкого підкріплення після заняття."
    }
  ],
  water: [
    {
      name: "Моршинська 1.5",
      price: "35 грн",
      image: "https://images.unsplash.com/photo-1561047029-3000c68339ca?auto=format&fit=crop&w=900&q=80",
      description: "Великий формат питної води для тренування і щоденного балансу."
    },
    {
      name: "Sport 0.75",
      price: "30 грн",
      image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=900&q=80",
      description: "Зручна пляшка для занять у залі та активного дня."
    },
    {
      name: "4MOVE Isotonic Drink, 750 мл",
      price: "45 грн",
      image: "https://images.unsplash.com/photo-1622484212850-eb596d769edc?auto=format&fit=crop&w=900&q=80",
      description: "Ізотонік для підтримки водно-сольового балансу під час навантажень."
    }
  ],
  extra: [
    { name: "Резинки", price: "15 грн" },
    { name: "Шкарпетки", price: "30 грн" },
    { name: "Шапочка", price: "15 грн" },
    { name: "Шампунь", price: "30 грн" },
    { name: "Гель", price: "30 грн" },
    { name: "Рушник", price: "50 грн" }
  ]
};

function createProductCard(product) {
  return `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}">
      <div class="product-head">
        <div>
          <div class="product-name">${product.name}</div>
          <div class="product-price">${product.price}</div>
        </div>
        <button class="toggle-btn" onclick="toggleDetails(this)">⌄</button>
      </div>
      <div class="product-details">
        <p>${product.description || ""}</p>
      </div>
    </div>
  `;
}

function createExtraRow(product) {
  return `
    <div class="extra-row">
      <span>${product.name}</span>
      <strong>${product.price}</strong>
    </div>
  `;
}

function renderProducts(allProducts) {
  const shotGrid = document.querySelector("#shot .products-grid");
  const snacksGrid = document.querySelector("#snacks .products-grid");
  const waterGrid = document.querySelector("#water .products-grid");
  const extraList = document.querySelector("#extra .extras-list");

  if (shotGrid) shotGrid.innerHTML = allProducts.shot.map(createProductCard).join("");
  if (snacksGrid) snacksGrid.innerHTML = allProducts.snacks.map(createProductCard).join("");
  if (waterGrid) waterGrid.innerHTML = allProducts.water.map(createProductCard).join("");
  if (extraList) extraList.innerHTML = allProducts.extra.map(createExtraRow).join("");
}

function mergeProducts(defaultData, firebaseData) {
  return {
    shot: [...(defaultData.shot || []), ...(firebaseData.shot || [])],
    snacks: [...(defaultData.snacks || []), ...(firebaseData.snacks || [])],
    water: [...(defaultData.water || []), ...(firebaseData.water || [])],
    extra: [...(defaultData.extra || []) , ...(firebaseData.extra || [])]
  };
}

function groupFirebaseProducts(items) {
  return {
    shot: items.filter(item => item.category === "shot"),
    snacks: items.filter(item => item.category === "snacks"),
    water: items.filter(item => item.category === "water"),
    extra: items.filter(item => item.category === "extra")
  };
}

// =========================
// REALTIME З FIREBASE
// =========================
const productsRef = collection(db, "products");
const productsQuery = query(productsRef, orderBy("createdAt", "asc"));

onSnapshot(productsQuery, (snapshot) => {
  const firebaseProducts = [];

  snapshot.forEach((doc) => {
    firebaseProducts.push(doc.data());
  });

  const grouped = groupFirebaseProducts(firebaseProducts);
  const merged = mergeProducts(defaultProducts, grouped);
  renderProducts(merged);
});

// =========================
// ДОДАВАННЯ ТОВАРУ
// МОЖНА ВИКЛИКАТИ З АДМІНКИ
// =========================
async function addProduct(category, product) {
  try {
    await addDoc(collection(db, "products"), {
      category,
      ...product,
      createdAt: Date.now()
    });
    console.log("Товар додано");
  } catch (error) {
    console.error("Помилка додавання товару:", error);
  }
}

// робимо доступною в консолі
window.addProduct = addProduct;
window.toggleMenu = toggleMenu;
window.toggleDetails = toggleDetails;
