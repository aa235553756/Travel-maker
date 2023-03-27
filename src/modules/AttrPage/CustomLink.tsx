import Link from 'next/link'
import React from 'react'
import { IoIosArrowBack } from 'react-icons/io'
interface dataProp {
  title: string
}

export default function CustomLink({ data }: { data: dataProp }) {
  return (
    <Link
      href="/attractionions"
      className="text-lg inline-flex items-center mb-5 md:text-xl md:mb-11"
    >
      <IoIosArrowBack className="mr-2" />
      {data.title}
    </Link>
  )
}
