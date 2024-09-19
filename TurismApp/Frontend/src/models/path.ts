export interface Path {
  waypoints: Waypoint[]
  maneuvers: Maneuver[]
}

export interface Waypoint {
  original_point: Point
  projected_point: Point
  transit: boolean
}

export interface Point {
  lat: number
  lon: number
}

export interface Maneuver {
  outcoming_path: RawPath
}

export interface RawPath {
  geometry: Geometry[]
}

export interface Geometry {
  color: string
  selection: string
  style: string
}