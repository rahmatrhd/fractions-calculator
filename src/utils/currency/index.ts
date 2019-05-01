import makeValidation from './validations/validations'
import currencyValidation from './validations/currency'
import alphabetValidation from './validations/alphabet'
import separatorValidation from './validations/separator'

export const formatCurrency = (amount: number, currency: string): string => {
  return `${currency} ${amount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`
}

export const validateCurrencyAmount = makeValidation([
  currencyValidation,
  alphabetValidation,
  separatorValidation,
])