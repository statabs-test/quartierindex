export interface District {
  readonly id: string
  readonly name: string
  readonly viewOptions: ViewOptions
}

export interface DistrictState {
  readonly byId: {
    readonly [key: string]: District
  }
}

export interface ViewOptions {
  readonly highlight: boolean
  readonly hover: boolean
}