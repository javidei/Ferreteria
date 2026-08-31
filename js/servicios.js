const root = document.querySelector("[data-services]");

fetch("data/servicios.json")
  .then((r) => r.json())
  .then((data) => {
    root.innerHTML = data.servicios.map((s) => `
      <article class="service" id="${s.id}">
        <p class="kicker">Servicio</p>
        <h2>${s.nombre}</h2>
        <p>${s.resumen}</p>
        <ul>${s.incluye.map((item) => `<li>${item}</li>`).join("")}</ul>
      </article>
    `).join("");
  });
