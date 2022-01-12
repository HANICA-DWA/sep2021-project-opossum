import { stripHtml } from '../../src/utils'

describe('unit stripHtml', () => {
  it('should strip html', () => {
    expect(stripHtml('<p>Hello</p>')).toBe('Hello')
  })
  it('should strip html with multiple tags', () => {
    expect(stripHtml('<p>Hello</p><p>World</p>')).toBe('HelloWorld')
  })
  it('should strip html with multiple tags and attributes', () => {
    expect(stripHtml('<p class="test">Hello</p><p>World</p>')).toBe('HelloWorld')
  })
  it('should strip html with multiple tags and attributes and spaces', () => {
    expect(stripHtml('<p class="test">Hello</p> <p>World</p>')).toBe('Hello World')
  })
})
