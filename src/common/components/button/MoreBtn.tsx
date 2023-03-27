import React from 'react'
import { AiOutlineMore } from 'react-icons/ai'

export default function MoreBtn({ onClick }: { onClick?: () => void }) {
  return (
    <button type="button" className="p-2" onClick={onClick}>
      <AiOutlineMore />
    </button>
  )
}
