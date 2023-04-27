export interface paramsProp {
  id: number
}
export interface AttrAroundsProp {
  AttractionId: string
  ImageUrl: string
  AttractionName: string
  City: string
}
export interface Attraction {
  AttractionData: {
    IsCollect: boolean
    AttractionId: number
    AttractionName: string
    Introduction: string
    Address: string
    Tel: string
    Email: string
    OfficialSite: string
    Facebook: string
    OpenTime: string
    ImageUrl: string[]
  }
  CommentData: {
    AverageScore: number
    Comments: CommentsProp[]
  }
  MoreAttractions: AttrAroundsProp[]
}

export interface CommentsProp {
  AttractionCommentId: number
  ProfilePicture: string
  UserName: string
  Score: number
  InitDate: string
  Comment: string
}