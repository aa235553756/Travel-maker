import React from 'react'
import {
  CategoryId,
  Transports,
  DistrictName,
  AttrCounts,
} from '@/util/selectData'

import {
  UseFormRegister,
  UseFormHandleSubmit,
  SubmitHandler,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form'
import { defaultValueProp } from '@/util/types'

// import { geoPromise } from '@/util/constans'

interface PositionData {
  latitude: number
  longitude: number
}

interface SelectSideProp {
  formId: string
  register: UseFormRegister<defaultValueProp>
  handleSubmit: UseFormHandleSubmit<defaultValueProp>
  onSubmit: SubmitHandler<defaultValueProp>
  setValue: UseFormSetValue<defaultValueProp>
  watch: UseFormWatch<defaultValueProp>
  setIsLoading: React.Dispatch<boolean>
}

export default function SelectSide({
  formId,
  handleSubmit,
  register,
  onSubmit,
  setValue,
  watch,
  setIsLoading,
}: SelectSideProp) {
  // 這邊會有兩頁共用此元件,故RHF往外擺
  return (
    <>
      <div>
        <form
          id={formId}
          onSubmit={handleSubmit(onSubmit)}
          className="mb-9 md:w-[218px] lg:w-[264px] bg-white seletSide-shadow rounded-md"
        >
          <h3 className="py-2 px-4">篩選內容</h3>
          <div className="py-1 px-4 bg-gray-F3">選擇行程（必選）</div>
          {/* 這些Label元件都寫在下面 */}
          <LabelRadio register={register} />
          <div className="py-1 px-4 bg-gray-F3">選擇類型（複選）</div>
          <LableType register={register} setValue={setValue} watch={watch} />
          <div className="py-1 px-4 bg-gray-F3">選擇交通工具</div>
          <LableTransport register={register} />
          <div className="py-1 px-4 bg-gray-F3">選擇地區（複選）</div>
          <LableArea
            register={register}
            setValue={setValue}
            watch={watch}
            setIsLoading={setIsLoading}
          />
        </form>
      </div>
    </>
  )
}

function LabelRadio({
  register,
}: {
  register: UseFormRegister<defaultValueProp>
}) {
  return (
    <div className="flex flex-wrap px-4 py-3 pb-5 space-y-4">
      {AttrCounts.map((item, index) => {
        return (
          <label
            key={index}
            className="w-[85px] ml-4 odd:!ml-0 flex items-center [&:nth-child(2)]:!mt-0 cursor-pointer"
          >
            <input
              {...register('AttrCounts')}
              type="radio"
              value={item.value}
              className="mr-2"
            />
            {item.name}
          </label>
        )
      })}
    </div>
  )
}

function LableType({
  register,
  setValue,
  watch,
}: {
  register: UseFormRegister<defaultValueProp>
  setValue: UseFormSetValue<defaultValueProp>
  watch: UseFormWatch<defaultValueProp>
}) {
  return (
    <div className="flex flex-wrap px-4 py-3 pb-5 space-y-3">
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
                return bool ? item !== '0' : item === '0'
              })
            )
          }
          // 判斷是否為'1',隨心所欲，執行不同參數函式
          item.value !== '0' ? setCurrentValue(true) : setCurrentValue(false)
        }

        return (
          <label
            key={index}
            className="ml-4 odd:!ml-0 [&:nth-child(1)]:w-[85px] [&:nth-child(2)]:!mt-0 cursor-pointer"
          >
            <input
              type="checkbox"
              {...register('CategoryId', { required: true })}
              value={item.value}
              className="mr-2"
              onChange={handleChange}
            />
            {item.name}
          </label>
        )
      })}
    </div>
  )
}

function LableTransport({
  register,
}: {
  register: UseFormRegister<defaultValueProp>
}) {
  return (
    <div className="flex flex-wrap px-4 py-3 pb-5 space-y-3">
      {Transports.map((item, index) => {
        return (
          <label
            key={index}
            className="w-[85px] ml-4 odd:!ml-0 [&:nth-child(2)]:!mt-0 cursor-pointer"
          >
            <input
              {...register('Transports', { required: true })}
              type="radio"
              value={item.name}
              className="mr-2"
            />
            {item.name}
          </label>
        )
      })}
    </div>
  )
}

function LableArea({
  register,
  setValue,
  watch,
  setIsLoading,
}: {
  register: UseFormRegister<defaultValueProp>
  setValue: UseFormSetValue<defaultValueProp>
  watch: UseFormWatch<defaultValueProp>
  setIsLoading: React.Dispatch<boolean>
}) {
  return (
    <div className="flex flex-wrap px-4 pt-2 pb-5 space-y-3">
      {DistrictName.map((item, index) => {
        const DistrictName = { ...register('DistrictName') }
        if (index === 0) {
          return (
            <>
              {/* 不限 */}
              <label
                key={index + 1}
                className="ml-4 odd:!ml-0 w-[85px] [&:nth-child(2)]:!mt-0 cursor-pointer"
              >
                <input
                  {...register('DistrictName')}
                  type="checkbox"
                  value={item}
                  className="mr-2"
                  onChange={handleOnChange}
                />
                {item}
              </label>
              {/* 鄰近 */}
              <label
                key={index}
                className="ml-4 odd:!ml-0 w-[85px] [&:nth-child(2)]:!mt-0 cursor-pointer"
              >
                <input
                  type="checkbox"
                  {...register('nearBy')}
                  className="mr-2"
                  onClick={async () => {
                    const geoPromise = new Promise<PositionData>(
                      (reslove, reject) => {
                        navigator.geolocation.getCurrentPosition(
                          (position: GeolocationPosition) => {
                            const { latitude, longitude } = position.coords
                            reslove({ latitude, longitude })
                          },
                          () => {
                            reject()
                          }
                        )
                      }
                    )
                    setIsLoading(true)
                    try {
                      await geoPromise
                      setValue('nearBy', true)
                      setValue('DistrictName', [])
                    } catch (err) {
                      setValue('nearBy', false)
                      setValue('DistrictName', ['不限'])
                    } finally {
                      setIsLoading(false)
                    }
                    return
                  }}
                />
                鄰近
              </label>
            </>
          )
        }

        return (
          <label
            key={index}
            className="ml-4 odd:!ml-0 w-[85px] [&:nth-child(2)]:!mt-0 cursor-pointer"
          >
            <input
              {...register('DistrictName')}
              type="checkbox"
              value={item}
              className="mr-2"
              onChange={handleOnChange}
            />
            {item}
          </label>
        )
        function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
          function setCurrentValue(bool: boolean) {
            DistrictName.onChange(e)
            const data = watch('DistrictName')
            setValue('nearBy', false)
            // 篩選data，設定表單
            setValue(
              'DistrictName',
              data.filter((item) => {
                return bool ? item !== '不限' : item === '不限'
              })
            )
          }
          // 判斷是否為'不限'，執行不同參數函式
          item !== '不限' ? setCurrentValue(true) : setCurrentValue(false)
        }
      })}
    </div>
  )
}
