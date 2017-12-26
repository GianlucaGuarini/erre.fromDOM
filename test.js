require('jsdom-global')()
const assert = require('assert')
const fromDOM = require('./')
const erre = require('erre')

erre.install('fromDOM', fromDOM)

function fireEvent(target, name) {
  var event = new Event(name)
  target.dispatchEvent(event)
}

describe('erre.fromDOM', () => {
  it('it can stream simple dom events', (done) => {
    const div = document.createElement('div')
    const stream = erre.fromDOM(div, 'click')

    stream.on.value(() => done())

    fireEvent(div, 'click')
  })

  it('it can stream multiple dom events', (done) => {
    const div1 = document.createElement('div')
    const div2 = document.createElement('div')
    const stream = erre.fromDOM([div1, div2], 'click')

    stream.on.value(() => done())

    fireEvent(div1, 'click')
  })

  it('it can end properly the stream', (done) => {
    const div1 = document.createElement('div')
    const div2 = document.createElement('div')
    const stream = erre.fromDOM([div1, div2], 'click')

    stream.on.end(() => done())

    stream.on.value(() => {
      throw 'you should never get here'
    })

    stream.end()

    fireEvent(div1, 'click')
  })
})