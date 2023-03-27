import React from 'react'
import InfoItem from './InfoItem'

export default function InfoList({ infoAry }: { infoAry: string[] }) {
  return (
    <ul className="p-4 bg-[#D7D7D7] mb-10 space-y-4">
      {infoAry.map((item, index) => {
        return <InfoItem key={index} index={index} item={item} />
      })}
    </ul>
  )
}
