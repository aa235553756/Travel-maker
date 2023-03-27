import React from 'react'
import Image from 'next/image'
import ViewAttr from '@/modules/BlogPage/components/ViewAttr'
import SocialMedia from '@/common/components/SocialMedia'
import TypeTag from '@/common/components/TypeTag'
import AttrImageContainer from '@/common/components/AttrImageContainer'
import PostComment from '@/modules/BlogPage/components/PostComment'
import { BsGeoAltFill } from 'react-icons/bs'

export default function PostBlog() {
  return (
    <div className="container">
      <div className="md:pt-7 pb-[100px] lg:mb-[160px]">
        {/* 圖片 */}
        <AttrImageContainer className="flex flex-col justify-center mb-10 relative min-w-full min-h-[208px] bg-[rgba(0,0,0,0.5)] md:aspect-[21/9]" />

        {/* 用戶 */}
        <div className="w-full mx-auto lg:w-1/2">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="flex item-center space-x-5 mb-4 md:mb-7">
              <Image
                src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
                alt="圖片"
                width={60}
                height={60}
                className="rounded-full min-h-[60px]"
              ></Image>
              <div className="flex flex-col space-y-2">
                <span className="text-lg">安妮亞</span>
                <span>2022/03/05發布</span>
              </div>
            </div>
            <div className="pl-20 mb-7 md:pl-0 md:mb-0">
              <SocialMedia view={156} like={156} comment={42} />
            </div>
          </div>

          <hr className="mb-8" />

          {/* 遊記資訊 */}
          <div className="flex flex-col space-y-4 mb-[72px]">
            <h2 className="text-lg">瘋狂熱血少年團</h2>
            <div className="flex items-center space-x-2">
              <BsGeoAltFill />
              <span>臺北市大安區、信義區</span>
            </div>
            <div className="flex space-x-6">
              <TypeTag type="城市走走"></TypeTag>
              <TypeTag type="放鬆療癒"></TypeTag>
            </div>
          </div>

          {/* 景點資訊 */}
          <div className="flex flex-col space-y-10 mb-[60px]">
            <ViewAttr
              attractName="大安森林公園"
              content="吃飽後，我們便搭車來到東京鐵塔周遭，這裡可是有好幾個必拍的景點唷！首先抵達的是增上寺，它位於港區芝公園內，與東京鐵塔比鄰、走路只要五分鐘，是東京人每年元旦新年必參拜的聖地，還會在此聽「除夜之鐘」108響鐘聲、倒數跨年並且祈願未來一年平安健康。"
            />
            <ViewAttr
              attractName="中正紀念堂"
              content="吃飽後，我們便搭車來到東京鐵塔周遭，這裡可是有好幾個必拍的景點唷！首先抵達的是增上寺，它位於港區芝公園內，與東京鐵塔比鄰、走路只要五分鐘，是東京人每年元旦新年必參拜的聖地，還會在此聽「除夜之鐘」108響鐘聲、倒數跨年並且祈願未來一年平安健康。"
            />
            <ViewAttr
              attractName="松山文創園區"
              content="吃飽後，我們便搭車來到東京鐵塔周遭，這裡可是有好幾個必拍的景點唷！首先抵達的是增上寺，它位於港區芝公園內，與東京鐵塔比鄰、走路只要五分鐘，是東京人每年元旦新年必參拜的聖地，還會在此聽「除夜之鐘」108響鐘聲、倒數跨年並且祈願未來一年平安健康。"
            />
            <ViewAttr
              attractName="台北101"
              content="吃飽後，我們便搭車來到東京鐵塔周遭，這裡可是有好幾個必拍的景點唷！首先抵達的是增上寺，它位於港區芝公園內，與東京鐵塔比鄰、走路只要五分鐘，是東京人每年元旦新年必參拜的聖地，還會在此聽「除夜之鐘」108響鐘聲、倒數跨年並且祈願未來一年平安健康。"
            />
          </div>

          {/* 留言 */}
          <div>
            <h2 className="text-lg mb-7">留言(0)</h2>
            <div className="flex items-center space-x-4 mb-10">
              <Image
                src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
                alt="圖片"
                width={40}
                height={40}
                className="rounded-full min-h-[40px]"
              ></Image>
              <input
                type="text"
                placeholder="請留言"
                className="border px-3 py-4 grow rounded-md"
              />
              <button className="px-2 py-4 border rounded-md md:px-5">
                送出
              </button>
            </div>
            <hr className="mb-10" />

            <h2 className="text-lg mb-7">其他留言(2)</h2>

            <PostComment
              user="小熊軟糖"
              comment=" 假日很多人來野餐，鋪地墊曬日光浴，享受悠閒放假時光，不需要開車去很遠的地方，搭捷運就可以到，開車來也有地下停車場可以停，很方便。"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
