export const changeMoneyFormat = (num: number) => num.toLocaleString('ru-RU')


export const findInitialPayment = (percent: number, price: number) => percent * price / 100
export const findPercentPayment = (initailPayment: number, price: number) => initailPayment * 100 / price

export const findLeasingSum = (InitialPayment: number, months: number, monthPay: number) => {
    return InitialPayment + (months * monthPay)
}

export const findMonthPay = (price: number, initial: number, months: number) => (price - initial) * ((0.035 * Math.pow((1 + 0.035), months)) / (Math.pow((1 + 0.035), months) - 1));

export const findRoundingNumber = (curr: number, min: number, max: number) => {
    if (curr <= max && curr >= min) {
        return curr
    } else if (curr < min) {
        return min
    } else {
        return max
    }
}
