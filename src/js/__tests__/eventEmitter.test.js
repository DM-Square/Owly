import { describe, it, expect, beforeEach, vi } from "vitest";
import emitter from "../eventEmitter";

describe("EventEmitter (Singleton + Observer Pattern)", () => {
  beforeEach(() => {
    emitter.observers = {};
  });

  it("should register and call event listeners", () => {
    const callback = vi.fn();
    emitter.on("testEvent", callback);
    emitter.emit("testEvent", { data: "test" });

    expect(callback).toHaveBeenCalledWith({ data: "test" });
  });

  it("should call multiple listeners for same event", () => {
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

  it("should be a singleton instance", () => {
    const callback = vi.fn();
    emitter.on("singletonTest", callback);
    emitter.emit("singletonTest", "data");

    expect(callback).toHaveBeenCalledWith("data");
  });
});
