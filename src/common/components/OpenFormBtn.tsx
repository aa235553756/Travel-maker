import React from 'react'
import { BsChevronDown } from 'react-icons/bs'
export default function OpenFormBtn({
  setIsHidden,
  isHidden,
}: {
  setIsHidden: React.Dispatch<React.SetStateAction<boolean>>
  isHidden: boolean
}) {
  return (
    <button
      type="button"
      className="bg-glass-45 bg-gray w-full px-5 py-4 md:mb-6 mb-4 flex items-center justify-between md:hidden rounded-xl"
      onClick={() => {
        setIsHidden(!isHidden)
        document.body.style.overflow = 'hidden'
      }}
    >
      <div className="flex w-full py-4 px-7 text-lg text-[#9F9F9F] items-center justify-between bg-white rounded-xl">
        請選擇行程 / 距離 / 區域
        <BsChevronDown />
      </div>
    </button>
  )
}
