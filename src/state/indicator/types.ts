export enum NegativePositive {
  Negative = -1,
  Positive = 1,
}

export enum WeightNumber {
    ONE = 1,
    TWO = 2,
    THREE = 3,
    FOUR = 4
}

export interface Indicator {
    readonly id: string
    readonly name: string
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