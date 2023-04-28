import React from 'react'
import {
  BsFillGeoAltFill,
  BsClockFill,
  BsFillTelephoneFill,
  BsFacebook,
  BsFillEnvelopeFill,
  BsGlobe,
} from 'react-icons/bs'

export default function InfoList({
  AttractionData,
}: {
  AttractionData: {
    Address: string
    OpenTime: string
    Tel: string
    Facebook: string
    OfficialSite: string
    Email: string
  }
}) {
  const { Address, OpenTime, Tel, Facebook, OfficialSite, Email } =
    AttractionData

  let phoneNumber = Tel
  phoneNumber = phoneNumber.replace(/-/g, '')

  return (
    <ul className="p-4 bg-white mb-10 space-y-4 drop-shadow-[1px_1px_15px_rgba(0,0,0,0.15)] rounded-md">
      {/* 地址 Address */}
      {Address && (
        <li className="flex items-center">
          <div className="mr-1 md:mr-2">
            <BsFillGeoAltFill className="text-primary" />
          </div>
          <span>{Address}</span>
        </li>
      )}
      {/* 營業時間 openTime */}
      {OpenTime && (
        <li className="flex items-center">
          <div className="mr-1 md:mr-2">
            <BsClockFill className="text-primary" />
          </div>
          <span>{OpenTime}</span>
        </li>
      )}
      {/* 電話 tel */}
      {Tel && (
        <li className="flex items-center">
          <div className="mr-1 md:mr-2">
            <BsFillTelephoneFill className="text-primary" />
          </div>
          <a className="underline Roboto" href={'tel:+' + phoneNumber}>
            {Tel}
          </a>
        </li>
      )}
      {/* 官方粉絲團 fb */}
      {Facebook && (
        <li className="flex items-center">
          <div className="mr-1 md:mr-2">
            <BsFacebook className="text-primary" />
          </div>
          <a target="_blank" className="underline" href={Facebook}>
            官方粉絲團
          </a>
        </li>
      )}
      {/* 官方網站 of site */}

      {OfficialSite && (
        <li className="flex items-center">
          <div className="mr-1 md:mr-2">
            <BsGlobe className="text-primary" />
          </div>
          <a target="_blank" className="underline" href={OfficialSite}>
            官方網站
          </a>
        </li>
      )}
      {/* 信箱 */}
      {Email && (
        <li className="flex items-center">
          <div className="mr-1 md:mr-2">
            <BsFillEnvelopeFill className="text-primary" />
          </div>
          <a href={'mailto:example@example.com'} className="underline">
            {Email}
          </a>
        </li>
      )}
    </ul>
  )
}
