export interface Observation {
  readonly id: string
  readonly districtId: string
  readonly indicatorId: string
  readonly value: number
  readonly normValue: number
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

export interface ColorI {
  h: number;
  s: number;
  v: number;
}

export interface LineRankI {
  objectId: string;
  rankValue: number;
  labelText: string;
  color: ColorI;
}

export class Color implements ColorI {
  constructor(public h: number,
              public s: number,
              public v: number) {
  }
}

export class LineRank implements LineRankI {
  constructor(public objectId: string,
              public rankValue: number,
              public labelText: string,
              public color: ColorI) {
  }
}
