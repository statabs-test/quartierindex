export enum NegativePositive {
  Negative = -1,
  Positive = 1,
}

export interface Indicator {
    readonly id: string
    readonly name: string
    readonly publication: string
    readonly year: string
    readonly selected?: boolean
    readonly valuation: NegativePositive,
    readonly weight?: number
}

export interface IndicatorState {
    readonly byId: {
        readonly [key: string]: Indicator
    }
}