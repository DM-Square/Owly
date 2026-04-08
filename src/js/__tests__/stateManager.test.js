import { describe, it, expect } from "vitest";
import {
  setCurrentBooks,
  getCurrentBooks,
  setCurrentSubject,
  getCurrentSubject,
} from "../stateManager";

describe("StateManager", () => {
  it("should set and get current books", () => {
    const books = [
      { title: "Book 1", key: "/works/1" },
      { title: "Book 2", key: "/works/2" },
    ];
    setCurrentBooks(books);
    expect(getCurrentBooks()).toEqual(books);
  });

  it("should set and get current subject", () => {
    setCurrentSubject("fantasy");
    expect(getCurrentSubject()).toBe("fantasy");
  });

  it("should preserve state across multiple calls", () => {
    const books = [{ title: "Book A" }];
    const subject = "science-fiction";

    setCurrentBooks(books);
    setCurrentSubject(subject);

    expect(getCurrentBooks()).toEqual(books);
    expect(getCurrentSubject()).toBe(subject);
  });
});
