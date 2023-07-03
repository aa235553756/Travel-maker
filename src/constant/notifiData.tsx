import { NotificationType } from '@/util/NotificationDataType'
import { getCookie } from 'cookies-next'

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
  const user = getCookie('user')
    ? JSON.parse(String(getCookie('user')))
    : undefined

  const item = {
    isNew: arg.IsNew,
    isRead: arg.IsRead,
    initDate: arg.InitDate,
    profilePicture: arg.ProfilePicture,
    RoomName: arg.RoomName,
    notificationId: arg.NotificationId,
  }
  const userName = (
    <span className="font-bold">
      {arg.UserName === user.UserName ? '你' : arg.UserName}
    </span>
  )
  const roomName = (
    <>
      <span className="font-bold">{arg.RoomName}</span>
      <span>-共同編輯行程</span>
    </>
  )

  switch (arg.Type) {
    case '房間編輯':
      return {
        text: (
          <p>
            {userName}
            編輯了{roomName}。
          </p>
        ),
        link: `/planning-tour/${arg.RoomGuid}`,
        ...item,
      }
    case '房間邀請':
      return {
        text: (
          <p>
            你已經被{userName}
            邀請至{roomName}中。
          </p>
        ),
        link: `/planning-tour/${arg.RoomGuid}`,
        ...item,
      }
    case '房間退出':
      return {
        text: (
          <p>
            {userName}
            將你從
            {roomName}
            的名單中刪除。
          </p>
        ),
        link: '',
        ...item,
      }
    case '房間名稱':
      return {
        text: (
          <p>
            {userName}將<span className="font-bold">{arg.OldRoomName}</span>
            -共同編輯行程的名稱修改為
            <span className="font-bold">{arg.NewRoomName}</span>。
          </p>
        ),
        link: `/planning-tour/${arg.RoomGuid}`,
        ...item,
      }
    case '日期新增':
      return {
        text: (
          <p>
            {userName}對{roomName}新增了
            <span className="font-bold">{arg.AddVoteDate}</span>
            的日期選項。
          </p>
        ),
        link: `/planning-tour/${arg.RoomGuid}`,
        ...item,
      }
    case '遊記新增':
      return {
        text: (
          <p>
            你追蹤的{userName}新增了一篇遊記-
            <span className="font-bold">{arg.Title}</span>。
          </p>
        ),
        link: `/blog/view-blog/${arg.BlogGuid}`,
        ...item,
      }
    case '遊記喜歡':
      return {
        text: (
          <p>
            {userName}
            喜歡你的遊記-
            <span className="font-bold">{arg.Title}</span>。
          </p>
        ),
        link: `/blog/view-blog/${arg.BlogGuid}`,
        ...item,
      }
    case '遊記留言':
      return {
        text: (
          <p>
            {userName}
            對你的遊記-
            <span className="font-bold">{arg.Title}</span>
            做了回覆。
          </p>
        ),
        link: `/blog/view-blog/${arg.BlogGuid}`,
        ...item,
      }
    case '留言回覆':
      return {
        text: (
          <p>
            {userName}
            對你在遊記-
            <span className="font-bold">{arg.Title}</span>
            的留言做了回覆。
          </p>
        ),
        link: `/blog/view-blog/${arg.BlogGuid}`,
        ...item,
      }
    case '社群追蹤':
      return {
        text: <p>{userName}追蹤了你。</p>,
        link: `/social-media`,
        ...item,
      }
    case '行程喜歡':
      return {
        text: (
          <p>
            {userName}喜歡你的行程-
            <span className="font-bold">{arg.TourName}</span>
          </p>
        ),
        link: `/random-tour/${arg.TourId}`,
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
