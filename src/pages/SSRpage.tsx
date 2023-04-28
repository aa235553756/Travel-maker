import { increment } from '@/redux/counterSlice'
import { getCookie } from 'cookies-next'
import React, { useState } from 'react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'

// const token =
//   'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzNzYyIiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNjgwMDUwNDI3LCJleHAiOjE2ODEzNDY0MjcsImp0aSI6ImVjYTkzN2Q5LTVjMTMtNGNjOS05MzIwLWQyMmYyZDA2NTllNiJ9.fMloEbzi4W3RxIFoZZ1Az4XNH1kSunDMC3Cw_L-7bvQ'

export async function getServerSideProps({
  req,
  res,
}: {
  req: undefined
  res: undefined
}) {
  const token = getCookie('auth', { req, res })
  // const { id } = params
  const response = await fetch(`https://todoo.5xcamp.us/todos`, {
    headers: {
      Authorization: `${token ?? undefined}`,
    },
  })
  const data = await response.json()

  return {
    props: { data },
  }
}

interface CounterStateProp {
  counter: { value: number }
}

export default function SSRPage({ data }: { data: undefined }) {
  const [firstData, setfirstData] = useState(0) //originData
  const [secondData] = useState(firstData)
  // Redux
  const count = useSelector((state: CounterStateProp) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <>
      <div className="text-2xl">
        {'原始&伺服器日期數量' + firstData}
        <br />
        {'本地端基於原始state日期數量' + secondData}
        <br />
        <button
          onClick={() => {
            setTimeout(() => {
              setfirstData((prev) => prev + 1)
            }, 2000)
          }}
        >
          案我GET伺服器數量
        </button>
      </div>
      <br />
      <h1 className="text-2xl">{count}</h1>
      <button
        className="text-2xl"
        onClick={() => {
          // Redux
          dispatch(increment())
        }}
      >
        增加
      </button>
      <br />
      <Link className="text-2xl" href={'./AnotherSSRpage'}>
        去另一頁看看Redux數值是否正確
      </Link>
      <br />
      <Link className="text-2xl" href={'./SSGpage'}>
        去SSG看看Redux數值是否正確
      </Link>
      <p>getServerSideProps可以getCookie，故SSG頁面 ex:會員,規劃</p>
      <button
        className="bg-green-200"
        onClick={() => {
          console.log(getCookie('auth'))
        }}
      >
        CSR兩邊都可以案我getCookie
      </button>
      <div>{JSON.stringify(data)}</div>
    </>
  )
}
