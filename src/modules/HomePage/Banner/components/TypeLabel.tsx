import React from 'react'
import { FieldValues, UseFormRegister, UseFormWatch } from 'react-hook-form'

import {
  MdDirectionsRun,
  MdBarChart,
  MdDeck,
  MdLocalBar,
  MdAccountBalance,
  MdDirectionsBike,
} from 'react-icons/md'
import { FaCameraRetro } from 'react-icons/fa'
import { HiUserGroup } from 'react-icons/hi'

const iconArray = [
  <MdDirectionsRun key={0} />,
  <MdBarChart key={1} />,
  <FaCameraRetro key={2} />,
  <MdDeck key={3} />,
  <MdLocalBar key={4} />,
  <MdAccountBalance key={5} />,
  <HiUserGroup key={6} />,
  <MdDirectionsBike key={7} />,
]

export default function TypeLabel({
  register,
  watch,
}: {
  register: UseFormRegister<FieldValues>
  watch: UseFormWatch<FieldValues>
}) {
  return (
    <>
      {iconArray.map((item, index) => {
        return (
          <label
            key={index}
            className={`py-4 rounded-md border w-[calc((100%-112px)/8)] text-center min-w-[72px] md:min-w-0 
      ${Number(watch('type')) === index + 1 ? 'bg-[#B9B8B8]' : null}`}
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
      })}
    </>
  )
}
