import React from 'react'
import ReactStarRatings from 'react-star-ratings'

// 預設大小starDimension為20px
// 點擊為可選參數
interface CustomStarProp {
  rating: number
  clickable?: boolean
  starDimension?: string
  setSomething?: React.Dispatch<number>
}

export default function CustomStar({
  rating,
  clickable,
  starDimension,
  setSomething,
}: CustomStarProp) {
  const handleRatingChange = (newRating: number) => {
    setSomething ? setSomething(newRating) : null
  }

  return (
    <ReactStarRatings
      rating={rating}
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
