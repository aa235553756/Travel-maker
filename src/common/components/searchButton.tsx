import React from 'react'
import { BsSearch } from 'react-icons/bs'
export default function SearchButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      className="rounded-xl py-[10px] bg-primary text-white w-[60px] h-[60px] md:p-5 md:w-auto hover:bg-primary-tint hover:duration-500"
      onClick={onClick}
    >
      <BsSearch className="text-xl mx-auto" />
    </button>
  )
}

// todo
// 頁籤
// 搜尋bar
// select
