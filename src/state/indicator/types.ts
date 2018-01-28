export interface Indicator {
    id: string
    selected?: boolean
    weight?: number
}

export interface StoreState {
    byId: {
        [key: string]: Indicator
    }
}