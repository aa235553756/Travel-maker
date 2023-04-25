import Link from 'next/link'
import React from 'react'
import { IoIosArrowBack } from 'react-icons/io'

export default function CustomLink({
  AttractionName,
}: {
  AttractionName: string
}) {
  return (
    <Link
      href="/attractionions"
      className="text-lg inline-flex items-center mb-5 md:text-xl md:mb-11"
    >
      <IoIosArrowBack className="mr-2" />
      {AttractionName}
    </Link>
  )
}
