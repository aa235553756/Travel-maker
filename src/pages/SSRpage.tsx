import { increment } from '@/redux/counterSlice'
import { getCookie } from 'cookies-next'
import Link from 'next/link'
import React from 'react'
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
  // Redux
  const count = useSelector((state: CounterStateProp) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <>
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
