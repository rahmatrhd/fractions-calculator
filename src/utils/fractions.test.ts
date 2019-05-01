import rupiahFractions, { Fraction } from '../constants/rupiahFractions'
import { getFractions } from './fractions'

describe('fractions function', () => {

  it('should return the right values', () => {
    rupiahFractions.forEach(fraction => {
      expect(getFractions(fraction)).toEqual(expect.objectContaining({
        fractions: expect.arrayContaining([
          expect.objectContaining({
            amount: fraction,
            count: 1,
          })
        ])
      }))
    })
  })

  it('should have no zero amount of denominator', () => {
    const result = getFractions(5000)
    expect(result).toHaveProperty('fractions')
    expect(result).toEqual(expect.objectContaining({
      fractions: expect.arrayContaining([
        expect.objectContaining({
          amount: expect.any(Number),
          count: expect.any(Number),
        })
      ]),
    }))
  })

  it('should get empty array of fraction', () => {
    const result = getFractions(0)
    expect(result).toEqual(expect.objectContaining({
      fractions: expect.any(Array)
    }))
    expect(result.fractions).toHaveLength(0)
  })

  it('should have remainder if there\'s no satisfied denominator', () => {
    const result = getFractions(12005)
    expect(result).toHaveProperty('remainder')
    expect(result.remainder).toBe(5)
  })

})