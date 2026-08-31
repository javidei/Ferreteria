import { STORAGE_KEY } from "./app.js";

const table = document.querySelector("[data-table]");
const form = document.querySelector("[data-form]");
const status = document.querySelector("[data-status]");
let products = [];

function uid() {
  return `p-${Math.random().toString(36).slice(2, 7)}`;
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ productos: products }));
  status.textContent = `Guardado en este navegador · ${products.length} artículos · sin base de datos.`;
}

function render() {
  table.innerHTML = `
    <tr><th>Artículo</th><th>Cat.</th><th>Precio</th><th>Stock</th><th></th></tr>
    ${products.map((p) => `
      <tr>
        <td>${p.nombre}${p.visible === false ? " <span class='muted'>(oculto)</span>" : ""}</td>
        <td>${p.categoria}</td>
        <td class="mono">${p.unidad === "consulta" || !p.precio ? "consulta" : p.precio + " €"}</td>
        <td class="mono">${p.stock ?? 0}</td>
        <td><button type="button" data-edit="${p.id}">Editar</button></td>
      </tr>
    `).join("")}
  `;
}

function fill(p = {}) {
  form.id.value = p.id || "";
  form.nombre.value = p.nombre || "";
  form.categoria.value = p.categoria || "Fijación";
  form.precio.value = p.precio ?? "";
  form.unidad.value = p.unidad || "ud";
  form.stock.value = p.stock ?? 0;
  form.imagen.value = p.imagen || "assets/cc/taladro.jpg";
  form.descripcion.value = p.descripcion || "";
  form.visible.checked = p.visible !== false;
}

table.addEventListener("click", (ev) => {
  const id = ev.target.dataset.edit;
  if (!id) return;
  fill(products.find((p) => p.id === id) || {});
});

form.addEventListener("submit", (ev) => {
  ev.preventDefault();
  const item = {
    id: form.id.value || uid(),
    nombre: form.nombre.value.trim(),
    categoria: form.categoria.value.trim(),
    precio: Number(form.precio.value || 0),
    unidad: form.unidad.value.trim() || "ud",
    stock: Number(form.stock.value || 0),
    imagen: form.imagen.value.trim(),
    descripcion: form.descripcion.value.trim(),
    visible: form.visible.checked
  };
  const i = products.findIndex((p) => p.id === item.id);
  if (i >= 0) products[i] = item;
  else products.push(item);
  persist();
  render();
  form.reset();
  form.visible.checked = true;
});

document.querySelector("[data-delete]")?.addEventListener("click", () => {
  const id = form.id.value;
  if (!id) return;
  products = products.filter((p) => p.id !== id);
  persist();
  render();
  form.reset();
});

document.querySelector("[data-reset]")?.addEventListener("click", async () => {
  const seed = await fetch("../data/productos.json").then((r) => r.json());
  products = seed.productos;
  persist();
  render();
});

document.querySelector("[data-export]")?.addEventListener("click", () => {
  const blob = new Blob([JSON.stringify({ productos: products }, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "productos-ferreteria.json";
  a.click();
});

async function init() {
  const seed = await fetch("../data/productos.json").then((r) => r.json());
  const local = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
  products = local?.productos || seed.productos;
  persist();
  render();
}

init();
