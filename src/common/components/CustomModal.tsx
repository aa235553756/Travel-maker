import React, { ReactNode, useEffect, useRef } from 'react'
import { BsCheckCircle, BsExclamationCircle } from 'react-icons/bs'

export interface CustomModalProp {
  modal: boolean
  wrapper?: boolean
  overflowOpen?: boolean
  setModal: React.Dispatch<React.SetStateAction<boolean>>
  children?: ReactNode
  options?: boolean
  typeConfirm?: boolean
  typeConfirmWarnIcon?: boolean
  typeConfirmText?: string
  unClickable?: boolean
  onConfirm?: () => void
  onCopy?: () => void
  onReplace?: () => void
}

export function CustomModal({
  modal,
  setModal,
  overflowOpen,
  wrapper,
  children,
  onConfirm,
  typeConfirm,
  typeConfirmWarnIcon,
  typeConfirmText,
  unClickable,
}: CustomModalProp) {
  // 請帶children取代modal示範

  useEffect(() => {
    if (overflowOpen) {
      return
    }
    if (modal) {
      document.body.style.overflow = 'hidden'
      return
    }
    document.body.style.overflow = 'auto'
  }, [modal, overflowOpen])

  return (
    <>
      {/* 黑遮罩 待上opacityDuration */}
      {modal && wrapper && (
        <BlackWrapper
          setModal={setModal}
          modal={modal}
          unClickable={unClickable}
        />
      )}
      {/* modal本體 */}
      <div
        className={`${
          modal ? 'scale-x-100 scale-y-100' : null
        } z-50 fixed top-[40%] left-1/2 translate-x-[-50%] translate-y-[-50%] duration-150 scale-x-0 scale-y-0 `}
      >
        {children || typeConfirm ? children : <ModalExample />}
        {typeConfirm && (
          <TypeConfirm
            onConfirm={
              onConfirm
                ? onConfirm
                : () => {
                    return
                  }
            }
            typeConfirmWarnIcon={typeConfirmWarnIcon && typeConfirmWarnIcon}
            typeConfirmText={typeConfirmText ? typeConfirmText : ''}
          />
        )}
      </div>
    </>
  )
}

function BlackWrapper({ setModal, modal, unClickable }: CustomModalProp) {
  return (
    <div
      onClick={() => {
        unClickable ? null : setModal(!modal)
      }}
      className={`z-50 fixed w-full h-full bg-[rgba(0,0,0,0.5)] top-0 left-0 duration-150 animate-fade`}
    ></div>
  )
}

function ModalExample({}) {
  return (
    <div className="bg-white rounded-xl w-[500px] h-[300px]">modal示範</div>
  )
}

function TypeConfirm({
  onConfirm,
  typeConfirmWarnIcon,
  typeConfirmText,
}: {
  onConfirm: () => void
  typeConfirmWarnIcon?: boolean
  typeConfirmText: string
}) {
  const button = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (button.current) {
      button.current.focus()
    }
  })
  return (
    <div className="w-[402px] h-[220px] pt-11 bg-white rounded-xl ">
      {/* 標頭 */}
      <div className="flex justify-center items-center mb-8">
        {typeConfirmWarnIcon ? (
          <BsExclamationCircle className="text-[44px] text-highlight mr-4" />
        ) : (
          <BsCheckCircle className="text-[44px] text-secondary mr-4" />
        )}
        <h4 className="text-xl">{typeConfirmText}</h4>
      </div>

      <div className="flex justify-center text-xl space-x-12">
        <button
          ref={button}
          className="text-white bg-primary py-3 px-9 rounded-md focus-visible:outline-secondary"
          onClick={onConfirm}
        >
          確定
        </button>
      </div>
    </div>
  )
}
