export interface defaultValueProp {
  CategoryId: string[]
  AttrCounts: string
  Transports: string
  nearBy?: boolean
  DistrictName: string[]
  AttractionId?: number[]
}
export interface randomTourProp {
  AttractionId: number
  AttractionName: string
  Elong: number
  Nlat: number
  Lock?: boolean
  ImageUrl: string
}

export interface geoDefaultValueProp {
  CategoryId: string[];
  AttrCounts: string;
  Transports: string;
  nearBy?: boolean | undefined;
  DistrictName: string[];
  AttractionId?: number[] | undefined;
  Nlat: number;
  Elong: number;
}


export interface RoomAttractionsProp {
  AttractionId: number
  AttractionName: string
  Elong: number
  ImageUrl: string
  Nlat: number
  Order: number
}

