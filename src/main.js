import { fetchBooksBySubject, fetchBookDetails } from "./api.js";
import emitter from "./eventEmitter.js";

let currentBooks = []; // Store the current list of books for back navigation

// --- Observers ---

emitter.on("loadingStart", () => {
  const bookList = document.getElementById("searchResults");
  const searchAlert = document.getElementById("searchAlert");
  const searchResultsTitle = document.getElementById("searchResultsTitle");
  const searchButton = document.getElementById("searchButton");

  bookList.innerHTML = "<p>Searching...</p>";
  searchAlert.classList.add("hidden");
  searchResultsTitle.classList.add("hidden");
  searchButton.disabled = true;
});

emitter.on("booksLoaded", ({ books, subject }) => {
  currentBooks = books;
  const bookList = document.getElementById("searchResults");
  const searchAlert = document.getElementById("searchAlert");
  const searchResultsTitle = document.getElementById("searchResultsTitle");
  const searchButton = document.getElementById("searchButton");

  bookList.innerHTML = "";
  searchAlert.classList.add("hidden");
  searchResultsTitle.classList.add("hidden");
  searchButton.disabled = false;

  if (books.length === 0) {
    const alertBox = document.createElement("p");
    alertBox.textContent = `No books found for "${subject}".`;
    alertBox.className = "searchAlert";
    bookList.appendChild(alertBox);
    return;
  }

  searchResultsTitle.textContent = `Search results for "${subject}":`;
  searchResultsTitle.classList.remove("hidden");

  books.forEach((book) => {
    bookList.appendChild(createBookItem(book));
  });
});

emitter.on("bookDetailsLoaded", (bookDetails) => {
  if (!bookDetails) {
    alert("Error fetching book details.");
    return;
  }
  const searchResults = document.getElementById("searchResults");
  const searchResultsTitle = document.getElementById("searchResultsTitle");
  searchResultsTitle.classList.add("hidden");
  searchResults.innerHTML = "";
  searchResults.appendChild(createBookDetails(bookDetails));
});

// --- DOM helpers ---

function createBookItem(book) {
  const bookItem = document.createElement("div");
  bookItem.className = "bookItem";
  bookItem.dataset.workKey = book.key;
  bookItem.innerHTML = `
    <div class="bookInfo">
      <h3>${book.title}</h3>
      <p class="bookAuthor">by ${book.authors.map((a) => a.name).join(", ")}</p>
    </div>
    <div class="bookAction">
      <span>Dettagli →</span>
    </div>
  `;
  return bookItem;
}

function createBookDetails(bookDetails) {
  const detailsContainer = document.createElement("div");
  detailsContainer.className = "bookDetails";
  detailsContainer.innerHTML = `
    <h2>${bookDetails.title}</h2>
    <img src="https://covers.openlibrary.org/b/id/${bookDetails.covers ? bookDetails.covers[0] : "placeholder"}-M.jpg" alt="${bookDetails.title} cover" class="bookCover" />
    <h3 class="bookDescriptionTitle">Description</h3>
    <p class="bookDescription">${bookDetails.description ? truncateDescription(typeof bookDetails.description === "string" ? bookDetails.description : bookDetails.description.value) : "No description available."}</p>
    <button class="backButton">← Back</button>
  `;

  detailsContainer
    .querySelector(".backButton")
    .addEventListener("click", () => {
      const bookList = document.getElementById("searchResults");
      const searchResultsTitle = document.getElementById("searchResultsTitle");
      bookList.innerHTML = "";
      searchResultsTitle.classList.remove("hidden");
      currentBooks.forEach((book) =>
        bookList.appendChild(createBookItem(book)),
      );
    });

  return detailsContainer;
}

// --- Event handlers ---

document.getElementById("searchButton").addEventListener("click", (event) => {
  event.preventDefault();
  const subjectInput = document.getElementById("searchInput");
  const searchAlert = document.getElementById("searchAlert");
  const subject = subjectInput.value.trim();
  subjectInput.value = "";

  if (!subject) {
    searchAlert.textContent = "Please enter a book genre.";
    searchAlert.classList.remove("hidden");
    setTimeout(() => {
      searchAlert.classList.add("hidden");
    }, 3000);
    return;
  }

  searchAlert.classList.add("hidden");
  fetchBooksBySubject(subject);
});

document.getElementById("searchInput").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("searchButton").click();
  }
});

document.getElementById("searchResults").addEventListener("click", (event) => {
  const bookItem = event.target.closest(".bookItem");
  if (bookItem) {
    fetchBookDetails(bookItem.dataset.workKey);
  }
});

// --- Utils ---

function truncateDescription(description, maxLength = 1000) {
  if (description.length <= maxLength) return description;
  return description.slice(0, maxLength) + "...";
}
