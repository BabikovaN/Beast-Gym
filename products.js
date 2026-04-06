const menu = document.getElementById("menu");
const menuOverlay = document.getElementById("menuOverlay");
const burgerBtn = document.getElementById("burgerBtn");

/* MENU */
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

if (burgerBtn) {
  burgerBtn.addEventListener("click", toggleMenu);
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
  link.addEventListener("click", () => {
    closeMenu();
  });
});

/* TABS */
const tabs = document.querySelectorAll(".category-tab");
const blocks = document.querySelectorAll(".catalog-block");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;

    tabs.forEach(btn => btn.classList.remove("active"));
    blocks.forEach(block => block.classList.remove("active"));

    tab.classList.add("active");

    const currentBlock = document.getElementById(target);
    if (currentBlock) {
      currentBlock.classList.add("active");
    }
  });
});

/* PRODUCTS */
const defaultProducts = {
  shot: [
    {
      name: "AMIX BCAA Shot 3000",
      price: "80 грн",
      image: "promo.jpg",
      description: "BCAA-шот 60 мл для підтримки відновлення та активності під час тренувань."
    },
    {
      name: "Pump Apple Pear",
      price: "80 грн",
      image: "pump_apple_pear.jpg",
      description: "Передтренувальний шот 60 мл зі смаком apple pear."
    },
    {
      name: "Pump Cherry Passionfruit",
      price: "80 грн",
      image: "pump_cherry_passionfruit.jpg",
      description: "Передтренувальний шот 60 мл зі смаком cherry passionfruit."
    },
    {
      name: "Pump Kiwi Strawberry",
      price: "80 грн",
      image: "pump_kiwi_strawberry.jpg",
      description: "Передтренувальний шот 60 мл зі смаком kiwi strawberry."
    }
  ],

  snacks: [
    {
      name: "Monsters Praline Nut",
      price: "80 грн",
      image: "monsters_praline_nut.jpg",
      description: "Протеїновий батончик Monsters зі смаком praline nut."
    },
    {
      name: "Monsters Strawberry",
      price: "80 грн",
      image: "monsters_strawberry.jpg",
      description: "Протеїновий батончик Monsters зі смаком strawberry."
    },
    {
      name: "Monsters Cocoa",
      price: "80 грн",
      image: "monsters_cocoa.jpg",
      description: "Протеїновий батончик Monsters зі смаком cocoa."
    },
    {
      name: "Monsters Dried Apricots",
      price: "80 грн",
      image: "monsters_dried_apricots.jpg",
      description: "Протеїновий батончик Monsters зі смаком dried apricots."
    },
    {
      name: "Space Bite Hazelnut & Date",
      price: "80 грн",
      image: "space_bite_hazelnut_date.jpg",
      description: "Protein bar Space Bite зі смаком hazelnut & date."
    },
    {
      name: "Space Bite Almond & Cranberry",
      price: "80 грн",
      image: "space_bite_almond_cranberry.jpg",
      description: "Nut bar Space Bite зі смаком almond & cranberry."
    },
    {
      name: "Crunch",
      price: "80 грн",
      image: "crunch_bar.jpg",
      description: "Протеїновий батончик Crunch."
    },
    {
      name: "Power Pro",
      price: "80 грн",
      image: "power_pro_bar.jpg",
      description: "Протеїновий батончик Power Pro."
    },
    {
      name: "Tigger",
      price: "80 грн",
      image: "tigger_bar.jpg",
      description: "Протеїновий батончик Tigger."
    }
  ],

  water: [
    {
      name: "Моршинська 1.5 л",
      price: "35 грн",
      image: "morshynska_15.jpg",
      description: "Питна вода у великому форматі для тренування та щоденного балансу."
    },
    {
      name: "Sport 0.75",
      price: "30 грн",
      image: "sport_075.jpg",
      description: "Зручна спортивна пляшка для занять у залі."
    },
    {
      name: "4MOVE Isotonic Drink 750 мл",
      price: "45 грн",
      image: "4move.jpg",
      description: "Ізотонічний напій для підтримки водного балансу під час навантажень."
    }
  ],

  extra: [
    { name: "Резинки для волосся", price: "15 грн" },
    { name: "Шкарпетки", price: "30 грн" },
    { name: "Шапочка для душу", price: "15 грн" },
    { name: "Міні шампунь", price: "30 грн" },
    { name: "Міні гель для душу", price: "30 грн" },
    { name: "Оренда рушника", price: "50 грн" }
  ]
};

function createProductCard(product) {
  return `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}">
      <div class="product-content">
        <div class="product-name">${product.name}</div>
        <div class="product-price">${product.price}</div>
        <div class="product-desc">${product.description}</div>
      </div>
    </div>
  `;
}

function createExtraRow(item) {
  return `
    <div class="extra-row">
      <span>${item.name}</span>
      <strong>${item.price}</strong>
    </div>
  `;
}

function renderProducts() {
  const shotGrid = document.getElementById("shotGrid");
  const snacksGrid = document.getElementById("snacksGrid");
  const waterGrid = document.getElementById("waterGrid");
  const extrasList = document.getElementById("extrasList");

  if (shotGrid) {
    shotGrid.innerHTML = defaultProducts.shot.map(createProductCard).join("");
  }

  if (snacksGrid) {
    snacksGrid.innerHTML = defaultProducts.snacks.map(createProductCard).join("");
  }

  if (waterGrid) {
    waterGrid.innerHTML = defaultProducts.water.map(createProductCard).join("");
  }

  if (extrasList) {
    extrasList.innerHTML = defaultProducts.extra.map(createExtraRow).join("");
  }
}

renderProducts();
