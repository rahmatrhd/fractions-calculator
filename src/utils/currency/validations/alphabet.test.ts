import alphabetValidation, { validateNoUnexpectedCharacter } from './alphabet'

describe('No unexpected character', () => {
  it('should not contain any alphabet', () => {
    expect(validateNoUnexpectedCharacter('1.100QWE')).toBeTruthy()
    expect(validateNoUnexpectedCharacter('2a0.0')).toBeTruthy()
  })

  it('should be fine if no alphabet given', () => {
    expect(validateNoUnexpectedCharacter('400,')).toBeFalsy()
    expect(validateNoUnexpectedCharacter('12,3')).toBeFalsy()
  })
})

describe('alphabet validation next value', () => {
  it('should return the exact same amount', () => {
    const amount = '4000'
    expect(alphabetValidation.nextValue(amount)).toEqual(amount)
  })
})