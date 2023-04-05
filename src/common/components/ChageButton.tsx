import React from 'react'
import { BsArrowRepeat } from 'react-icons/bs'

export default function ChageButton({ lg_display }: { lg_display?: boolean }) {
  const className = `
  ${lg_display ? 'hidden lg:flex' : 'flex lg:hidden'}
  active:contrast-50
  text-[#FFFFFF]
  bg-primary 
  items-center 
  py-3 
  px-6   
  mx-auto 
  md:mr-0
  lg:ml-0
  rounded-md
  lg:text-2xl
  `

  return (
    <button className={className}>
      <BsArrowRepeat size={24} className="mr-2" />
      換一組
    </button>
  )
}
