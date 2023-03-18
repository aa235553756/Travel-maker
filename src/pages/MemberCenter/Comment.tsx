import React from 'react'
import MemberLayout from '@/modules/MemberCenterPage/MemberLayout'
import CommentCard from '@/common/components/CommentCard'
import { MdKeyboardArrowDown } from 'react-icons/md'

export default function Comment() {
  return (
    <div>
      {/* 手機版 */}
      <div className="container">
        <h2 className="text-lg font-bold mt-8 mb-4 md:hidden">我的評論</h2>
        {/* 詳細資訊區 */}
        <div className="flex flex-col md:hidden">
          <div className="flex flex-col space-y-6">
            <CommentCard
              user="小熊軟糖"
              attract="大安森林公園"
              content="假日很多人來野餐，鋪地墊曬日光浴，享受悠閒放假時光，不需要開車去很遠的地方，搭捷運就可以到，開車來也有地下停車場可以停，很方便。"
            />
            <CommentCard
              user="小熊軟糖"
              attract="大安森林公園"
              content="假日很多人來野餐，鋪地墊曬日光浴，享受悠閒放假時光，不需要開車去很遠的地方，搭捷運就可以到，開車來也有地下停車場可以停，很方便。"
            />
          </div>
          <div className="flex items-center justify-center space-x-2 mt-7 mb-[100px]">
            <p>查看更多</p>
            <MdKeyboardArrowDown />
          </div>
        </div>
      </div>
      {/* 電腦版 */}
      <MemberLayout path="Comment">
        <div className="md:flex md:flex-col md:space-y-7 md:w-2/3">
          {/* 分類資訊區 */}
          <div className="md:bg-[#d7d7d7]">
            <h2 className="md:text-xl md:font-bold md:px-10 md:py-8">
              我的評論
            </h2>
            <hr className="md:w-full" />
            <div className="md:px-10 md:py-6">共有9則評論</div>
          </div>
          {/* 詳細資訊區 */}
          <div>
            <div className="md:flex md:flex-col md:space-y-6 lg:flex-row lg:flex-wrap">
              <CommentCard
                user="小熊軟糖"
                attract="大安森林公園"
                content="假日很多人來野餐，鋪地墊曬日光浴，享受悠閒放假時光，不需要開車去很遠的地方，搭捷運就可以到，開車來也有地下停車場可以停，很方便。"
              />
              <CommentCard
                user="小熊軟糖"
                attract="大安森林公園"
                content="假日很多人來野餐，鋪地墊曬日光浴，享受悠閒放假時光，不需要開車去很遠的地方，搭捷運就可以到，開車來也有地下停車場可以停，很方便。"
              />
            </div>
            <div className="flex items-center justify-center space-x-2 mt-7 mb-[100px]">
              <p>查看更多</p>
              <MdKeyboardArrowDown />
            </div>
          </div>
        </div>
      </MemberLayout>
    </div>
  )
}
