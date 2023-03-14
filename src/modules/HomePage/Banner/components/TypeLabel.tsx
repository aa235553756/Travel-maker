import React from 'react'
import { FieldValues, UseFormRegister, UseFormWatch } from 'react-hook-form'

export default function TypeLabel({
  index,
  item,
  register,
  watch,
}: {
  index: number
  item: string
  register: UseFormRegister<FieldValues>
  watch: UseFormWatch<FieldValues>
}) {
  return (
    <label
      key={index}
      className={`py-4 border w-[calc((100%-112px)/8)] text-center min-w-[72px] md:min-w-0 
      ${Number(watch('type')) === index + 1 ? 'border-black' : null}`}
    >
      <div className="peer-checked:bg-red-600">
        <div className="mb-2 mx-auto text-2xl w-[24px]">{item}</div>
        <input
          type="radio"
          {...register('type')}
          className="hidden"
          value={index + 1}
          defaultChecked={index === 0 ? true : false}
        />
        <p className="text-sm">隨心所欲</p>
      </div>
    </label>
  )
}
