export interface ValidateOptions {
  currency: string
}

export interface Valid<TNextValue = any> {
  isValid: true,
  nextValue: TNextValue
}
export interface Invalid {
  isValid: false,
  message: string,
}

export type Validate = (amount: string, options?: ValidateOptions) => boolean
export type Validation<TNextValue = any> = Valid<TNextValue> | Invalid

export interface Rule {
  description?: string,
  invalidCondition: Validate,
  invalidMessage: string,
}
export interface ValidationConfig<TNextValue = any> {
  name?: string,
  rules: Array<Rule>,
  nextValue: (amount: string, options?: ValidateOptions) => TNextValue
}

export type MakeValidation = (configurations: Array<ValidationConfig>) =>
  (amount: string, options?: ValidateOptions) => Validation
// TODO: asserts validations NextValue type

const makeValidation: MakeValidation = configurations => (amount, options) => {
  let nextAmount: string = amount.trim()
  
  for (let i = 0; i < configurations.length; i++) {
    const config = configurations[i]

    for (let j = 0; j < config.rules.length; j++) {
      const rule = config.rules[j]
      if (rule.invalidCondition(nextAmount, options)) {
        return {
          isValid: false,
          message: rule.invalidMessage
        }
      }
    }

    nextAmount = config.nextValue(nextAmount, options).trim()
  }

  return {
    isValid: true,
    nextValue: nextAmount,
  }
}

export default makeValidation