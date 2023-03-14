import React from 'react'
import { BsArrowRepeat } from 'react-icons/bs'

export default function ChageButton({ lg_display }: { lg_display?: boolean }) {
  const className = `
  ${lg_display ? 'hidden lg:flex' : 'flex lg:hidden'}
  active:contrast-50
  text-[#FFFFFF]
  bg-[#737373] 
  items-center 
  py-2 
  px-5   
  mx-auto 
  lg:ml-0
  `

  return (
    <button className={className}>
      <BsArrowRepeat size={24} className="mr-2" />
      換一組
    </button>
  )
}
