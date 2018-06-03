import { add, remove } from 'bianco.events'
import erre from 'erre'

/**
 * Create an erre stream from DOM events
 * @param   {HTMLElement|NodeList|Array} els - DOM node/s where the listeners will be bound
 * @param   {string} eventsList  - list of events we want to stream space separated
 * @param   {Object} options - event options (capture, once and passive)
 * @returns {Generator} - [erre stream generator](https://github.com/GianlucaGuarini/erre#stream)
 */
export default function fromDOM(els, eventsList, options) {
  const stream = erre()
  const onValue = e => stream.push(e)

  add(els, eventsList, onValue, options)
  stream.on.end(() => remove(els, eventsList, onValue, options))

  return stream
}