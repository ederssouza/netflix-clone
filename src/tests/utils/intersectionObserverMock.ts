export function intersectionObserverMock (entries = []) {
  class IntersectionObserverMock {
    constructor (fn: Function) {
      fn(entries, this)
    }

    observe () { jest.fn() }
    unobserve () { jest.fn() }
    disconnect () { jest.fn() }
  }

  Object.defineProperty(
    window,
    'IntersectionObserver',
    { writable: true, configurable: true, value: IntersectionObserverMock }
  )
}
