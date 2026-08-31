const STORAGE_KEY = "ferreteria.catalog.v1";

async function loadVersion(root = document) {
  try {
    const res = await fetch(new URL("../version.json", import.meta.url));
    const data = await res.json();
    root.querySelectorAll("[data-version]").forEach((el) => {
      el.textContent = `v${data.version}`;
      el.title = `Publicada el ${data.publishedAt}`;
    });
  } catch {
    /* La versión del HTML permanece. */
  }
}

function toggleNav() {
  const nav = document.querySelector(".nav");
  const btn = document.querySelector("[data-nav-toggle]");
  if (!nav || !btn) return;
  btn.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", String(open));
  });
}

loadVersion();
toggleNav();

export { STORAGE_KEY, loadVersion };
