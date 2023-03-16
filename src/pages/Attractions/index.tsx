import Link from 'next/link'
import React, { useState } from 'react'

// getStaticProps測試
export async function getStaticProps() {
  const res = await fetch('https://dummyjson.com/products/')
  const data = await res.json()
  return {
    props: { data }, // will be passed to the page component as props
  }
}

interface productProp {
  id: number
  title: string
}

export default function AttractionsList({
  data,
}: {
  data: { products: [productProp] }
}) {
  const [dataState, setDataState] = useState<{ products: productProp[] }>({
    products: [],
  })

  return (
    <ul>
      <button
        onClick={async () => {
          if (dataState.products.length === 0) {
            const res = await fetch('https://dummyjson.com/products/')
            const data = await res.json()
            console.log(data)
            setDataState(data)
          } else {
            setDataState({
              products: [],
            })
          }
        }}
      >
        123
      </button>
      <span>{dataState.products[0]?.title ?? null}</span>
      {data.products.map((item, index) => {
        return (
          <li key={index}>
            <span>name:{item.title}</span>
            <Link
              className="text-blue-600 visited:text-blue-800"
              href={`/Attractions/${item.id}`}
            >
              id:{item.id}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
