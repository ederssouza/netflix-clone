const originalOffsetHeight = Object.getOwnPropertyDescriptor(
  HTMLElement.prototype,
  'offsetHeight'
)

const originalOffsetWidth = Object.getOwnPropertyDescriptor(
  HTMLElement.prototype,
  'offsetWidth'
)

export function offsetBeforeAll () {
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
    configurable: true,
    value: 200
  })

  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
    configurable: true,
    value: 200
  })

  Object.defineProperty(HTMLElement.prototype, 'scrollWidth', {
    configurable: true,
    value: 1000
  })
}

export function offsetAfterAll () {
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', originalOffsetHeight)
  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', originalOffsetWidth)
}
