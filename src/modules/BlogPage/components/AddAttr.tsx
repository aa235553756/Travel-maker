import React from 'react'
import Select from 'react-select'
import UploadImage from './UploadImage'
import { BsGeoAltFill } from 'react-icons/bs'
import { IoAddCircleOutline } from 'react-icons/io5'

export default function AddAttr() {
  const AttrOptions = [
    { value: '大安森林公園', label: '大安森林公園' },
    { value: '中山蝴蝶園', label: '中山蝴蝶園' },
    { value: '中正藝廊', label: '中正藝廊' },
  ]
  return (
    <div className="flex flex-col space-y-4">
      {/* 景點 */}
      <div className="flex items-center space-x-2">
        <BsGeoAltFill />
        <Select
          id="selectbox"
          instanceId="selectbox"
          options={AttrOptions}
          isSearchable={true}
          placeholder="請輸入關鍵字"
          className="w-full md:w-1/3 rounded-md"
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              height: '42px',
            }),
          }}
        />
        <IoAddCircleOutline className="text-xl" />
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
