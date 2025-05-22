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
