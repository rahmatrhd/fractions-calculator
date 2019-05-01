import React from 'react'
import './Fractions.css'
import { getFractions, FractionAmount } from '../utils/fractions'
import { validateCurrencyAmount, formatCurrency } from '../utils/currency'
import { Currency } from '../constants/currency'

const Fractions = () => {
  const currency = Currency.Rupiah
  const [amount, setAmount] = React.useState('')
  const [error, setError] = React.useState<string | undefined>()
  const [fractions, setFractions] = React.useState<Array<FractionAmount>>([])
  const [remainder, setRemainder] = React.useState<number | undefined>()

  const resetResult = () => {
    setFractions([])
    setRemainder(undefined)
    setError(undefined)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    resetResult()
    const validatedAmount = validateCurrencyAmount(amount, { currency })
    if (!validatedAmount.isValid) {
      setError(validatedAmount.message)
    } else {
      const { fractions, remainder } = getFractions(validatedAmount.nextValue)
      setFractions(fractions)
      setRemainder(remainder)
    }
  }

  return (
    <div className="fractions-container">
      <form
        onSubmit={handleSubmit}
        className="form-container"
      >
        <input
          type="text"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          className="paper amount-input"
          placeholder={`You can use "${currency}"`}
        />
        <input
          type="submit"
          className="paper submit-button"
        />
      </form>
      {error && (
        <p className="paper error-message">{error}</p>
      )}
      <ul className="fraction-list">
        {fractions.map(fraction => (
          <li
            key={fraction.amount}
            className="paper"
          >
            <span className="count">
              {fraction.count}x
            </span>
            <span className="amount">
              {formatCurrency(fraction.amount, 'Rp')}
            </span>
          </li>
        ))}
        {remainder && (
          <li
            className="paper"
          >
            <span className="count">
              Remainder
            </span>
            <span className="amount">
              {formatCurrency(remainder, 'Rp')}
            </span>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Fractions