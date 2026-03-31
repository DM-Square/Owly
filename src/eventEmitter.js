// Subject

class EventEmitter {
  constructor() {
    if (EventEmitter.instance) return EventEmitter.instance;
    this.observers = {};
    EventEmitter.instance = this;
  }

  on(event, callback) {
    if (!this.observers[event]) {
      this.observers[event] = [];
    }
    this.observers[event].push(callback);
  }

  emit(event, data) {
    if (this.observers[event]) {
      this.observers[event].forEach((cb) => cb(data));
    }
  }
}

export default new EventEmitter();
