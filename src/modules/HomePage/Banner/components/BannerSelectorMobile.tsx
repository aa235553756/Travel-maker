/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useForm } from 'react-hook-form'
import { MdOutlineCancel } from 'react-icons/md'

// 這邊有兩顆按鈕會觸發onSubmit
export function BannerSelectorMobile({
  onSubmit,
  isHidden,
  setIsHidden,
}: {
  isHidden: any
  setIsHidden: any
  onSubmit: any
}) {
  const { register, handleSubmit } = useForm()

  return (
    <form
      id="TypeFormMoblie"
      onSubmit={handleSubmit(onSubmit)}
      className={
        isHidden
          ? 'hidden'
          : 'fixed top-0 right-0  w-screen h-screen bg-white !overflow-y-scroll z-[1]'
      }
    >
      <button
        type="button"
        className="mb-4 ml-auto block text-2xl"
        onClick={() => {
          setIsHidden(!isHidden)
        }}
      >
        <MdOutlineCancel />
      </button>

      <ul className="mb-4">
        <li className="px-4 py-2 border-y-2 font-bold">選擇行程(必選)</li>
        <label className="flex justify-between px-4 py-2">
          2個景點
          <input type="radio" {...register('journeys')} />
        </label>
        <label className="flex justify-between px-4 py-2">
          4個景點
          <input type="radio" {...register('journeys')} />
        </label>
        <label className="flex justify-between px-4 py-2">
          6個景點
          <input type="radio" {...register('journeys')} />
        </label>
        <label className="flex justify-between px-4 py-2">
          8個景點
          <input type="radio" {...register('journeys')} />
        </label>
      </ul>

      <ul className="mb-4">
        <li className="px-4 py-2 border-y-2 font-bold">選擇交通工具</li>
        <label className="flex justify-between px-4 py-2">
          不限
          <input type="radio" {...register('transports')} />
        </label>
        <label className="flex justify-between px-4 py-2">
          走路
          <input type="radio" {...register('transports')} />
        </label>
        <label className="flex justify-between px-4 py-2">
          開車
          <input type="radio" {...register('transports')} />
        </label>
      </ul>

      <ul className="mb-6">
        <li className="px-4 py-2 border-y-2 font-bold">選擇區域(必選)</li>
        <li className="flex justify-between px-4 py-2 border-b-2">
          鄰近
          <input type="checkbox" />
        </li>
        <li className="flex justify-between px-4 py-2">
          不限
          <input type="checkbox" />
        </li>
        <li className="flex justify-between px-4 py-2">
          中山區
          <input type="checkbox" />
        </li>
        <li className="flex justify-between px-4 py-2">
          大安區
          <input type="checkbox" />
        </li>
        <li className="flex justify-between px-4 py-2">
          信義區
          <input type="checkbox" />
        </li>
        <li className="flex justify-between px-4 py-2">
          士林區
          <input type="checkbox" />
        </li>
        <li className="flex justify-between px-4 py-2">
          大同區
          <input type="checkbox" />
        </li>
        <li className="flex justify-between px-4 py-2">
          內湖區
          <input type="checkbox" />
        </li>
        <li className="flex justify-between px-4 py-2">
          萬華區
          <input type="checkbox" />
        </li>
        <li className="flex justify-between px-4 py-2">
          北投區
          <input type="checkbox" />
        </li>
        <li className="flex justify-between px-4 py-2">
          松山區
          <input type="checkbox" />
        </li>
      </ul>

      <hr />

      <div className="flex justify-between px-4 py-4">
        <button type="button" className="underline">
          清除全部
        </button>
        <button form="TypeFormMobile" className="bg-[#ccc] px-8 py-2">
          送出
        </button>
      </div>
    </form>
  )
}
