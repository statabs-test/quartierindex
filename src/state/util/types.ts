export interface RootConfig {
  readonly width: string
  readonly height: string
  readonly fullscreen: boolean
}

export interface SelectIndicatorConfig {
  visible: boolean
}

export interface Util {
  readonly rootConf: RootConfig
  readonly selectIndicatorConf: SelectIndicatorConfig
}