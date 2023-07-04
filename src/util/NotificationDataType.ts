export interface NotificationType {
  IsNew: boolean;
  IsRead: boolean;
  Type: string;
  NotificationId: number;
  UserGuid: string;
  UserName: string;
  ProfilePicture: string;
  InitDate: string;
  RoomGuid: string;
  RoomName: string;
  OldRoomName: string;
  NewRoomName: string;
  AddVoteDate: string;
  BlogGuid: string;
  Title: string;
  TourId: number;
  TourName: string;
}

export interface NotificationResponseType {
  Counts: number;
  Status: boolean;
  NotificationData: NotificationType[] | []
}

export interface NotificationRenderType {
  link: string;
  isNew: boolean;
  isRead: boolean;
  initDate: string;
  profilePicture: string;
  RoomName: string;
  notificationId: number;
  text: JSX.Element; // Assuming JSX element is of type `Element` or `ReactElement`
}
