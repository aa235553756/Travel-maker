import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

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
      <div className="pt-[44px] pb-[100px] md:flex md:justify-center lg:px-6">
        {/* 這是圖片 */}
        <div className="bg-[#D9D9D9] min-w-[360px] mr-6 hidden lg:w-1/3 md:block">
          我是圖片
        </div>
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
                type="text"
                className="w-full px-3 py-4 bg-[#FAFAFA]  focus-visible:outline-red-600"
                placeholder="請再次輸入密碼"
                {...register('pwd', {
                  required: true,
                  minLength: 8,
                })}
              />
              <br />
              <span>
                {errors.pwd && errors.pwd.type === 'required' && (
                  <span className="absolute text-red-400 top-[calc(100%+4px)] left-1">
                    此欄位必填寫
                  </span>
                )}
                {errors.pwd && errors.pwd.type === 'minLength' && (
                  <span className="absolute text-red-400 top-[calc(100%+4px)] left-1">
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
                type="text"
                className="w-full px-3 py-4 bg-[#FAFAFA]  focus-visible:outline-red-600"
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
                  <span className="absolute text-red-400 top-[calc(100%+4px)] left-1">
                    此欄位必填寫
                  </span>
                )}
                {errors.pwdTwice && errors.pwdTwice.type === 'validate' && (
                  <span className="absolute text-red-400 top-[calc(100%+4px)] left-1">
                    密碼填寫不一致
                  </span>
                )}
              </span>
            </div>
            {/* 這是儲存按鈕 */}
            <div className="mx-auto">
              <button
                className="text-[20px] px-16 py-2 bg-[#737373] text-white disabled:opacity-50"
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
