import React, { ReactNode } from 'react'

export interface CustomModalProp {
  modal: boolean
  setModal: React.Dispatch<React.SetStateAction<boolean>>
  children?: ReactNode
}

export function CustomModal({ modal, setModal, children }: CustomModalProp) {
  // 請帶children取代modal示範
  return (
    <>
      {/* 黑遮罩 待上opacityDuration */}
      {modal ? (
        <div
          onClick={() => {
            setModal(!modal)
          }}
          className={`z-10 fixed w-full h-full bg-[rgba(0,0,0,0.5)] top-0 duration-150 animate-fade`}
        ></div>
      ) : null}
      {/* modal本體 */}
      <div
        className={`${
          modal ? 'scale-x-100 scale-y-100' : null
        } z-30 absolute top-1/4 left-1/2 translate-x-[-50%] translate-y-[-50%] duration-150 scale-x-0 scale-y-0 origin-top-left `}
      >
        {/* children */}
        {children ? (
          children
        ) : (
          <div className="bg-white rounded-xl w-[500px] h-[300px]">
            modal示範
          </div>
        )}
      </div>
    </>
  )
}
