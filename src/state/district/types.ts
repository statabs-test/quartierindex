export interface District {
    id: string
    name: string
}

export interface DistrictState {
    byId: {
        [key: string]: District
    }
}