let departementActuel = null;

async function nouveauDepartement() {
    const res = await fetch("/api/random");
    const data = await res.json();
    departementActuel = data;
    document.getElementById("question").innerHTML =
        `Clique sur le département : <b>${departementActuel.nom} (${departementActuel.numero})</b>`;
}

async function chargerCarte() {
  const res = await fetch("/static/images/France.svg");
  const svgText = await res.text();
  document.getElementById("carte").innerHTML = svgText;

  const svgRoot = document.querySelector("#carte svg");
  svgRoot.setAttribute("preserveAspectRatio", "xMidYMid meet");

  // Récupérer le groupe des noms
  const nomsDeps = svgRoot.querySelector("#Noms_des_départements");

  // Gestion du checkbox pour afficher ou cacher
  const toggleCheckbox = document.getElementById("toggle-noms");
  if (nomsDeps) {
    nomsDeps.style.display = toggleCheckbox.checked ? "inline" : "none";

    // Écouter les changements du checkbox
    toggleCheckbox.addEventListener("change", () => {
      nomsDeps.style.display = toggleCheckbox.checked ? "inline" : "none";
    });
  }

  // Sélectionne les vrais départements
  const departements = Array.from(svgRoot.querySelectorAll("[id^='Dep']"))
    .filter(el => /^Dep(\d+[AB]?)/.test(el.id));

  departements.forEach(el => {
    el.classList.add("dept");
    el.style.cursor = "pointer";

    // Listener clic
    el.addEventListener("click", () => {
      if (!departementActuel) return;
      const match = el.id.match(/^Dep(\d+[AB]?)/);
      if (!match) return;
      const numeroSVG = match[1];

      if (numeroSVG === departementActuel.numero) {
        el.classList.add("correct");
        setTimeout(() => {
          el.classList.remove("correct");
          nouveauDepartement();
        }, 800);
      } else {
        el.classList.add("wrong");
        setTimeout(() => {
          el.classList.remove("wrong");
        }, 800);
      }
    });
  });

  nouveauDepartement();
}



chargerCarte();