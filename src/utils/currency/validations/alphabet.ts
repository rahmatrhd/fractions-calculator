import { Validate, ValidationConfig } from './validations'

export const validateNoUnexpectedCharacter: Validate = amount => {
  const matchedRegex = amount.match(/[a-zA-Z]/g)
  return !!matchedRegex && matchedRegex.length > 0
}

const alphabetValidation: ValidationConfig<string> = {
  name: 'alphabet',
  rules: [{
    description: 'make sure there\'s no unexpected characters',
    invalidMessage: 'wild character(s) appeared',
    invalidCondition: validateNoUnexpectedCharacter,
  }],
  nextValue: amount => amount
}

export default alphabetValidation