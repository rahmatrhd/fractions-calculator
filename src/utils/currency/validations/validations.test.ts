import makeValidation, { ValidationConfig } from './validations'

describe('validation function', () => {
  it('should return a function', () => {
    expect(makeValidation([])).toBeInstanceOf(Function)
  })

  it('invalid test', () => {
    const invalidMessage = 'invalid message example'
    const configs: Array<ValidationConfig> = [{
      name: 'test',
      rules: [{
        description: 'test',
        invalidMessage,
        invalidCondition: () => true
      }],
      nextValue: amount => amount + amount
    }]

    const validate = makeValidation(configs)

    expect(validate('')).toEqual(expect.objectContaining({
      isValid: false,
      message: invalidMessage,
    }))
  })

  it('returned nextValue should match the last config nextValue', () => {
    const configs: Array<ValidationConfig> = [{
      name: 'test',
      rules: [],
      nextValue: amount => amount + amount
    }]

    const validate = makeValidation(configs)

    expect(validate('a')).toEqual(expect.objectContaining({
      isValid: true,
      nextValue: 'aa',
    }))
  })
})