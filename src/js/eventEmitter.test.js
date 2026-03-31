import { describe, it, expect, beforeEach, vi } from "vitest";
import emitter from "./eventEmitter";

describe("EventEmitter", () => {
  beforeEach(() => {
    // Reset degli observers prima di ogni test
    emitter.observers = {};
  });

  it("should register an event listener", () => {
    const callback = () => {};
    emitter.on("testEvent", callback);
    expect(emitter.observers["testEvent"]).toContain(callback);
  });

  it("should call all registered listeners for an event with correct data", () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();

    emitter.on("testEvent", callback1);
    emitter.on("testEvent", callback2);

    emitter.emit("testEvent", { data: "test" });

    expect(callback1).toHaveBeenCalledWith({ data: "test" });
    expect(callback2).toHaveBeenCalledWith({ data: "test" });
  });

  it("should not call listeners for unrelated events", () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();

    emitter.on("event1", callback1);
    emitter.on("event2", callback2);

    emitter.emit("event1", {});

    expect(callback1).toHaveBeenCalled();
    expect(callback2).not.toHaveBeenCalled();
  });

  it("should not throw error when emitting nonexistent event", () => {
    expect(() => {
      emitter.emit("nonexistent", {});
    }).not.toThrow();
  });

  it("should be a singleton instance", () => {
    const callback = vi.fn();
    emitter.on("singletonTest", callback);
    emitter.emit("singletonTest", "data");
    expect(callback).toHaveBeenCalledWith("data");
  });
});
