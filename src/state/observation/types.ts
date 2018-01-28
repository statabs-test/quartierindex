export interface Observation {
  id: string
  districtId: string
  indicatorId: string
  value: number
  // should not be used, until we know for what this value is, confusing with our calculated ranking
  // ranking: string
}

export interface ObservationState {
    byId: {
        [key: string]: Observation
    }
}