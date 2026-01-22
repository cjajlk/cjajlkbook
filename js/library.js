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

function isLibraryUnlocked() {
  return localStorage.getItem("cjajlk_library_unlocked") === "true";
}


function isReadingUnlocked(bookId) {
  return (
    localStorage.getItem("unlock_all_books") === "true" ||
    localStorage.getItem(`unlock_book_${bookId}`) === "true"
  );
}

function isReadingUnlocked() {
  return localStorage.getItem("cjajlk_library_unlocked") === "true";
}


(function handleKofiReturn() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("unlock") === "library") {
    localStorage.setItem("cjajlk_library_unlocked", "true");

    // Nettoyer l’URL
    window.history.replaceState({}, document.title, window.location.pathname);

    // Message doux (optionnel mais recommandé)
    showUnlockConfirmation();
  }
})();

function showUnlockConfirmation() {
  const banner = document.createElement("div");
  banner.className = "unlock-confirmation";
  banner.textContent = "La bibliothèque est désormais ouverte. Merci pour votre soutien.";

  document.body.prepend(banner);

  setTimeout(() => banner.remove(), 5000);
}



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
  card.addEventListener("click", (e) => {

  // ✅ Si on clique sur le bouton Ko-fi, on laisse faire
  if (e.target.closest(".kofi-link")) {
    return;
  }

  e.preventDefault();


  if (book.status !== "full_reading") return;

  // Si déjà débloqué → lecture directe
  if (isReadingUnlocked(book.id)) {
    window.location.href = `reader.html?book=${book.id}`;
    return;
  }

  // Supprimer une carte existante sous ce livre
  const existing = card.querySelector(".unlock-card");
  if (existing) existing.remove();

  // Créer la carte de déblocage
  const unlockCard = document.createElement("div");
  unlockCard.className = "unlock-card";

  unlockCard.innerHTML = `
  <p><strong>Cette lecture s’ouvre par un geste de soutien.</strong></p>

  <p>
    Les textes proposés ici ne sont pas des fichiers à consommer,
    mais des espaces à traverser.
  </p>

  <p>
    En passant par <strong>Ko-fi</strong>, vous soutenez directement la création
    et la lecture est débloquée de manière sécurisée sur ce site.
  </p>

  <p><em>
    La lecture reste ici, présente, non téléchargeable, non copiable.
  </em></p>

  <a
    href="https://ko-fi.com/cjajlk?utm_source=cjajlkbook&unlock=library"
    target="_blank"
    rel="noopener"
    class="kofi-link"
  >
    Accéder à la lecture via Ko-fi
  </a>
`;


  card.appendChild(unlockCard);

const kofiLink = unlockCard.querySelector(".kofi-link");
kofiLink.addEventListener("click", (e) => {
  e.stopPropagation();
});
});




    container.appendChild(card);
  });
}
