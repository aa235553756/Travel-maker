import SearchButton from './../../common/components/searchButton'
import React, { useState } from 'react'
import Select from 'react-select'
import JourneyCard from '@/common/components/JourneyCard'

export default function HotTopics() {
  const options = [
    { value: '城市走走', label: '城市走走' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ]
  const [tabPos, setTabPos] = useState('行程')
  // const {register,watch}=useForm()
  return (
    <div className="container pt-10 pb-[100px] md:pt-20 md:pb-[160px]">
      <div className="flex space-x-6">
        <Select
          options={options}
          placeholder="類別"
          className="w-1/4"
          isMulti={true}
          onChange={(item) => {
            console.log(item)
          }}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              borderColor: state.isFocused ? 'grey' : 'red',
              height: '60px',
            }),
          }}
        />
        <Select options={options} placeholder="區域" className="w-1/4" />
        <Select
          isSearchable={true}
          placeholder="請輸入關鍵字"
          className="w-1/3"
        />
        <SearchButton />
      </div>
      <ul className="flex mb-10 md:mb-15">
        {['行程', '景點', '遊記'].map((item, index) => {
          return (
            <li
              key={index}
              className={`duration-150 py-4 w-1/3 md:w-1/6 text-center md:text-xl border-b cursor-pointer
              ${tabPos === item ? `border-[#1890FF]` : null}`}
              onClick={() => {
                setTabPos(item)
              }}
            >
              {item}
            </li>
          )
        })}

        <div className="flex-grow border-b"></div>
      </ul>
      <div className="flex space-x-6">
        <JourneyCard favorites={1.5} number={1} title={'大安森林公園'} />
        <JourneyCard favorites={1.5} number={5} title={'大安森林公園'} />
        <JourneyCard favorites={1.5} number={1} title={'大安森林公園'} />
        {/* 這是搜尋按鈕 */}
      </div>
    </div>
  )
}

//todo
//頁籤
//Typelabel
//看元件卡片有幾種
