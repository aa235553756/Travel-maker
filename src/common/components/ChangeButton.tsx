import React from 'react'
import { BsArrowRepeat } from 'react-icons/bs'

export default function ChangeButton({
  lg_display,
  onClick,
}: {
  lg_display?: boolean
  onClick: () => void
}) {
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
  lg:text-2xl hover:bg-primary-tint hover:duration-500
    `

  return (
    <button className={className} onClick={onClick}>
      <BsArrowRepeat size={24} className="mr-2" />
      換一組
    </button>
  )
}
