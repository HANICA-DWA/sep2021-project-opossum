import { stripHtml, truncateStringAndCapitalize } from '../../src/utils'

describe('unit truncateStringAndCapitalize', () => {
  it('should truncate and capitalize this string', () => {
    expect(truncateStringAndCapitalize(5, 'Hello world')).toBe('Hello...')
  })
  it('should not truncate a short string under truncate treshold', () => {
    expect(truncateStringAndCapitalize(5, 'Hello')).toBe('Hello')
  })
  it('should work with empty string', () => {
    expect(truncateStringAndCapitalize(0, '')).toBe('')
  })
  it('should work without string', () => {
    expect(truncateStringAndCapitalize(0)).toBe('')
  })
  it('should work with undefined string', () => {
    expect(truncateStringAndCapitalize(0, undefined)).toBe('')
  })
  it('should not work with null', () => {
    expect(() => truncateStringAndCapitalize(0, null)).toThrow(
      "Cannot read properties of null (reading 'charAt')"
    )
  })
})

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
