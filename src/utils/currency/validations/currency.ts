import { ValidationConfig, Validate } from './validations'

export const validateCurrencyInTheBeginning: Validate = (amount, options): boolean => !!options && !!options.currency && 
  amount.includes(options.currency) && amount.indexOf(options.currency) !== 0

export const validateValueExistanceAfterCurrency: Validate = (amount, options): boolean => !!options && !!options.currency && 
  amount.replace(options.currency, '').trim() === ''

const currencyValidation: ValidationConfig<string> = {
  name: 'currency',
  rules: [{
    description: 'currency must be placed in the beginning',
    invalidMessage: 'valid character in wrong position',
    invalidCondition: validateCurrencyInTheBeginning,
  }, {
    description: 'check value existance after currency',
    invalidMessage: 'missing value',
    invalidCondition: validateValueExistanceAfterCurrency,
  }],
  nextValue: (amount, options) => (!!options && !!options.currency) ? amount.replace(options.currency, '').trim() : ''
}

export default currencyValidation