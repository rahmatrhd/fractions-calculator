import separatorValidation, {
  validateAtLeastOneDigitBehindComma,
  validateNotMoreThanTwoDigitsBehindComma,
  validateOneCommaOnly,
  validateNoSpaceSpearator,
  validateThreeDigitsBehindEveryDots,
} from './separator'

describe('Have at least one figit after comma', () => {
  it('should be fine when having digit(s) behind comma', () => {
    expect(validateAtLeastOneDigitBehindComma('1000,0')).toBeFalsy()
    expect(validateAtLeastOneDigitBehindComma('4.120,519')).toBeFalsy()
    expect(validateAtLeastOneDigitBehindComma('320,1a')).toBeFalsy()
  })

  it('should fails when no numbers given after comma', () => {
    expect(validateAtLeastOneDigitBehindComma('500,')).toBeTruthy()
  })
})

describe('Only accept not more than two digits behind comma', () => {
  it('should fine with one digit behind comma', () => {
    expect(validateNotMoreThanTwoDigitsBehindComma('123,0')).toBeFalsy()
    expect(validateNotMoreThanTwoDigitsBehindComma('1.4,9')).toBeFalsy()
  })

  it('should fine with two digits behind comma', () => {
    expect(validateNotMoreThanTwoDigitsBehindComma('51.2,30')).toBeFalsy()
    expect(validateNotMoreThanTwoDigitsBehindComma('12,99')).toBeFalsy()
  })

  it('should fails with three or more digits behind comma', () => {
    expect(validateNotMoreThanTwoDigitsBehindComma('89.888,091')).toBeTruthy()
    expect(validateNotMoreThanTwoDigitsBehindComma('423,4123')).toBeTruthy()
  })
})

describe('only have one comma within the input', () => {
  it('should works correctly', () => {
    expect(validateOneCommaOnly(',')).toBeFalsy()
    expect(validateOneCommaOnly('123.123,5')).toBeFalsy()
    expect(validateOneCommaOnly(',8123')).toBeFalsy()
  })

  it('should error with more than one comma', () => {
    expect(validateOneCommaOnly(',,,')).toBeTruthy()
    expect(validateOneCommaOnly('312,35,1,')).toBeTruthy()
    expect(validateOneCommaOnly('301,314,')).toBeTruthy()
  })
})

describe('No space placed between numbers', () => {
  it('should works when no space that separating numbers', () => {
    expect(validateNoSpaceSpearator('1234')).toBeFalsy()
    expect(validateNoSpaceSpearator('4523 ')).toBeFalsy()
  })

  it('fails when have space between numbers', () => {
    expect(validateNoSpaceSpearator('123 123')).toBeTruthy()
    expect(validateNoSpaceSpearator('5.1 8123')).toBeTruthy()
  })
})

describe('Every dots must be followed by three digits numbers', () => {
  it('should works with three digits after every dots', () => {
    expect(validateThreeDigitsBehindEveryDots('4.000')).toBeFalsy()
    expect(validateThreeDigitsBehindEveryDots('1.412.123,44')).toBeFalsy()
    expect(validateThreeDigitsBehindEveryDots('99.134')).toBeFalsy()
  })

  it('should fails when after every dots aren\'t three digits', () => {
    expect(validateThreeDigitsBehindEveryDots('12.1235.950')).toBeTruthy()
    expect(validateThreeDigitsBehindEveryDots('450.0')).toBeTruthy()
    expect(validateThreeDigitsBehindEveryDots('.12')).toBeTruthy()
  })
})

describe('separator validation next value', () => {
  it('should return the right number', () => {
    const testCases = [
      { amount: '0,50', result: '0.5' },
      { amount: '3.000.400', result: '3000400' },
      { amount: '1,2', result: '1.2' },
      { amount: '500', result: '500' },
      { amount: '4.123,45', result: '4123.45' },
    ]
    
    testCases.forEach(testCase => {
      expect(separatorValidation.nextValue(testCase.amount)).toEqual(testCase.result)
    })
  })
})