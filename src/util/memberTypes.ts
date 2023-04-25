import { ReactNode } from 'react'

export interface MemberLayoutProps {
  children: ReactNode
  path?: string
  countData: MemberCountProps
  setCountData: React.Dispatch<React.SetStateAction<MemberCountProps>>
}

export interface MemberCountProps {
  TourCounts: number
  AttCounts: number
  BlogCounts: number
  FollowCounts: number
  AttCommentCounts: number
}

export interface TourData {
  TourId: number
  TourName: string
  AttrCounts: number
  Likes: number
  ImageUrl: string[]
}

export interface TourDataProps {
  TourCounts: number
  RoomCounts: number
  TourData: TourData[]
}

export interface RoomData {
  RoomGuid: string
  RoomName: string
  AttrCounts: number
  CreaterName: string
  ImageUrl: string[]
}

export interface RoomDataProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  map(arg0: (item: any) => JSX.Element): ReactNode
  IsExisted: boolean
  TourCounts: number
  RoomCounts: number
  RoomData: RoomData[]
}

export interface AttractionData {
  AttractionId: number
  AttractionName: string
  CityDistrict: string
  AverageScore: number
  Category: string[]
  ImageUrl: string
}

export interface AttrDataProps {
  AttCounts: number
  AttractionData: AttractionData[]
}

export interface BlogData {
  BlogGuid: string
  Title: string
  Cover: string
  UserGuid: string
  UserName: string
  ProfilePicture: string
  InitDate: string
  Sees: number
  Likes: number
  Comments: number
  Category: string[]
}

export interface BlogDataProps {
  DraftCounts: number
  CollectCounts: number
  BlogData: BlogData[]
}

export interface CommentData {
  AttractionCommentId: number
  AttractionName: string
  Score: number
  InitDate: string
  Comment: string
}

export interface CommentDataProps {
  AttCommentCounts: number
  CommentData: CommentData[]
  editCommentData?: CommentData
  setEditCommentData?: React.Dispatch<React.SetStateAction<CommentData>>
}
