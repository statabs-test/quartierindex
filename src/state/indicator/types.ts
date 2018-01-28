export enum NegativePositive {
  Negative = -1,
  Positive = 1,
}

export interface Indicator {
    id: string
    name: string
    publication: string
    year: string
    selected?: boolean
    valuation: NegativePositive,
    weight?: number
}

export interface IndicatorState {
    byId: {
        [key: string]: Indicator
    }
}