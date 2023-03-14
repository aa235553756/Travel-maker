import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { FaStarOfLife } from 'react-icons/fa'

export default function LoginAndSignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>()

  interface FormValues {
    email: string
    nickname: string
    password: string
    passwordRepeat: string
  }

  const onSubmit: SubmitHandler<FormValues> = (data) =>
    console.log(JSON.stringify(data))

  // 登入註冊內容切換
  const [isLogin, setIsLogin] = useState(true)
  const loginState = (boolean: boolean) => {
    setIsLogin(boolean)
  }

  // 登入註冊class切換
  const [activeTab, setActiveTab] = useState(1)
  const tabState = (tabIndex: number): void => {
    setActiveTab(tabIndex)
  }

  return (
    <div>
      <div className="container">
        <div>
          <div className="hidden md:flex md:justify-around md:bg-[#ccc] md:w-full md:py-5 mb-20">
            <button
              className={`font-bold ${
                activeTab === 1 ? 'text-black-500' : 'text-gray-200'
              }`}
              onClick={() => {
                loginState(true)
                tabState(1)
              }}
            >
              登入會員
            </button>
            <span>|</span>
            <button
              className={`font-bold ${
                activeTab === 2 ? 'text-black-500' : 'text-gray-200'
              }`}
              onClick={() => {
                loginState(false)
                tabState(2)
              }}
            >
              註冊會員
            </button>
          </div>
          <div className="flex w-full space-x-6">
            <div className="hidden md:block md:w-1/2 min-w-[360px] md:bg-[#ccc]">
              這是圖片
            </div>
            {/* 登入&註冊表單 */}
            {isLogin ? (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full md:w-1/2"
              >
                <h2 className="text-[26px] font-bold md:text-[32px] mb-12 md:mb-10">
                  登入 <span className="font-normal ml-3 md:ml-2">Sign In</span>
                </h2>
                <p className="text-[22px] mb-[42px] md:text-2xl md:mb-10 font-bold">
                  隨機產生您的專屬行程
                </p>

                <div className="flex flex-col space-y-6 md:space-y-5 mb-10">
                  <label htmlFor="emailLogin" className="font-bold text-lg">
                    帳號
                  </label>
                  <input
                    className="border px-3 py-4"
                    id="emailLogin"
                    type="email"
                    placeholder="請輸入 Email"
                    {...register('email', {
                      required: { value: true, message: '此欄位必填寫' },
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: '請填寫正確 Email 格式',
                      },
                    })}
                  />
                  <span className="text-red-900 !mt-2">
                    {errors.email?.message}
                  </span>
                </div>

                <div className="flex flex-col space-y-6 md:space-y-5 mb-4 md:mb-3">
                  <label htmlFor="passwordLogin" className="font-bold text-lg">
                    密碼
                  </label>
                  <input
                    className="border px-3 py-4"
                    id="passwordLogin"
                    type="password"
                    placeholder="請輸入密碼"
                    {...register('password', {
                      required: { value: true, message: '此欄位必填寫' },
                      minLength: { value: 8, message: '密碼至少為 8 碼' },
                    })}
                  />
                  <span className="text-red-900 !mt-2">
                    {errors.password?.message}
                  </span>
                </div>

                <a href="#" className="underline text-sm mb-11 block md:mb-10">
                  忘記密碼?
                </a>

                <input
                  type="submit"
                  value="登入"
                  className="bg-[#ccc] px-16 py-2 block cursor-pointer mx-auto mb-6"
                />
                <button
                  className="underline mx-auto block md:hidden"
                  onClick={() => {
                    loginState(false)
                  }}
                >
                  註冊會員
                </button>
              </form>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full md:w-2/3"
              >
                <h2 className="text-[26px] font-bold md:text-[32px] mb-12 md:mb-10">
                  會員註冊
                  <span className="font-normal ml-3 md:ml-2">Sign Up</span>
                </h2>

                <div className="flex flex-col space-y-6 md:space-y-5 mb-10 md:mb-6">
                  <label
                    htmlFor="email"
                    className="font-bold text-lg flex items-center space-x-1"
                  >
                    <span>帳號</span>
                    <FaStarOfLife className="text-[8px]" />
                  </label>
                  <input
                    className="border px-3 py-4"
                    id="email"
                    type="email"
                    placeholder="請輸入 Email"
                    {...register('email', {
                      required: { value: true, message: '此欄位必填寫' },
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: '請填寫正確 Email 格式',
                      },
                    })}
                  />
                  <span className="text-red-900 !mt-2">
                    {errors.email?.message}
                  </span>
                </div>

                <div className="flex flex-col space-y-6 md:space-y-5 mb-10 md:mb-6">
                  <label
                    htmlFor="nickname"
                    className="font-bold text-lg flex items-center space-x-1"
                  >
                    <span>您的暱稱</span>
                    <FaStarOfLife className="text-[8px]" />
                  </label>
                  <input
                    className="border px-3 py-4"
                    id="nickname"
                    type="text"
                    placeholder="請輸入您的暱稱（最多8字）"
                    {...register('nickname', {
                      required: { value: true, message: '此欄位必填寫' },
                      pattern: {
                        value: /^[A-Za-z]+$/i,
                        message: '請填寫正確暱稱',
                      },
                    })}
                  />
                  <span className="text-red-900 !mt-2">
                    {errors.nickname?.message}
                  </span>
                </div>

                <div className="flex flex-col space-y-6 md:space-y-5 mb-10 md:mb-6">
                  <label
                    htmlFor="password"
                    className="font-bold text-lg flex items-center space-x-1"
                  >
                    <span>密碼</span>
                    <FaStarOfLife className="text-[8px]" />
                  </label>
                  <input
                    className="border px-3 py-4"
                    id="password"
                    type="password"
                    placeholder="請輸入密碼"
                    {...register('password', {
                      required: { value: true, message: '此欄位必填寫' },
                      minLength: { value: 8, message: '密碼至少為 8 碼' },
                    })}
                  />
                  <span className="text-red-900 !mt-2">
                    {errors.password?.message}
                  </span>
                </div>

                <div className="flex flex-col space-y-6 md:space-y-5 mb-10">
                  <label
                    htmlFor="passwordRepeat"
                    className="font-bold text-lg flex items-center space-x-1"
                  >
                    <span>再次輸入密碼</span>
                    <FaStarOfLife className="text-[8px]" />
                  </label>
                  <input
                    className="border px-3 py-4"
                    id="passwordRepeat"
                    type="password"
                    placeholder="請再次輸入密碼"
                    {...register('passwordRepeat', {
                      required: { value: true, message: '此欄位必填寫' },
                      validate: (val) => {
                        if (watch('password') !== val) {
                          return '密碼不一致'
                        }
                      },
                    })}
                  />
                  <span className="text-red-900 !mt-2">
                    {errors.passwordRepeat?.message}
                  </span>
                </div>

                <input
                  type="submit"
                  value="註冊"
                  className="bg-[#ccc] px-16 py-2 block cursor-pointer mx-auto mb-6"
                />
                <button
                  className="underline mx-auto block md:hidden"
                  onClick={() => {
                    loginState(true)
                  }}
                >
                  登入會員
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
