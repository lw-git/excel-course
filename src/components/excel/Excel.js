import {$} from '@core/dom';

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
  }
  getRoot() {
    // root element
    const $root = $.create('div', 'excel');

    // wrap each component with Dom class and append to root element
    this.components = this.components.map((Component) => {
      const $el = $.create('div', Component.className);
      const component = new Component($el);
      // // DEBUG
      // if (component.name) {
      //   window['c' + component.name] = component;
      // }
      $el.html(component.toHTML());
      $root.append($el)
      return component
    });

    return $root;
  }

  render() {
    this.$el.append(this.getRoot());
    // add event listeners to components
    this.components.forEach((component) => component.init())
  }
}
