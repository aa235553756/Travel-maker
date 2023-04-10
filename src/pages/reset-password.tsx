import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import Image from 'next/image'

type Inputs = {
  pwd: string
  pwdTwice: string
}

// 尚缺alert
export default function ForgotPwd() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm<Inputs>({
    mode: 'onChange',
  })
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  return (
    <div className="container">
      <div className="pt-[44px] pb-[100px] md:pt-[118px] md:pb-[160px] md:flex md:justify-center lg:px-6">
        {/* 這是圖片 */}
        <Image
          width={360}
          height={502}
          src="/reset-password.png"
          alt="圖片"
          className="hidden md:block md:w-1/2 md:min-w-[360px] md:h-full md:mr-10 lg:w-1/3"
        />

        <div className="flex-grow-[1] lg:flex-grow-0 lg:w-1/3">
          <h2 className="text-[26px] md:text-[32px] mb-12 font-bold md:mb-10">
            重新設定密碼
          </h2>

          <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <label className="text-lg md:text-xl mb-6 font-bold md:mb-5">
              重設新密碼
            </label>
            {/* 這是input欄位 */}
            <div className="relative mb-[60px]  md:mb-10">
              <input
                type="password"
                className="w-full input-style focus:outline-none focus:bg-white focus:border-secondary"
                placeholder="請再次輸入密碼"
                {...register('pwd', {
                  required: true,
                  minLength: 8,
                })}
              />
              <br />
              <span>
                {errors.pwd && errors.pwd.type === 'required' && (
                  <span className="absolute text-highlight top-[calc(100%+4px)] left-1">
                    此欄位必填寫
                  </span>
                )}
                {errors.pwd && errors.pwd.type === 'minLength' && (
                  <span className="absolute text-highlight top-[calc(100%+4px)] left-1">
                    密碼至少為八碼
                  </span>
                )}
              </span>
            </div>
            <label className="text-lg  md:text-xl mb-6 font-bold md:mb-5">
              再次輸入密碼
            </label>
            {/* 這是input欄位 */}
            <div className="relative mb-[68px]">
              <input
                type="password"
                className="w-full input-style focus:outline-none focus:bg-white focus:border-secondary"
                placeholder="請輸入Email"
                {...register('pwdTwice', {
                  required: true,
                  validate: (val: string) => {
                    if (watch('pwd') != val) {
                      return 'Your passwords do no match'
                    }
                  },
                })}
              />
              <br />
              <span>
                {errors.pwdTwice && errors.pwdTwice.type === 'required' && (
                  <span className="absolute text-highlight top-[calc(100%+4px)] left-1">
                    此欄位必填寫
                  </span>
                )}
                {errors.pwdTwice && errors.pwdTwice.type === 'validate' && (
                  <span className="absolute text-highlight top-[calc(100%+4px)] left-1">
                    密碼填寫不一致
                  </span>
                )}
              </span>
            </div>
            {/* 這是儲存按鈕 */}
            <div className="mx-auto">
              <button
                className="bg-primary text-white px-9 py-3 rounded-md !text-xl block cursor-pointer mx-auto transition duration-500 ease-in-out hover:bg-primary-tint hover:-translate-y-1 hover:scale-110"
                disabled={!isDirty || !isValid}
              >
                儲存
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
