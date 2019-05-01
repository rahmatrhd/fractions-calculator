import { ValidationConfig, Validate } from './validations'

// comma separator
export const validateOneCommaOnly: Validate = amount => amount.includes(',') && amount.split('').filter(c => c === ',').length > 1
export const validateAtLeastOneDigitBehindComma: Validate = amount => amount.includes(',') && isNaN(parseInt(amount[amount.indexOf(',') + 1]))
export const validateNotMoreThanTwoDigitsBehindComma: Validate = amount => amount.includes(',') && amount[amount.indexOf(',') + 3] !== undefined

// dot separator
export const validateThreeDigitsBehindEveryDots: Validate = amount => {
  if (amount.includes('.')) {
    for (let i = 0; i < amount.length; i++) {
      if (amount[i] === '.') {
        const nextThreeDigitsAreNumbers = 
        !isNaN(parseInt(amount[i + 1])) &&
        !isNaN(parseInt(amount[i + 2])) &&
        !isNaN(parseInt(amount[i + 3]))
        if (!nextThreeDigitsAreNumbers) return true
      }
    }
  }

  return false
}

// space separator
export const validateNoSpaceSpearator: Validate = amount => amount.includes(' ') && amount.replace(',', '').replace('.', '').trim().split(' ').length > 1

const separatorValidation: ValidationConfig<string> = {
  name: 'separator',
  rules: [{
    description: 'should be exists not more than one comma',
    invalidMessage: 'invalid separator, can\'t have more than one comma separator',
    invalidCondition: validateOneCommaOnly,
  }, {
    description: 'must be at least one digit behind comma',
    invalidMessage: 'invalid separator, couldn\'t find a number behind comma',
    invalidCondition: validateAtLeastOneDigitBehindComma,
  }, {
    description: 'numbers behind comma must be not more than 2 digits',
    invalidMessage: 'invalid separator, only accept two digits behind comma',
    invalidCondition: validateNotMoreThanTwoDigitsBehindComma,
  }, {
    description: 'behind every dots must be three digits number',
    invalidMessage: 'invalid separator, next three digits after dot (.) arent\'t numbers',
    invalidCondition: validateThreeDigitsBehindEveryDots,
  }, {
    description: 'no space between numbers',
    invalidMessage: 'invalid separator, space in an invalid separator',
    invalidCondition: validateNoSpaceSpearator,
  }],
  nextValue: amount => parseFloat(amount.replace('.', '').replace(',', '.')).toString()
}

export default separatorValidation