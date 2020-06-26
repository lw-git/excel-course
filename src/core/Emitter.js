export class Emitter {
  constructor() {
    this.listeners = {}
  }

  // inform listeners
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false;
    }
    this.listeners[event].forEach((listener) => {
      listener(...args)
    })
    return true;
  }

  // add new listener
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fn);
    // for unsubscribe
    return () => {
      this.listeners[event] =
        this.listeners[event].filter((listener) => listener !== fn);
    }
  }
}
