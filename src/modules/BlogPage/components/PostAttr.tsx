/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import UploadImage from './UploadImage'
import { BsGeoAltFill } from 'react-icons/bs'

export default function PostAttr({ attractName }: { attractName: string }) {
  return (
    <div className="flex flex-col space-y-4">
      {/* 景點 */}
      <div className="flex items-center space-x-2">
        <BsGeoAltFill />
        <span className="text-lg">{attractName}</span>
      </div>
      
      {/* 上傳照片 */}
      <UploadImage />

      {/* 輸入內容 */}
      <textarea
        name="blogContent"
        cols={30}
        rows={10}
        className="border p-3 w-full"
        placeholder="請輸入內容"
        style={{ resize: 'none' }}
      ></textarea>
    </div>
  )
}
