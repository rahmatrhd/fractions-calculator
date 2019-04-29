import rupiahFractions, { Fraction } from '../constants/rupiahFractions'

export interface FractionAmount {
  amount: Fraction
  count: number
}

export interface Fractions {
  fractions: Array<FractionAmount>
  remainder?: number
}

export const getFractions = (amount: number): Fractions => {
  let fractions: Array<FractionAmount> = []
  let restAmount = amount

  rupiahFractions.forEach(fraction => {
    if (restAmount >= fraction) {
      const nextAmount = restAmount % fraction
      const count = (restAmount - nextAmount) / fraction
      restAmount = nextAmount

      fractions.push({
        amount: fraction,
        count,
      })
    }
  })

  return {
    fractions,
    ...(restAmount > 0 ? { remainder: restAmount } : {})
  }
}
