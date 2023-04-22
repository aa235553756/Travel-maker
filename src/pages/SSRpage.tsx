import { getCookie } from 'cookies-next'
import React, { useState } from 'react'

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

export default function SSRPage({ data }: { data: undefined }) {
  const [firstData, setfirstData] = useState(0) //originData
  const [secondData] = useState(firstData)

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
