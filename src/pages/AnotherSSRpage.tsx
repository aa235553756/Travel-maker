import React from 'react'
import { connect } from 'react-redux'
import wrapper from '@/redux/wrapper'

interface CounterStateProp {
  counter: { value: number }
}

// 如果要在serside就先拿到counter
export const getServerSideProps = wrapper.getServerSideProps(() => async () => {
  return { props: {} }
})

// 在serside就先拿到counter了
function Page({ counter }: CounterStateProp) {
  return (
    <div>
      {JSON.stringify(counter)}
      <span>在ServerSide裏面就可以取得了</span>
    </div>
  )
}
export default connect((state) => state)(Page)
