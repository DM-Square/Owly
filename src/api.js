import emitter from "./eventEmitter.js";

const apiUrl = `https://openlibrary.org/subjects`;

export async function fetchBooksBySubject(subject) {
  try {
    emitter.emit("loadingStart", subject);
    const response = await fetch(`${apiUrl}/${subject}.json`);
    if (!response.ok) {
      throw new Error(`Error fetching books for subject: ${subject}.`);
    }
    const data = await response.json();
    emitter.emit("booksLoaded", { books: data.works, subject });
  } catch (error) {
    console.error(error);
    emitter.emit("booksLoaded", { books: [], subject });
  }
}

export async function fetchBookDetails(workKey) {
  try {
    const response = await fetch(`https://openlibrary.org${workKey}.json`);
    if (!response.ok) {
      throw new Error(`Error fetching book details for key: ${workKey}.`);
    }
    const data = await response.json();
    emitter.emit("bookDetailsLoaded", data);
  } catch (error) {
    console.error(error);
    emitter.emit("bookDetailsLoaded", null);
  }
}
