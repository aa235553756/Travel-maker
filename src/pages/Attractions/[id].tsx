import Link from 'next/link'
// import { useRouter } from 'next/router'
import { IoIosArrowBack } from 'react-icons/io'
import React from 'react'

// export async function getServerSideProps(context) {
//   const { slug } = context.query
//   const res = await fetch(`https://dummyjson.com/products/${slug}`)
//   const data = await res.json()
//   return {
//     props: { data }, // will be passed to the page component as props
//   }
// }

export default function AttractionsId() {
  // console.log(data)

  const attractionData = {
    attractionName: '大安森林公園',
    attractionInfo:
      '大安森林公園，位於臺灣臺北市大安區，佔地25.9354公頃，由臺北市政府工務局公園路燈工程管理處負責管理與維護。公園位於台北市區中心，是一座草木濃密的生態公園，都會森林的型態被譽為台北市的「都市之肺」；其在興建之前被稱為「七號公園」，1994年3月29日正式對外開放，當時曾是台北市區最大的公園。 園內除大量樹林，亦有規劃花壇。園外靠道路之人行道則以多層式綠籬景觀與各道路區隔，臨建國南路為盾柱木和大安森林公園之友基金會捐贈的櫸木，臨和平東路為樟樹、臨新生南路為白千層、臨信義路則為榕樹，人行道中央還植有楓香樹。此外，園內亦設有行人座椅、涼亭、音樂舞台、慢跑道等多種休憩設施，公園下方靠信義路、建國南路口側則設置有地下停車場。',
    attractionInfoScore: 4.5,
  }
  const attractionComment = {
    userName: '小熊軟糖',
    userScore: 4.5,
    userComment:
      '假日很多人來野餐，鋪地墊曬日光浴，享受悠閒放假時光，不需要開車去很遠的地方，搭捷運就可以到，開車來也有地下停車場可以停，很方便。',
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { userName, userScore, userComment } = attractionComment
  const { attractionName, attractionInfoScore, attractionInfo } = attractionData
  const infoAry = [
    '台北市大安區00路00號',
    '星期一休，每日9:00–17:00',
    '02-123-5678',
    '官方粉絲團、官方網站',
    'service@ccklibrary.org.tw',
  ]

  return (
    <div className="container pt-9 h-[3000px]">
      <Link href="/Attrations" className="inline-flex items-center mb-5">
        <IoIosArrowBack className="text-4xl mr-2" />
        {attractionName}
      </Link>
      {/* 這是圖片 */}
      <div className="min-w-[396px] min-h-[208px] bg-[#D7D7D7] mb-10">
        我是Swipe圖片
      </div>
      {/* 這是小資訊 */}
      <ul className="p-4 bg-[#D7D7D7] mb-10">
        {infoAry.map((item, index) => {
          return (
            <li key={index} className="flex items-center">
              <IoIosArrowBack className="mr-1" />
              {item}
            </li>
          )
        })}
      </ul>
      <div className="mb-5">
        <h3 className="text-lg font-bold mb-4">景點介紹</h3>
        {/* 景點介紹如何處理 */}
        <p>{attractionInfo}</p>
      </div>
      {/* 這是圖片 */}
      <div className="bg-[#D7D7D7] min-w-[396px] min-h-[200px] mb-16">
        這是另一張圖片嗎
      </div>
      {/* 這是其他評論區 */}
      <div className="pb-[60px] border-b mb-10">
        {/* 這是評論標題 */}
        <div className="text-lg font-bold mb-5">
          <h3 className="inline mr-3">旅客評論</h3>
          <span className="mr-3">{attractionInfoScore}</span>
          <div className="inline">星星數量</div>
        </div>
        {/* 這是評論小卡區 */}
        <div className="mb-6">
          <div className="flex pt-5 pb-9 border-b">
            <div className="bg-[#D7D7D7] w-[60px] h-[60px] rounded-full flex-shrink-0 mr-3"></div>
            <div className="w-full">
              {/* 這是用戶名稱 */}
              <div className="flex justify-between mb-2">
                <h4 className="font-bold">{userName}</h4>
                <button>123</button>
              </div>
              <div className="mb-2">星星數量</div>
              <div>{userComment}</div>
            </div>
          </div>
          <div className="flex pt-5 pb-9">
            <div className="bg-[#D7D7D7] w-[60px] h-[60px] rounded-full flex-shrink-0 mr-3"></div>
            <div className="w-full">
              {/* 這是用戶名稱 */}
              <div className="flex justify-between mb-2">
                <h4 className="font-bold">{userName}</h4>
                <button>123</button>
              </div>
              <div className="mb-2">星星數量</div>
              <div>{userComment}</div>
            </div>
          </div>
        </div>

        <button className="flex mx-auto py-1 items-center">
          查看更多
          <IoIosArrowBack className="mr-1" />
        </button>
      </div>
      {/* 這是撰寫評論區 */}

      <form>
        <p className="mb-6">
          您尚未登入，亦可
          <Link
            href="/LoginAndSignUp"
            className="text-blue-400 underline visited:text-blue-600"
          >
            登入
          </Link>
          留言。
        </p>
        <p className="mb-5">暱稱：</p>
        {/* 這邊使用RHF */}
        <input
          type="text"
          placeholder="請輸入暱稱"
          className="py-4 px-3 mb-6 w-full bg-[#FAFAFA] focus-visible:outline-red-400"
        />
        <p className="mb-5">評價星號：</p>
        <div className="py-4 mb-[30px]">星星數量</div>
        <textarea
          name=""
          id=""
          className="px-2 py-3 mb-5 block w-full min-h-[280px] resize-none"
          placeholder="請輸入評價內容"
        ></textarea>
        <button className="py-2 px-8 ml-auto block bg-[#D7D7D7]">送出</button>
      </form>
    </div>
  )
}
