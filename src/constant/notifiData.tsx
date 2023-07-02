import { NotificationType } from '@/util/NotificationDataType'

const translNotifiObj = {
  // 回傳通知所需的 JSX陣列
  translTextAry: function (arg: NotificationType[]) {
    const textAry = arg.map((item: NotificationType) => {
      return translText(item)
    })
    return textAry
  },
}

// 根據type,回傳轉換 JSX
function translText(arg: NotificationType) {
  const item = {
    isNew: arg.IsNew,
    isRead: arg.IsRead,
    initDate: arg.InitDate,
    profilePicture: arg.ProfilePicture,
    RoomName: arg.RoomName,
    notificationId: arg.NotificationId,
  }
  const userName = <span className="font-bold">{arg.UserName}</span>
  const roomName = (
    <>
      <span className="font-bold">{arg.RoomName}</span>
      <span>-共同編輯行程</span>
    </>
  )

  switch (arg.Type) {
    case '房間編輯': //少
      return {
        text: (
          <p>
            {userName}
            編輯了{roomName}
          </p>
        ),
        link: 'http',
        ...item,
      }
    case '房間邀請': //少
      return {
        text: (
          <p>
            你已經被{userName}
            邀請至{roomName}中
          </p>
        ),
        link: 'http',
        ...item,
      }
    case '房間退出': //少
      return {
        text: (
          <p>
            {userName}
            將你從
            {roomName}
            的名單中刪除
          </p>
        ),
        link: 'http',
        ...item,
      }
    default:
      return {
        text: <p>預設</p>,
        link: 'http',
        ...item,
      }
  }
}

export default translNotifiObj.translTextAry
// ) ['苗栗小五郎編輯了共同編輯行程-釜山行的行程', '你已被湯姆嗑吐司邀請至嗨起來房間中']

// JSX部分
// const JSXAry = textAry.map((text)=>{
//   return <p>{text}<p>
// })
// 暫留
