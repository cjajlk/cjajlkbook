document.addEventListener("DOMContentLoaded", () => {
 const isUnlocked = localStorage.getItem("cjajlk_library_unlocked") === "true";

if (!isUnlocked) {
  window.location.href = "index.html";
}

  const params = new URLSearchParams(window.location.search);
  const bookId = params.get("book");

  if (!bookId) return;

  fetch("data/books-content.json")
    .then(res => res.json())
    .then(data => {
     const book = data[bookId];
if (!book) return;

const coverContainer = document.getElementById("bookCover");
const content = document.getElementById("bookContent");

document.getElementById("bookTitle").textContent = book.title;

if (book.cover) {
  const img = document.createElement("img");
  img.src = book.cover;
  img.className = "reader-cover";
  coverContainer.appendChild(img);

}

book.chapters.forEach(chapter => {
  const h2 = document.createElement("h2");
  h2.textContent = chapter.title;
  h2.className = "reader-chapter";
  content.appendChild(h2);

  chapter.paragraphs.forEach(text => {
    const p = document.createElement("p");
    p.textContent = text;
    content.appendChild(p);
  });
});



      

      
    });
});
