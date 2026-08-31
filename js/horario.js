const body = document.querySelector("[data-hours]");

fetch("data/horario.json")
  .then((r) => r.json())
  .then((data) => {
    body.innerHTML = data.dias.map((d) => `
      <tr>
        <th>${d.dia}</th>
        <td>${d.manana}</td>
        <td>${d.tarde}</td>
      </tr>
    `).join("");
    document.querySelector("[data-hours-note]").textContent = data.nota;
    document.querySelector("[data-festivos]").textContent = data.festivos;
    document.querySelector("[data-urgencias]").textContent = data.urgencias;
  });
