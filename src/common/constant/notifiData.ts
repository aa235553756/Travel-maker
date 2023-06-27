// ! 目的印出 根據type的不同文字 , JSX請至相關區域處理,這裏僅處理字串
// ! 目的2 連結至相關區域
// ! 目的3 component只要拿textAry就好 => 這邊會是pure function

const data = {
  "Status": true,
  "Counts": 1,
  "NotificationData": [
    {
      "IsNew": true,
      "IsRead": false,
      "Type": "房間編輯",
      "NotificationId": 116,
      "UserGuid": "041ca912-ba27-4334-bfce-07c32660e3a775",
      "UserName": "苗栗小五郎",
      "ProfilePicture": "https://travelmaker.rocket-coding.com/upload/profile/苗栗小五郎Profile20230422123145.jpg",
      "InitDate": "1小時前",
      "RoomGuid": "8b5bd6d4-03ed-42c5-a42d-dae882db162b74",
      "RoomName": "123",
      "OldRoomName": null,
      "NewRoomName": null,
      "AddVoteDate": null,
      "BlogGuid": null,
      "Title": null,
      "TourId": 0,
      "TourName": null
    },
    {
      Type: '笑死'
    }
  ]
}

const translNotifiObj = {
  // 回傳通知所需的字串陣列
  translTextAry: function (arg) {
    const textAry = arg.NotificationData.map((item) => {
      return translText(item)
    })
    return textAry
  },
}

// 根據type,回傳轉換字串
function translText(arg) {
  switch (arg.Type) {
    case "房間編輯":
      return `${arg.UserName}編輯了共同編輯行程-釜山行的行程`
      break;
    default:
      return "你已被湯姆嗑吐司邀請至嗨起來房間中"
  }
}

const { translTextAry } = translNotifiObj
console.log(translTextAry(data));
// ) ['苗栗小五郎編輯了共同編輯行程-釜山行的行程', '你已被湯姆嗑吐司邀請至嗨起來房間中']

// JSX部分
// const JSXAry = textAry.map((text)=>{
//   return <p>{text}<p>
// })