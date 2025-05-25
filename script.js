// ---------------- Appel API ------------------
document.addEventListener("DOMContentLoaded", function () {
  fetch("https://demo.theeventscalendar.com/wp-json/tribe/events/v1/events")
    .then((response) => response.json())
    .then((data) => {
      const eventsContainer = document.getElementById("events-container");

      data.events.forEach((event) => {
        // Création du conteneur d'événement
        const eventElement = document.createElement("div");
        eventElement.classList.add("event");

        // Ajout du titre
        const title = document.createElement("h2");
        title.textContent = event.title;
        eventElement.appendChild(title);

        // Ajout de la date
        const date = document.createElement("p");
        date.textContent = `Date : ${new Date(
          event.start_date
        ).toLocaleDateString()}`;
        eventElement.appendChild(date);

        // Ajout du lieu
        const location = document.createElement("p");
        location.textContent = `Lieu : ${event.venue.city}, ${event.venue.country}`;
        eventElement.appendChild(location);

        // Création du bouton
        const button = document.createElement("button");
        button.textContent = "Voir plus";
        button.addEventListener("click", () =>
          alert(`Plus de détails pour : ${event.title}`)
        );
        eventElement.appendChild(button);

        // Ajout de l'événement au conteneur principal
        eventsContainer.appendChild(eventElement);
      });
    })

    .catch((error) =>
      console.error("Erreur de récupération des événements :", error)
    );
});

// ---------------- modal ------------------
function afficherDetails(event) {
  document.getElementById("modal-title").textContent = event.title;
  document.getElementById("modal-description").textContent = event.description;
  document.getElementById(
    "modal-date"
  ).textContent = `📅 Date : ${event.start_date}`;
  document.getElementById(
    "modal-location"
  ).textContent = `📍 Lieu : ${event.venue.city}, ${event.venue.country}`;
  document.getElementById("modal-link").href = event.url;

  document.getElementById("event-modal").style.display = "flex";
}

document.getElementById("close-modal").addEventListener("click", () => {
  document.getElementById("event-modal").style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === document.getElementById("event-modal")) {
    document.getElementById("event-modal").style.display = "none";
  }
});

// ----------bouton voir plus -----------------------------------------------

document.getElementById("voir-plus").addEventListener("click", function () {
  document.getElementById("modal").style.display = "flex";
});

document.getElementById("close-modal").addEventListener("click", function () {
  document.getElementById("modal").style.display = "none";
});

window.addEventListener("click", function (event) {
  const modal = document.getElementById("modal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

//---------------------Thème clair / sombre----------------------
document.addEventListener("DOMContentLoaded", () => {
  const themeButton = document.getElementById("toggle-theme");
  const currentTheme = getCookie("theme");

  if (currentTheme) {
    document.body.classList.add(currentTheme);
  }

  themeButton.addEventListener("click", () => {
    let newTheme = document.body.classList.contains("dark-mode")
      ? "light-mode"
      : "dark-mode";
    document.body.classList.remove("light-mode", "dark-mode");
    document.body.classList.add(newTheme);
    setCookie("theme", newTheme, 365); // Stocke le thème pour 1 an
  });
});

function setCookie(name, value, days) {
  let date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
}

function getCookie(name) {
  let cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    let [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return null;
}
// ------------------- darck mode 2 de demo ---------------------
const body = document.querySelector("body");
const button = document.getElementById("toggle-theme");

button.addEventListener("click", () => {
  body.classList.toggle("toggle-theme");
  button.textContent = body.classList.contains("toggle-theme")
    ? "Passer en mode clair"
    : "Passer en mode sombre";
});
