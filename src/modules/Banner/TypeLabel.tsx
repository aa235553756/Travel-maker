import React from 'react'
import { UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { CategoryId } from '@/util/selectData'
import {
  MdDirectionsRun,
  MdDeck,
  MdLocalBar,
  MdAccountBalance,
  MdDirectionsBike,
} from 'react-icons/md'
import { FaCameraRetro } from 'react-icons/fa'
import { HiUserGroup } from 'react-icons/hi'
import { RiBarChart2Line } from 'react-icons/ri'
import { defaultValueProp } from '@/util/types'

const iconArray = [
  <MdDirectionsRun key={0} />,
  <RiBarChart2Line key={1} />,
  <FaCameraRetro key={2} />,
  <MdDeck key={3} />,
  <MdLocalBar key={4} />,
  <MdAccountBalance key={5} />,
  <HiUserGroup key={6} />,
  <MdDirectionsBike key={7} />,
]

interface TypeLabelProp {
  register: UseFormRegister<defaultValueProp>
  watch: UseFormWatch<defaultValueProp>
  setValue: UseFormSetValue<defaultValueProp>
}

export default function TypeLabel({
  register,
  watch,
  setValue,
}: TypeLabelProp) {
  return (
    <>
      {CategoryId.map((item, index) => {
        const CategoryId = { ...register('CategoryId') }
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
          const setCurrentValue = (bool: boolean) => {
            CategoryId.onChange(e)
            const data = watch(`CategoryId`)
            // 篩選data，設定表單
            setValue(
              'CategoryId',
              data.filter((item: string) => {
                return bool ? item !== '1' : item === '1'
              })
            )
          }
          // 判斷是否為'1',隨心所欲，執行不同參數函式
          item.value !== '1' ? setCurrentValue(true) : setCurrentValue(false)
        }

        let className =
          'py-4 cursor-pointer text-[#797979] text-center border-2 border-white bg-glass w-[calc((100%-112px)/8)] min-w-[72px] rounded-xl  md:min-w-0 duration-200 hover:bg-glass-45'
        // 取決表單內是否有該值，賦予樣式
        className += watch('CategoryId').includes(item.value)
          ? ' !bg-primary-dark !text-white'
          : ''
        return (
          <label key={index} className={className}>
            <div>
              {/* icon */}
              <div className="mb-2 mx-auto text-2xl w-[24px]">
                {iconArray[index]}
              </div>
              <input
                type="checkbox"
                {...register('CategoryId', { required: true })}
                value={item.value}
                className="hidden"
                onChange={handleChange}
              />
              <p className="text-sm">{item.name}</p>
            </div>
          </label>
        )
      })}
    </>
  )
}
