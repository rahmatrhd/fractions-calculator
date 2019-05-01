import currencyValidation, {
  validateCurrencyInTheBeginning,
  validateValueExistanceAfterCurrency,
} from './currency'

describe('Currency placed in the beginning', () => {
  const currency = 'Rp'
  const options = {
    currency,
  }

  it('should be fine if currency placed in the beginning', () => {
    expect(validateCurrencyInTheBeginning(`${currency} 4000`, options)).toBeFalsy()
    expect(validateCurrencyInTheBeginning(`${currency}55,19`, options)).toBeFalsy()
  })

  it('should error if currency placed in the middle of string', () => {
    expect(validateCurrencyInTheBeginning(`5${currency}000`, options)).toBeTruthy()
    expect(validateCurrencyInTheBeginning(`98${currency}0,30`, options)).toBeTruthy()
  })

  it('should error if currency placed in the end of string', () => {
    expect(validateCurrencyInTheBeginning(`5000 ${currency}`, options)).toBeTruthy()
    expect(validateCurrencyInTheBeginning(`980,30.${currency}`, options)).toBeTruthy()
  })

  it('should be fine if no currency given', () => {
    expect(validateCurrencyInTheBeginning('5000', options)).toBeFalsy()
    expect(validateCurrencyInTheBeginning('123', options)).toBeFalsy()
  })
})

describe('Have a value after the currency', () => {
  const currency = 'Rp'
  const options = {
    currency,
  }

  it('should works', () => {
    expect(validateValueExistanceAfterCurrency(`${currency} 50.0`, options)).toBeFalsy()
    expect(validateValueExistanceAfterCurrency(`${currency} 2.300`, options)).toBeFalsy()
  })

  it('should error if empty value after', () => {
    expect(validateValueExistanceAfterCurrency(`${currency}`, options)).toBeTruthy()
    expect(validateValueExistanceAfterCurrency(`${currency} `, options)).toBeTruthy()
  })

  it('should be fine if no currency given', () => {
    expect(validateCurrencyInTheBeginning('5000', options)).toBeFalsy()
    expect(validateCurrencyInTheBeginning('123', options)).toBeFalsy()
  })
})

describe('currency validation next value', () => {
  const currency = 'Rp'
  const options = {
    currency,
  }

  it('should removes the currency', () => {
    expect(currencyValidation.nextValue(`${currency} 5.000`, options)).toEqual('5.000')
    expect(currencyValidation.nextValue(`${currency}123`, options)).toEqual('123')
  })
})