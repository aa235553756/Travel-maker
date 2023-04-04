import Link from 'next/link'
import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

type Inputs = {
  email: string
}

// 尚缺alert
export default function ForgotPwd() {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<Inputs>({
    mode: 'onChange',
  })
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  return (
    <div className="container">
      <div className="pt-[44px] pb-[100px] md:flex md:justify-center lg:px-6">
        {/* 這是圖片 */}
        <div className="bg-gray-D9 min-w-[360px] mr-6 hidden lg:w-1/3 md:block">
          我是圖片
        </div>
        <div className="flex-grow-[1] lg:flex-grow-0 lg:w-1/3">
          <h2 className="text-[26px] md:text-[32px] mb-12 font-bold md:mb-10">
            忘記密碼？
          </h2>
          <h3 className="text-xl lg:text-[24px] mb-10 font-bold md:mb-10">
            將寄出重設密碼至你的信箱
          </h3>
          <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <label className="text-lg md:text-xl mb-6 font-bold md:mb-5">
              電子信箱
            </label>
            {/* 這是input欄位 */}
            <div className="relative mb-[60px]  md:mb-[80px]">
              <input
                type="text"
                className="w-full px-3 py-4 bg-[#FAFAFA]  focus-visible:outline-red-600"
                placeholder="請輸入Email"
                {...register('email', {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
              />
              <br />
              <span>
                {errors.email && errors.email.type === 'required' && (
                  <span className="absolute text-red-400 top-[calc(100%+4px)] left-1">
                    此欄位必填寫
                  </span>
                )}
                {errors.email && errors.email.type === 'pattern' && (
                  <span className="absolute text-red-400 top-[calc(100%+4px)] left-1">
                    請填入正確的 Email 格式
                  </span>
                )}
              </span>
            </div>
            {/* 這是送出按鈕 */}
            <div className="mx-auto mb-6 md:mb-8">
              <button
                className="text-[20px] px-16 py-2 bg-gray-73 text-white disabled:opacity-50"
                disabled={!isDirty || !isValid}
              >
                送出
              </button>
            </div>
            <div className="mx-auto">
              <Link
                href="/"
                className="inline-block text-[20px] px-16 py-2 border border-gray-73"
              >
                返回
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
