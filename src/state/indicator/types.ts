export enum NegativePositive {
  Negative = -1,
  Positive = 1,
}

export enum WeightNumber {
    ONE = 0.25,
    TWO = 0.5,
    THREE = 0.75,
    FOUR = 1
}

export interface Indicator {
    readonly id: string
    readonly name: string
    readonly subject: string
    readonly publication: string
    readonly year: string
    readonly selected?: boolean
    readonly valuation: NegativePositive,
    readonly weight: WeightNumber
}

export interface IndicatorState {
    readonly byId: {
        readonly [key: string]: Indicator
    }
}