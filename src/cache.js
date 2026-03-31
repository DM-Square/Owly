export class BookDetailsCache {
  static instance = null;

  constructor() {
    if (BookDetailsCache.instance) {
      return BookDetailsCache.instance;
    }
    this.cache = {};
    BookDetailsCache.instance = this;
  }

  has(workKey) {
    return !!this.cache[workKey];
  }

  get(workKey) {
    return this.cache[workKey];
  }

  set(workKey, details) {
    this.cache[workKey] = details;
  }
}
