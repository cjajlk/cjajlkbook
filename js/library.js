// 🌙 cjajlkbook — Hall de la bibliothèque


document.addEventListener("DOMContentLoaded", () => {
  fetch("data/books.json")
    .then(response => response.json())
    .then(books => {
      displayBooks(books);
    })
    .catch(error => {
      console.error("Erreur chargement books.json :", error);
    });
});

function displayBooks(books) {
  const container = document.getElementById("libraryContainer");

  books.forEach(book => {
   
    if (!book.published) return;

    const card = document.createElement("div");
    card.className = "book-card";

    const title = document.createElement("h2");
    title.className = "book-title";
    title.textContent = book.title;

    const description = document.createElement("p");
    description.className = "book-description";
    description.textContent = book.description;


    if (book.readingTime || book.pages) {
  const meta = document.createElement("div");
  meta.className = "book-meta";

  if (book.readingTime) {
    const time = document.createElement("span");
    time.textContent = `⏳ ${book.readingTime}`;
    meta.appendChild(time);
  }

  if (book.pages) {
    const pages = document.createElement("span");
    pages.textContent = `📖 ${book.pages}`;
    meta.appendChild(pages);
  }

  card.appendChild(meta);
}


    const status = document.createElement("div");
    status.className = "book-status";

    if (book.status === "excerpt_only") {
  status.textContent = "Extrait disponible";
} else if (book.status === "full_reading") {
  status.textContent = "Lecture disponible";
} else if (book.status === "in_progress") {
  status.textContent = "En cours d’écriture";
}


    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(status);

    // Interaction douce (plus tard : ouvrir extrait ou lecture)
    card.addEventListener("click", () => {
  if (book.status === "full_reading") {
    window.location.href = `reader.html?book=${book.id}`;
  }
});


    container.appendChild(card);
  });
}
