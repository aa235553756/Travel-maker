import React from 'react'
import { BsGeoAltFill, BsImageFill } from 'react-icons/bs'
import { IoAddCircleOutline } from 'react-icons/io5'

const AddAttr: React.FC = () => {
  return (
    <div className="flex flex-col space-y-4">
      {/* 景點 */}
      <div className="flex items-center space-x-2">
        <BsGeoAltFill />
        <input
          type="text"
          className="border rounded-lg p-2"
          placeholder="新增景點"
        />
        <IoAddCircleOutline className="text-xl" />
      </div>
      {/* 上傳照片 */}
      <div className="bg-[#d7d7d7] h-[132px] flex justify-center items-center">
        <button className="border px-5 py-2 flex space-x-2 items-center">
          <BsImageFill />
          <span>上傳照片</span>
        </button>
      </div>
      {/* 輸入內容 */}
      <textarea
        name="blogContent"
        cols={30}
        rows={10}
        className="border p-3 w-full"
        placeholder="請輸入內容"
      ></textarea>
    </div>
  )
}

export default AddAttr
