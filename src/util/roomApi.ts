import { RoomAttractionsProp } from "./types";

export function postRoomTours(
  token: string | boolean | null,
  RoomGuid: string,
  AttrationsData: RoomAttractionsProp[]
) {
  return fetch('https://travelmaker.rocket-coding.com/api/rooms/modify', {
    method: 'POST',
    headers: {
      Authorization: String(token),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      RoomGuid,
      AttrationsData,
    }),
  })
}