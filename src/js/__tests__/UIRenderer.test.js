import { describe, it, expect } from "vitest";
import { createBookItem } from "../UIRenderer";

describe("UIRenderer - createBookItem", () => {
  it("should render book item with all fields", () => {
    const book = {
      title: "The Hobbit",
      key: "/works/1",
      authors: [{ name: "J.R.R. Tolkien" }],
    };

    const item = createBookItem(book);

    expect(item.className).toBe("bookItem");
    expect(item.dataset.workKey).toBe("/works/1");
    expect(item.textContent).toContain("The Hobbit");
    expect(item.textContent).toContain("J.R.R. Tolkien");
  });

  it("should handle missing title", () => {
    const book = { key: "/works/1", authors: [{ name: "Author" }] };
    const item = createBookItem(book);

    expect(item.textContent).toContain("Titolo non disponibile");
    expect(item.dataset.workKey).toBe("/works/1");
  });

  it("should handle missing authors", () => {
    const book = { title: "Book", key: "/works/1" };
    const item = createBookItem(book);

    expect(item.textContent).toContain("Book");
    expect(item.textContent).toContain("Autore non trovato");
  });

  it("should handle missing key", () => {
    const book = { title: "Book", authors: [{ name: "Author" }] };
    const item = createBookItem(book);

    expect(item.dataset.workKey).toBe("unknown");
  });
});
