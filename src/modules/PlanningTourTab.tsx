import React from 'react'
export default function PlanningTourTab({
  tabPos,
  setTabPos,
}: {
  tabPos: string
  setTabPos: React.Dispatch<string>
}) {
  return (
    <ul className="flex mb-6">
      {['備用景點', '地圖'].map((item) => {
        return (
          <li
            key={item}
            className={`duration-150 pb-4 w-[25%] md:w-1/6 text-center border-b-2 cursor-pointer mb-[2px]
                      ${tabPos === item ? `border-[#1890FF]` : null}`}
            onClick={() => {
              setTabPos(item)
            }}
          >
            {item}
          </li>
        )
      })}
    </ul>
  )
}
