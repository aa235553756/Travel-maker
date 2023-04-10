import Link from 'next/link'
import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import Image from 'next/image'

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
      <div className="pt-[44px] pb-[100px] md:py-[160px] md:flex md:justify-center lg:px-6">
        {/* 這是圖片 */}
        <Image
          width={360}
          height={502}
          src="/forgot-password.png"
          alt="圖片"
          className="hidden md:block md:w-1/2 md:min-w-[360px] md:h-full md:mr-10 lg:w-1/3"
        />

        <div className="flex-grow-[1] lg:flex-grow-0 lg:w-1/3">
          <h2 className="text-[26px] md:text-[32px] mb-12 font-bold md:mb-10">
            忘記密碼？
          </h2>
          <h3 className="text-xl lg:text-[24px] mb-10 md:mb-10">
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
                className="w-full input-style focus:outline-none focus:bg-white focus:border-secondary"
                placeholder="請輸入Email"
                {...register('email', {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
              />
              <br />
              <span>
                {errors.email && errors.email.type === 'required' && (
                  <span className="absolute text-highlight top-[calc(100%+4px)] left-1">
                    此欄位必填寫
                  </span>
                )}
                {errors.email && errors.email.type === 'pattern' && (
                  <span className="absolute text-highlight top-[calc(100%+4px)] left-1">
                    請填入正確的 Email 格式
                  </span>
                )}
              </span>
            </div>
            {/* 這是送出按鈕 */}
            <div className="mx-auto">
              <button
                className="bg-primary text-white px-9 py-3 rounded-md !text-xl block cursor-pointer mx-auto mb-6 transition duration-500 ease-in-out hover:bg-primary-tint hover:-translate-y-1 hover:scale-110 md:mb-8"
                disabled={!isDirty || !isValid}
              >
                送出
              </button>
            </div>
            <div className="mx-auto">
              <Link
                href="/login"
                className="text-primary border-primary border-[1px] px-9 py-3 rounded-md !text-xl block cursor-pointer mx-auto transition duration-500 ease-in-out hover:bg-gray-E7"
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
