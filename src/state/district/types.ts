export interface District {
    readonly id: string
    readonly name: string
}

export interface DistrictState {
    readonly byId: {
        readonly [key: string]: District
    }
}