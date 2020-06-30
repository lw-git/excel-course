import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.subscribe = options.subscribe || [];
    this.store = options.store;
    this.unsubscribers = [];
    this.prepare();
  }

  // setup component before init
  prepare() {}

  // return component template
  toHTML() {
    return ''
  }

  // inform listeners about events
  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  // subscribe on events
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubscribers.push(unsub);
  }

  $dispatch(action) {
    this.store.dispatch(action);
  }

  // only changes to the fields for which there is a subscription come here
  storeChanged() {

  }

  isWatching(key) {
    return this.subscribe.includes(key);
  }

  // initialization and add listeners
  init() {
    this.initDOMListeners()
  }
  // remove component and listeners
  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach((unsub) => unsub());
  }
}
