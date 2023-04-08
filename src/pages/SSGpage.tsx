import { getCookie } from 'cookies-next'
import React from 'react'

// const token =
//   'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzNzYyIiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNjgwMDUwNDI3LCJleHAiOjE2ODEzNDY0MjcsImp0aSI6ImVjYTkzN2Q5LTVjMTMtNGNjOS05MzIwLWQyMmYyZDA2NTllNiJ9.fMloEbzi4W3RxIFoZZ1Az4XNH1kSunDMC3Cw_L-7bvQ'

export async function getStaticProps({
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
  return (
    <>
      <p>
        getStaticProps無法getCookie，故SSG頁面 ex熱門話題,首頁 (不需要cookies)
      </p>
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
