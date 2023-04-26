import { setCookie } from 'cookies-next'
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaStarOfLife } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'
import { loginApi } from '@/util/userApi'
import LoadingAnimate from '@/common/components/LoadingAnimate'
import { CustomModal } from '@/common/components/CustomModal'
import { useRouter } from 'next/router'
import { BsFillCheckCircleFill, BsFillXCircleFill } from 'react-icons/bs'

export interface LoginFormProp {
  Account: string
  Password: string
}

export interface RegisterFormProp {
  Account: string
  UserName?: string
  Password: string
  passwordRepeat?: string
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormProp>()

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    watch: watch2,
    formState: { errors: errors2 },
  } = useForm<RegisterFormProp>()

  const { ref, ...rest } = register('Account', {
    required: { value: true, message: '此欄位必填寫' },
    pattern: {
      value: /^\S+@\S+$/i,
      message: '請填寫正確 Email 格式',
    },
  })

  const { ref: ref2, ...rest2 } = register2('Account', {
    required: { value: true, message: '此欄位必填寫' },
    pattern: {
      value: /^\S+@\S+$/i,
      message: '請填寫正確 Email 格式',
    },
  })

  // 登入註冊內容切換
  const [isLogin, setIsLogin] = useState(true)

  // 登入註冊class切換
  const [activeTab, setActiveTab] = useState(1)

  const [isLoading, setIsLoading] = useState(false)

  const [loginSuccess, setloginSuccess] = useState(false)
  // For Modal icon
  const [success, setSuccess] = useState(true)
  const [modalText, setModalText] = useState('登入成功，自動跳轉...')

  const loginAccountRef = useRef<HTMLInputElement | null>(null)
  const registerAccountRef = useRef<HTMLInputElement | null>(null)

  const router = useRouter()

  useEffect(() => {
    loginAccountRef?.current?.focus()
    registerAccountRef?.current?.focus()
  }, [isLogin])

  return (
    <div>
      <CustomModal modal={loginSuccess} setModal={setloginSuccess} wrapper>
        <div className="w-[408px] h-[288px] bg-white flex flex-col justify-center items-center space-y-6 rounded-xl">
          {success ? (
            <BsFillCheckCircleFill className="text-[64px] text-[#74C041]" />
          ) : (
            <BsFillXCircleFill className="text-[64px] text-highlight" />
          )}
          <p className="text-2xl">{modalText}</p>
        </div>
      </CustomModal>

      {isLoading ? <LoadingAnimate isLoading={isLoading} /> : null}

      <div className="container">
        <div className="md:w-full lg:w-2/3 md:mx-auto">
          {/* 這是 Tab 按鈕 */}
          <div className="hidden md:flex md:justify-around md:bg-primary md:w-full md:py-5 md:mt-20">
            <button
              className={`w-1/2 font-bold border-r-[1px] border-white ${
                activeTab === 1 ? 'text-white' : 'text-primary-dark'
              }`}
              onClick={() => {
                setIsLogin(true)
                setActiveTab(1)
              }}
            >
              登入會員
            </button>
            <button
              className={`w-1/2 font-bold ${
                activeTab === 2 ? 'text-white' : 'text-primary-dark'
              }`}
              onClick={() => {
                setIsLogin(false)
                setActiveTab(2)
              }}
            >
              註冊會員
            </button>
          </div>
          {/* 登入&註冊表單 */}
          {isLogin ? (
            <div className="flex space-x-0 md:space-x-6 mb-[100px] md:mb-[160px]">
              <Image
                width={360}
                height={472}
                src="/signIn.png"
                alt="圖片"
                className="hidden md:block md:w-1/2 md:min-w-[360px] md:h-full md:mt-[60px]"
                priority
              />
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full md:w-1/2 mt-12 md:mt-[80px]"
              >
                <h2 className="text-[26px] font-bold md:text-[32px] mb-12 md:mb-10">
                  登入
                  <span className="font-normal ml-2 text-gray-A8">Sign In</span>
                </h2>
                <p className="text-[22px] mb-10 md:text-2xl">
                  隨機產生您的專屬行程
                </p>

                <div className="flex flex-col space-y-6 md:space-y-5 mb-10">
                  <label htmlFor="emailLogin" className="font-bold text-lg">
                    帳號
                  </label>
                  <input
                    className="input-style focus:outline-none focus:bg-white focus:border-secondary"
                    id="emailLogin"
                    type="email"
                    placeholder="請輸入 Email"
                    key={1}
                    {...rest}
                    ref={(e) => {
                      ref(e)
                      loginAccountRef.current = e
                    }}
                  />
                  <span className="text-highlight !mt-2">
                    {errors.Account?.message}
                  </span>
                </div>

                <div className="flex flex-col space-y-6 md:space-y-5 mb-4 md:mb-3">
                  <label htmlFor="passwordLogin" className="font-bold text-lg">
                    密碼
                  </label>
                  <input
                    className="input-style focus:outline-none focus:bg-white focus:border-secondary"
                    id="passwordLogin"
                    type="password"
                    placeholder="請輸入密碼"
                    key={2}
                    {...register('Password', {
                      required: { value: true, message: '此欄位必填寫' },
                    })}
                  />
                  <span className="text-highlight !mt-2">
                    {errors.Password?.message}
                  </span>
                </div>

                <Link href="/forgot-password">
                  <p className="underline text-sm mb-9 block transition duration-500 hover:text-gray-64 md:mb-10">
                    忘記密碼?
                  </p>
                </Link>

                <input
                  type="submit"
                  value="登入"
                  className="bg-primary text-white px-9 py-3 rounded-md !text-xl block cursor-pointer mx-auto mb-6 transition duration-500 ease-in-out hover:bg-primary-tint hover:-translate-y-1 hover:scale-110 md:mb-0"
                />
                <button
                  className="underline mx-auto block transition duration-500 hover:text-gray-64 md:hidden"
                  onClick={() => {
                    setIsLogin(false)
                  }}
                >
                  註冊會員
                </button>
              </form>
            </div>
          ) : (
            <div className="flex w-full space-x-0 md:space-x-6 mb-[100px] md:mb-[160px]">
              <Image
                width={360}
                height={472}
                src="/signUp.png"
                alt="圖片"
                className="hidden md:block md:w-1/2 md:min-w-[360px] md:h-full md:mt-[172px]"
              />
              <form
                onSubmit={handleSubmit2(onSubmit2)}
                className="w-full md:w-1/2 mt-12 md:mt-[80px]"
              >
                <h2 className="text-[26px] font-bold md:text-[32px] mb-12 md:mb-10">
                  會員註冊
                  <span className="font-normal text-gray-A8 ml-3 md:ml-2">
                    Sign Up
                  </span>
                </h2>

                <div className="flex flex-col space-y-6 md:space-y-5 mb-8 md:mb-6">
                  <label
                    htmlFor="email"
                    className="font-bold text-lg flex items-center space-x-1"
                  >
                    <span>帳號</span>
                    <FaStarOfLife className="text-[8px] text-highlight" />
                  </label>
                  <input
                    className="input-style focus:outline-none focus:bg-white focus:border-secondary"
                    id="email"
                    type="email"
                    placeholder="請輸入 Email"
                    {...rest2}
                    ref={(e) => {
                      ref2(e)
                      registerAccountRef.current = e
                    }}
                    // {...register2('Account', {
                    //   required: { value: true, message: '此欄位必填寫' },
                    //   pattern: {
                    //     value: /^\S+@\S+$/i,
                    //     message: '請填寫正確 Email 格式',
                    //   },
                    // })}
                  />
                  <span className="text-highlight !mt-2">
                    {errors2.Account?.message}
                  </span>
                </div>

                <div className="flex flex-col space-y-6 md:space-y-5 mb-8 md:mb-6">
                  <label
                    htmlFor="UserName"
                    className="font-bold text-lg flex items-center space-x-1"
                  >
                    <span>您的暱稱</span>
                    <FaStarOfLife className="text-[8px] text-highlight" />
                  </label>
                  <input
                    className="input-style focus:outline-none focus:bg-white focus:border-secondary"
                    id="UserName"
                    type="text"
                    placeholder="請輸入您的暱稱（最多8字）"
                    {...register2('UserName', {
                      required: { value: true, message: '此欄位必填寫' },
                      pattern: {
                        value: /^([\u4E00-\u9FFF]|\w){2,8}$/,
                        message: '請填寫正確暱稱',
                      },
                    })}
                  />
                  <span className="text-highlight !mt-2">
                    {errors2.UserName?.message}
                  </span>
                </div>

                <div className="flex flex-col space-y-6 md:space-y-5 mb-8 md:mb-6">
                  <label
                    htmlFor="password"
                    className="font-bold text-lg flex items-center space-x-1"
                  >
                    <span>密碼</span>
                    <FaStarOfLife className="text-[8px] text-highlight" />
                  </label>
                  <input
                    className="input-style focus:outline-none focus:bg-white focus:border-secondary"
                    id="password"
                    type="password"
                    placeholder="請輸入密碼"
                    {...register2('Password', {
                      required: { value: true, message: '此欄位必填寫' },
                      minLength: { value: 8, message: '密碼至少為 8 碼' },
                    })}
                  />
                  <span className="text-highlight !mt-2">
                    {errors2.Password?.message}
                  </span>
                </div>

                <div className="flex flex-col space-y-6 md:space-y-5 mb-12">
                  <label
                    htmlFor="passwordRepeat"
                    className="font-bold text-lg flex items-center space-x-1"
                  >
                    <span>再次輸入密碼</span>
                    <FaStarOfLife className="text-[8px] text-highlight" />
                  </label>
                  <input
                    className="input-style focus:outline-none focus:bg-white focus:border-secondary"
                    id="passwordRepeat"
                    type="password"
                    placeholder="請再次輸入密碼"
                    {...register2('passwordRepeat', {
                      required: { value: true, message: '此欄位必填寫' },
                      validate: (val) => {
                        if (watch2('Password') !== val) {
                          return '密碼不一致'
                        }
                      },
                    })}
                  />
                  <span className="text-highlight !mt-2">
                    {errors2.passwordRepeat?.message}
                  </span>
                </div>

                <input
                  type="submit"
                  value="註冊"
                  className="bg-primary text-white px-9 py-3 rounded-md !text-xl block cursor-pointer mx-auto mb-6 transition duration-500 ease-in-out hover:bg-primary-tint hover:-translate-y-1 hover:scale-110 md:mb-0"
                />
                <button
                  type="button"
                  className="underline mx-auto block transition duration-500 hover:text-gray-64 md:hidden"
                  onClick={() => {
                    setIsLogin(true)
                  }}
                >
                  登入會員
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  // 登入
  async function onSubmit(data: LoginFormProp) {
    try {
      setIsLoading(true)
      // travel_maker login
      const res = await loginApi(data)

      // 登入成功,user data,設cookies,跳轉回上一頁
      if (res.ok) {
        const resJSON = await res.json()
        setIsLoading(false)
        setloginSuccess(true)
        setSuccess(true)
        setModalText('登入成功，自動跳轉中...')
        setTimeout(() => {
          setloginSuccess(false)
        }, 2000)
        setCookie('auth', 'Bearer ' + resJSON.JwtToken, {
          maxAge: 60 * 60 * 24 * 7,
        })
        setCookie('user', JSON.stringify(resJSON), { maxAge: 60 * 60 * 24 * 7 })
        console.log(router)

        setTimeout(() => {
          router.back()
        }, 2000)
        return
      }

      // {"Message":"帳號或密碼有誤"} {"Message":"此帳號為被註冊"}
      if (res.status === 400) {
        setIsLoading(false)
        setloginSuccess(true)
        setSuccess(false)
        setModalText('登入失敗，帳號或密碼有誤')
        setTimeout(() => {
          setloginSuccess(false)
        }, 2000)
        loginAccountRef?.current?.focus()
        return
      }

      throw new Error('不知名錯誤')
    } catch (err) {
      alert('網路連線異常' + err)
      setIsLoading(false)
    }
  }
  // 註冊
  async function onSubmit2(data: RegisterFormProp) {
    try {
      setIsLoading(true)
      const newData = {
        Account: data.Account,
        Password: data.Password,
        UserName: data.UserName,
      }

      // travel_maker login
      const res = await fetch(
        'https://travelmaker.rocket-coding.com/api/users/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newData),
        }
      )

      setIsLoading(true)
      // 註冊成功,切換到登入頁面,提醒重新登入
      if (res.ok) {
        setIsLoading(false)
        setloginSuccess(true)
        setSuccess(true)
        setModalText('註冊成功，請重新登入')
        setTimeout(() => {
          setloginSuccess(false)
        }, 2000)
        setActiveTab(1)
        setIsLogin(true)

        loginAccountRef?.current?.focus()
        return
      }

      // {"Message":"此帳號已註冊"}
      if (res.status === 400) {
        setIsLoading(false)
        setloginSuccess(true)
        setSuccess(false)
        setModalText('註冊失敗，信箱已註冊過')
        setTimeout(() => {
          setloginSuccess(false)
        }, 2000)
        registerAccountRef?.current?.focus()
        return
      }

      throw new Error('不知名錯誤')
    } catch (err) {
      alert('網路連線異常' + err)
      setIsLoading(false)
    }
  }
}
