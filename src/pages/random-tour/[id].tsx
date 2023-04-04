import React from 'react'

export async function getServerSideProps(context: { query: { id: number } }) {
  try {
    const { id } = context.query
    const res = await fetch(
      `https://travelmaker.rocket-coding.com/api/tours/${id}`
    )
    const resJSON = await res.json()
    if (res.ok) {
      return {
        props: {
          data: resJSON,
        },
      }
    }
    throw new Error('不知名錯誤')
  } catch (err) {
    return {
      props: {
        data: {},
      },
    }
  }
}

export default function randomTour({ data }: { data: { TourId: number } }) {
  console.log(data)

  // 同random-index
  return (
    <div>
      {!data.TourId ? '！錯誤，沒有此id號行程' : null}
      <li>安安這裡是第{data.TourId}號id 收藏行程頁面</li>
      <br />
      <li>這邊要判斷`目前token`是否為創建者</li>
      <br />
      <li> randomTour{JSON.stringify(data)}</li>
    </div>
  )
}

// todo
// 更改行程名稱
// 儲存後 詢問要新建or取代
