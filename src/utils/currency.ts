interface ValidValue<TNextValue = any> {
  isValid: true,
  nextValue: TNextValue
}

interface InvalidValue {
  isValid: false,
  message: string,
}

export type Validated<TNextValue = any> = ValidValue<TNextValue> | InvalidValue

export interface ValidateOptions {
  currency: string
}

export const validateCurrency = (amount: string, currency: string): Validated<string> => {
  const trimmedAmount = amount.trim()

  if (currency !== '') {
    // currency must be placed in the beginning
    if (amount.includes(currency) && amount.indexOf(currency) !== 0) {
      return {
        isValid: false,
        message: 'valid character in wrong position'
      }
    }

    // check value existance after currency
    if (amount.replace(currency, '').trim() === '') {
      return {
        isValid: false,
        message: 'missing value'
      }
    }
  }

  return {
    isValid: true,
    nextValue: trimmedAmount.replace(currency, '').trim()
  }
}

export const validateSeparator = (amount: string): Validated<string> => {
  const trimmedAmount = amount.trim()

  // comma
  if (trimmedAmount.includes(',')) {
    // should be exists not more than one comma
    if (trimmedAmount.split('').filter(char => char === ',').length > 1) {
      return {
        isValid: false,
        message: 'invalid separator, can\'t have more than one comma separator'
      }
    }

    // must be at least one digit behind comma
    if (isNaN(parseInt(trimmedAmount[trimmedAmount.indexOf(',') + 1]))) {
      return {
        isValid: false,
        message: 'invalid separator, couldn\'t find a number behind comma'
      }
    }

    // numbers behind comma must be not more than 2 digits
    if (trimmedAmount[trimmedAmount.indexOf(',') + 3] !== undefined) {
      return {
        isValid: false,
        message: 'invalid separator, only accept two digits behind comma'
      }
    }
  }

  // dot
  if (trimmedAmount.includes('.')) {
    // behind every dots must be three digits number
    for (let i = 0; i < trimmedAmount.length; i++) {
      if (trimmedAmount[i] === '.') {
        const nextThreeDigitsAreNumbers = 
          !isNaN(parseInt(trimmedAmount[i + 1])) &&
          !isNaN(parseInt(trimmedAmount[i + 2])) &&
          !isNaN(parseInt(trimmedAmount[i + 3]))
        if (!nextThreeDigitsAreNumbers) {
          return {
            isValid: false,
            message: 'invalid separator, next three digits after dot (.) aren\'t a number'
          }
        }
      }
    }
  }

  // space
  if (trimmedAmount.includes(' ')) {
    // no space between numbers
    if (trimmedAmount.replace(',', '').replace('.', '').trim().split(' ').length > 1) {
      return {
        isValid: false,
        message: 'invalid separator, space is an invalid separator'
      }
    }
  }

  return {
    isValid: true,
    nextValue: parseFloat(amount.replace('.', '').replace(',', '.')).toString()
  }
}

export const validateAlphabet = (amount: string): Validated<string> => {
  const trimmedAmount = amount.trim()
  const matchedRegex = trimmedAmount.match(/[a-zA-Z]/g)
  if (matchedRegex && matchedRegex.length > 0) {
    return {
      isValid: false,
      message: 'wild character(s) appeared'
    }
  }

  return {
    isValid: true,
    nextValue: amount,
  }
}

export const validateAmount = (amount: string, options?: ValidateOptions): Validated<number> => {
  let nextAmount = amount.trim()

  if (options && options.currency) {
    const validatedCurrency = validateCurrency(nextAmount, options.currency)
    if (!validatedCurrency.isValid) {
      return validatedCurrency
    } else {
      nextAmount = validatedCurrency.nextValue
    }
  }

  const validatedAlphabet = validateAlphabet(nextAmount)
  if (!validatedAlphabet.isValid) {
    return validatedAlphabet
  } else {
    nextAmount = validatedAlphabet.nextValue
  }

  const validatedSeparator = validateSeparator(nextAmount)
  if (!validatedSeparator.isValid) {
    return validatedSeparator
  } else {
    nextAmount = validatedSeparator.nextValue
  }

  return {
    isValid: true,
    nextValue: parseFloat(nextAmount)
  }
}

export const formatCurrency = (amount: number, currency: string): string => {
  return `${currency} ${amount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`
}