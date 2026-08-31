import { STORAGE_KEY } from "./app.js";

const list = document.querySelector("[data-catalog]");
const search = document.querySelector("[data-search]");
const filters = document.querySelector("[data-filters]");
let products = [];
let category = "Todas";

function money(product) {
  if (!product.precio || product.unidad === "consulta") return "Consultar";
  return `${product.precio.toLocaleString("es-ES", { minimumFractionDigits: 2 })} € / ${product.unidad}`;
}

function render() {
  const q = (search?.value || "").trim().toLowerCase();
  const visible = products.filter((p) => p.visible !== false)
    .filter((p) => category === "Todas" || p.categoria === category)
    .filter((p) => !q || `${p.nombre} ${p.descripcion} ${p.categoria}`.toLowerCase().includes(q));

  list.innerHTML = visible.map((p) => `
    <article class="product">
      <img src="${p.imagen || "assets/cc/taladro.jpg"}" alt="">
      <div class="pad">
        <p class="muted">${p.categoria}</p>
        <h3>${p.nombre}</h3>
        <p>${p.descripcion || ""}</p>
        <p class="price">${money(p)}</p>
        <p class="muted">${p.stock > 0 ? `Stock: ${p.stock}` : "Sin existencias / bajo pedido"}</p>
      </div>
    </article>
  `).join("") || "<p>No hay artículos con ese filtro.</p>";
}

function renderFilters(items) {
  const cats = ["Todas", ...new Set(items.map((p) => p.categoria))];
  filters.innerHTML = cats.map((cat) => `<button type="button" data-cat="${cat}">${cat}</button>`).join("");
  filters.addEventListener("click", (ev) => {
    const btn = ev.target.closest("button[data-cat]");
    if (!btn) return;
    category = btn.dataset.cat;
    [...filters.children].forEach((el) => el.classList.toggle("is-on", el === btn));
    render();
  });
  filters.querySelector("button")?.classList.add("is-on");
}

async function init() {
  const seed = await fetch("data/productos.json").then((r) => r.json());
  const local = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
  products = (local && Array.isArray(local.productos) ? local.productos : seed.productos);
  renderFilters(products);
  search?.addEventListener("input", render);
  render();
}

init();
