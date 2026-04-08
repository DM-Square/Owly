import { describe, it, expect, beforeEach, vi } from "vitest";
import { fetchBooksBySubject, fetchBookDetails } from "../api";

global.fetch = vi.fn();

describe("API Functions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch books by subject and return correct structure", async () => {
    const mockBooks = [{ title: "Book 1", key: "/works/1" }];
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ works: mockBooks }),
    });

    const result = await fetchBooksBySubject("fantasy");

    expect(result).toEqual({ books: mockBooks, subject: "fantasy" });
  });

  it("should throw error on failed fetch for books", async () => {
    fetch.mockResolvedValueOnce({ ok: false, status: 404 });
    await expect(fetchBooksBySubject("invalid")).rejects.toThrow();
  });

  it("should fetch book details and cache results", async () => {
    const mockDetails = { title: "Book 1", description: "A great book" };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockDetails,
    });

    // First call (should fetch from API)
    const result1 = await fetchBookDetails("/works/123");
    expect(result1).toEqual(mockDetails);

    // Second call (should use cache)
    const result2 = await fetchBookDetails("/works/123");
    expect(result2).toEqual(mockDetails);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("should throw error on failed fetch for details", async () => {
    fetch.mockResolvedValueOnce({ ok: false, status: 500 });
    await expect(fetchBookDetails("/works/invalid")).rejects.toThrow();
  });
});
