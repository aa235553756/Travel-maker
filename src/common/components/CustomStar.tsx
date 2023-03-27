import React, { useState } from 'react'
import ReactStarRatings from 'react-star-ratings'

// 預設大小starDimension為20px
// 點擊為可選參數
interface CustomStarProp {
  rating: number
  clickable?: boolean
  starDimension?: string
}

export default function CustomStar({
  rating,
  clickable,
  starDimension,
}: CustomStarProp) {
  const [newRating, setNewRating] = useState(rating)

  const handleRatingChange = (newRating: number) => {
    console.log('New rating:', newRating)
    setNewRating(newRating)
  }

  return (
    <ReactStarRatings
      rating={newRating}
      starRatedColor="orange"
      starEmptyColor="gray"
      numberOfStars={5}
      starDimension={starDimension ?? '20px'}
      starSpacing="2px"
      changeRating={clickable ? handleRatingChange : undefined}
      starHoverColor="orange"
    />
  )
}
