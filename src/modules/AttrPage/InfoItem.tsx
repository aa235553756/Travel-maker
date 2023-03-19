import React from 'react'
import {
  BsFillGeoAltFill,
  BsClockFill,
  BsFillTelephoneFill,
  BsFacebook,
  BsFillEnvelopeFill,
} from 'react-icons/bs'

interface InfoItemProp {
  index: number
  item: string
}

export default function InfoItem({ index, item }: InfoItemProp) {
  const iconAry = [
    <BsFillGeoAltFill key="0" />,
    <BsClockFill key="1" />,
    <BsFillTelephoneFill key="2" />,
    <BsFacebook key="3" />,
    <BsFillEnvelopeFill key="4" />,
  ]

  return (
    // 這邊到時候要做完整一點，可以點擊
    // {AttrTel ? <li key={index} className="flex items-center">
    //   <div className="mr-1 md:mr-2">{iconAry[index]}</div>
    //   <span>{item}</span>
    // </li> : null}
    <li key={index} className="flex items-center">
      <div className="mr-1 md:mr-2">{iconAry[index]}</div>
      <span>{item}</span>
    </li>
  )
}
