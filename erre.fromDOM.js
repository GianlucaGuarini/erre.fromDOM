(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('erre')) :
  typeof define === 'function' && define.amd ? define(['erre'], factory) :
  (global.fromDOM = factory(global.erre));
}(this, (function (erre) { 'use strict';

  erre = erre && erre.hasOwnProperty('default') ? erre['default'] : erre;

  /**
   * Converts any DOM node/s to a loopable array
   * @param   { HTMLElement|NodeList } els - single html element or a node list
   * @returns { Array } always a loopable object
   */
  function domToArray(els) {
    // can this object be already looped?
    if (!Array.isArray(els)) {
      // is it a node list?
      if (
          /^\[object (HTMLCollection|NodeList|Object)\]$/
            .test(Object.prototype.toString.call(els))
          && typeof els.length === 'number'
        )
        return Array.from(els)
      else
        // if it's a single node
        // it will be returned as "array" with one single entry
        return [els]
    }
    // this object could be looped out of the box
    return els
  }

  /**
   * Split a string into several items separed by spaces
   * @param   { String } l - events list
   * @returns { Array } all the events detected
   * @private
   */
  const split = l => l.split(/\s/);

  /**
   * Set a listener for all the events received separated by spaces
   * @param   { HTMLElement|NodeList|Array } els     - DOM node/s where the listeners will be bound
   * @param   { String }                     evList  - list of events we want to bind or unbind space separated
   * @param   { Function }                   cb      - listeners callback
   * @param   { String }                     method  - either 'addEventListener' or 'removeEventListener'
   * @param   { Object }                     options - event options (capture, once and passive)
   * @private
   */
  function manageEvents(els, evList, cb, method, options) {
    els = domToArray(els);

    split(evList).forEach((e) => {
      for (let el of els) el[method](e, cb, options || false);
    });
  }

  /**
   * Set a listener for all the events received separated by spaces
   * @param   { HTMLElement|Array } els    - DOM node/s where the listeners will be bound
   * @param   { String }            evList - list of events we want to bind space separated
   * @param   { Function }          cb     - listeners callback
   * @param   { Object }            options - event options (capture, once and passive)
   * @returns { HTMLElement|NodeList|Array } DOM node/s and first argument of the function
   */
  function add(els, evList, cb, options) {
    manageEvents(els, evList, cb, 'addEventListener', options);
    return els
  }

  /**
   * Remove all the listeners for the events received separated by spaces
   * @param   { HTMLElement|Array } els     - DOM node/s where the events will be unbind
   * @param   { String }            evList  - list of events we want unbind space separated
   * @param   { Function }          cb      - listeners callback
   * @param   { Object }             options - event options (capture, once and passive)
   * @returns { HTMLElement|NodeList|Array }  DOM node/s and first argument of the function
   */
  function remove(els, evList, cb, options) {
    manageEvents(els, evList, cb, 'removeEventListener', options);
    return els
  }

  /**
   * Create an erre stream from DOM events
   * @param   {HTMLElement|NodeList|Array} els - DOM node/s where the listeners will be bound
   * @param   {string} eventsList  - list of events we want to stream space separated
   * @param   {Object} options - event options (capture, once and passive)
   * @returns {Generator} - [erre stream generator](https://github.com/GianlucaGuarini/erre#stream)
   */
  function fromDOM(els, eventsList, options) {
    const stream = erre();
    const onValue = e => stream.push(e);

    add(els, eventsList, onValue, options);
    stream.on.end(() => remove(els, eventsList, onValue, options));

    return stream
  }

  return fromDOM;

})));
