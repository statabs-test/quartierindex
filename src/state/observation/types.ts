export interface Observation {
  readonly id: string
  readonly districtId: string
  readonly indicatorId: string
  readonly value: number
  readonly normValue: number
  readonly value_unit: string
  readonly value_txt: string
  readonly ranking: string
  // should not be used, until we know for what this value is, confusing with our calculated ranking
  // readonly ranking: string
}

export interface ObservationState {
  readonly byId: {
    readonly [key: string]: Observation
  }
}

export interface Rank {
  districtId: string
  value: number
}

export interface Color {
  h: number;
  s: number;
  v: number;
}

export interface LineRank {
  objectId: string;
  rankValue: number;
  labelText: string;
  color: Color;
  highlighted: boolean;
  hover: boolean;

}