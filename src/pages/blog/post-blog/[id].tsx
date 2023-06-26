import React, { useRef, useState } from 'react'
import { getCookie } from 'cookies-next'
import Image from 'next/image'
import TypeTag from '@/common/components/TypeTag'
import { BsGeoAltFill, BsImage, BsPlusCircleDotted } from 'react-icons/bs'
import { useRouter } from 'next/router'
import ImageUploading, { ImageListType } from 'react-images-uploading'
import { MdOutlineCancel } from 'react-icons/md'
import { BasicButton } from '@/common/components/button/BasicBtn'
import { saveBlogApi } from '@/util/blogApi'
import { CustomModal } from '@/common/components/CustomModal'
import LoadingAnimate from '@/common/components/LoadingAnimate'

interface BlogAttractionProp {
  AttractionName: string
  AttractionId: number
  ImageUrl: string[]
  Description: string
}

interface BlogData {
  Title: string
  Cover: string | null
  Category: string[]
  Status: number
  BlogAttractionList: BlogAttractionProp[]
  BlogGuid?: string
}

export default function PostBlog({ data }: { data: BlogData }) {
  const router = useRouter()
  const { id } = useRouter().query
  // =========react-images-uploading=========
  // 由於這邊是用陣列渲染，所以判斷是否有coer，有->[{data_url}]，沒有->空陣列
  const [cover, setCover] = useState<ImageListType>(
    data.Cover !== '' ? [{ data_url: data.Cover }] : []
  )
  const [cateGory, setCateGory] = useState(data.Category)
  const [imageAry, setImageAry] = useState<ImageListType[]>(
    data.BlogAttractionList.map((BlogAttraction: BlogAttractionProp) => {
      return BlogAttraction.ImageUrl[0]
        ? [
            {
              data_url: BlogAttraction.ImageUrl[0],
            },
          ]
        : []
    })
  )
  // 圖片最大數量
  const maxNumber = 3

  // =========輸入框 Ref=========
  const titleRef = useRef<HTMLInputElement>(null)

  const textRefAry = useRef(
    data.BlogAttractionList.map(React.createRef<HTMLTextAreaElement>)
  )

  const types = [
    '城市走走',
    '拍照聖地',
    '夜間首選',
    '親子互動',
    '文藝青年',
    '冒險活潑',
  ]

  const [modal, setModal] = useState(false)
  const [modalText, setModalText] = useState('儲存成功')
  const [isLoading, setIsLoading] = useState(false)

  return (
    <>
      {/* Modal */}
      <CustomModal
        modal={modal}
        setModal={setModal}
        typeConfirm
        typeConfirmText={modalText}
        onConfirm={() => setModal(!modal)}
      />
      {/* loading */}
      <LoadingAnimate isLoading={isLoading} />
      {/* 封面 */}
      <ImageUploading
        value={cover}
        maxNumber={maxNumber}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onChange={(imageList, addUpdateIndex) => {
          setCover(imageList)
          return
        }}
        dataURLKey="data_url"
      >
        {({ dragProps, isDragging, onImageUpload, onImageRemoveAll }) => (
          // write your building UI
          <div
            className={`relative w-full mx-auto md:w-full lg:mt-7 lg:w-2/3 lg:rounded-md ${
              isDragging && 'opacity-50'
            } duration-150 active:opacity-50 group cursor-pointer`}
          >
            {/* 漸層工具列 */}
            {cover[0] && (
              <div className="w-full absolute top-0 left-0 h-[60px] bg-gradient-to-b from-[rgba(15,11,11,1)] to-[rgba(2,0,0,0)] lg:rounded-t-md z-20"></div>
            )}

            {/* 刪除cover */}
            {cover[0] && (
              <button
                className="absolute top-2 right-2 z-20 text-primary-tint hover:text-highlight"
                onClick={onImageRemoveAll}
              >
                <MdOutlineCancel className="text-3xl" />
              </button>
            )}

            <div
              className="w-full h-[300px] md:h-[372px] md:min-h-[372px] bg-gray-F4 mb-8 lg:rounded-md relative"
              {...dragProps}
              onClick={onImageUpload}
            >
              {cover[0] && (
                <Image
                  src={cover[0]['data_url']}
                  alt="圖片"
                  width={744}
                  height={372}
                  className="w-full h-[300px] md:h-[372px] md:min-h-[372px] mx-auto relative object-cover lg:rounded-md hover:opacity-50 active:opacity-50 duration-150"
                  priority
                ></Image>
              )}

              {cover[0] ? null : (
                <button
                  className={`absolute top-1/2 left-1/2 flex items-center translate-x-[-50%] translate-y-[-50%] border bg-gray-D9 group-hover:bg-primary group-hover:text-white group-hover:shadow-[0px_4px_16px_0px_rgba(0,0,0,0.25)] px-4 py-2 cursor-pointer rounded-md duration-150
                  ${
                    isDragging &&
                    'bg-primary text-white shadow-[0px_4px_16px_0px_rgba(0,0,0,0.25)]'
                  }
                  `}
                >
                  <BsImage className="text-xl mr-2" />
                  上傳封面
                </button>
              )}
            </div>
          </div>
        )}
      </ImageUploading>
      <div className="container">
        <div className="md:pt-7 pb-[100px] lg:pb-[160px]">
          <div className="w-full mx-auto lg:w-1/2">
            <div className="flex flex-col space-y-8 mb-[72px]">
              {/* 遊記標題 */}
              <div className="flex flex-col space-y-4">
                <label className="text-lg" htmlFor="title">
                  遊記的標題
                </label>
                <input
                  id="title"
                  type="text"
                  ref={titleRef}
                  defaultValue={data.Title}
                  className="border px-3 py-4 bg-gray-F4 font-bold focus:outline-none rounded-md  focus:shadow-md"
                  placeholder="請輸入遊記標題"
                />
              </div>

              {/* 遊記類別 */}
              <div className="flex flex-col space-y-4">
                <label className="text-lg">類別</label>
                <div className="flex flex-wrap  items-center">
                  {cateGory.length ? (
                    cateGory.map((item, i) => {
                      return (
                        <button
                          key={i}
                          className="mr-3 mb-2 active:scale-90  duration-100 relative group"
                          onClick={changeTypeTag(i)}
                        >
                          <MdOutlineCancel
                            className="md:hidden group-hover:block text-lg absolute -right-1 -top-1 bg-white text-primary hover:text-highlight active:text-primary-dark"
                            onClick={removeTypeTag(i)}
                          />
                          <TypeTag type={item} />
                        </button>
                      )
                    })
                  ) : (
                    <div className="min-h-[38px]"></div>
                  )}
                  {/* 加號 增加類別 */}
                  {cateGory.length !== 6 ? (
                    <span onClick={addTypeTag()}>
                      <BsPlusCircleDotted className="ml-2 mb-2 min-h-[38px] cursor-pointer text-primary hover:text-secondary text-lg active:text-primary-dark" />
                    </span>
                  ) : null}
                </div>
              </div>
            </div>

            {/* 單一景點 */}
            <div className="flex flex-col space-y-10">
              {data.BlogAttractionList.map(
                (item: BlogAttractionProp, i: number) => {
                  return (
                    <div key={i} className="flex flex-col space-y-4">
                      <div className="flex justify-between space-x-2">
                        <div className="flex items-center space-x-2">
                          <BsGeoAltFill className="text-highlight" />
                          <span className="text-lg">{item.AttractionName}</span>
                        </div>
                      </div>
                      {/* 判斷有幾張,顯示不同UI */}
                      <div className="min-h-[132px] rounded-md">
                        {/*  hover:opacity-50 active:opacity-50 */}
                        {/* 第一層景點 */}
                        <ImageUploading
                          multiple
                          value={imageAry[i]}
                          onChange={(imageList, addUpdateIndex) => {
                            // data for submit
                            setImageAry(() => {
                              const newData = [...imageAry]
                              newData[i] = imageList

                              return newData
                            })
                          }}
                          maxNumber={maxNumber}
                          dataURLKey="data_url"
                        >
                          {({
                            imageList,
                            onImageUpload,
                            onImageUpdate,
                            onImageRemove,
                            isDragging,
                            dragProps,
                          }) => (
                            // write your building UI
                            <>
                              {imageList.length === 0 && (
                                <div
                                  className="min-h-[134px] rounded-md bg-gray-F4 block relative cursor-pointer group"
                                  onClick={onImageUpload}
                                  {...dragProps}
                                >
                                  <button
                                    className={`absolute top-1/2 left-1/2 flex items-center translate-x-[-50%] translate-y-[-50%] border bg-gray-D9 group-hover:bg-primary group-hover:text-white group-hover:shadow-[0px_4px_16px_0px_rgba(0,0,0,0.25)] px-4 py-2 cursor-pointer rounded-md duration-150 ${
                                      isDragging &&
                                      'bg-primary text-white shadow-[0px_4px_16px_0px_rgba(0,0,0,0.25)]'
                                    }`}
                                  >
                                    <BsImage className="text-xl mr-2" />
                                    上傳圖片{' '}
                                    <sub className="ml-1 mb-1">(最多三張)</sub>
                                  </button>
                                </div>
                              )}
                              {/* 只有一張原本照片 或是 selectData含有一張 */}
                              {imageList.length === 1 && (
                                <div className="w-full rounded-md cursor-pointer relative min-h-[134px]">
                                  <Image
                                    src={imageList[0]['data_url']}
                                    alt="圖片"
                                    width={264}
                                    height={132}
                                    className="w-full object-cover h-full rounded-md max-h-[132px] hover:opacity-50 border duration-150"
                                    onClick={() => onImageUpdate(0)}
                                  ></Image>
                                  {/* 刪除 */}
                                  <button
                                    className="absolute top-1 right-1 z-20 text-primary-tint hover:text-highlight"
                                    onClick={() => onImageRemove(0)}
                                  >
                                    <MdOutlineCancel className="text-3xl" />
                                  </button>
                                </div>
                              )}
                              {imageList.length === 2 && (
                                <div className="flex-wrap space-y-6 lg:flex lg:flex-row lg:space-x-6 lg:space-y-0">
                                  <div className="w-full lg:w-[calc(50%-12px)] rounded-md object-cover border cursor-pointer relative">
                                    <Image
                                      src={imageList[0]['data_url']}
                                      alt="圖片"
                                      width={264}
                                      height={132}
                                      className="w-full object-cover h-full max-h-[132px] hover:opacity-50 active:opacity-50 duration-150"
                                      onClick={() => onImageUpdate(0)}
                                    ></Image>
                                    {/* 刪除 */}
                                    <button
                                      className="absolute top-1 right-1 z-20 text-primary-tint hover:text-highlight"
                                      onClick={() => onImageRemove(0)}
                                    >
                                      <MdOutlineCancel className="text-3xl" />
                                    </button>
                                  </div>
                                  <div className="w-full lg:w-[calc(50%-12px)] rounded-md object-cover border cursor-pointer relative">
                                    <Image
                                      src={imageList[1]['data_url']}
                                      alt="圖片"
                                      width={264}
                                      height={132}
                                      className="w-full object-cover h-full max-h-[132px] hover:opacity-50 active:opacity-50 duration-150"
                                      onClick={() => onImageUpdate(1)}
                                    ></Image>
                                    {/* 刪除 */}
                                    <button
                                      className="absolute top-1 right-1 z-20 text-primary-tint hover:text-highlight"
                                      onClick={() => onImageRemove(1)}
                                    >
                                      <MdOutlineCancel className="text-3xl" />
                                    </button>
                                  </div>
                                </div>
                              )}
                              {imageList.length === 3 && (
                                <div className="flex-wrap lg:flex-nowrap space-y-6 lg:flex lg:flex-row lg:space-x-6 lg:space-y-0">
                                  <div className="w-full lg:w-1/3 rounded-md object-cover border cursor-pointer relative">
                                    <Image
                                      src={imageList[0]['data_url']}
                                      alt="圖片"
                                      width={264}
                                      height={132}
                                      className="w-full object-cover h-full max-h-[132px] hover:opacity-50 active:opacity-50 duration-150 rounded-md"
                                      onClick={() => onImageUpdate(0)}
                                    ></Image>
                                    {/* 刪除 */}
                                    <button
                                      className="absolute top-1 right-1 z-20 text-primary-tint hover:text-highlight"
                                      onClick={() => onImageRemove(0)}
                                    >
                                      <MdOutlineCancel className="text-3xl" />
                                    </button>
                                  </div>
                                  <div className="w-full lg:w-1/3 rounded-md object-cover border cursor-pointer relative">
                                    <Image
                                      src={imageList[1]['data_url']}
                                      alt="圖片"
                                      width={264}
                                      height={132}
                                      className="w-full object-cover h-full max-h-[132px] hover:opacity-50 active:opacity-50 duration-150 rounded-md"
                                      onClick={() => onImageUpdate(1)}
                                    ></Image>
                                    {/* 刪除 */}
                                    <button
                                      className="absolute top-1 right-1 z-20 text-primary-tint hover:text-highlight"
                                      onClick={() => onImageRemove(1)}
                                    >
                                      <MdOutlineCancel className="text-3xl" />
                                    </button>
                                  </div>
                                  <div className="w-full lg:w-1/3 rounded-md object-cover border cursor-pointer relative">
                                    <Image
                                      src={imageList[2]['data_url']}
                                      alt="圖片"
                                      width={264}
                                      height={132}
                                      className="w-full object-cover h-full max-h-[132px] hover:opacity-50 active:opacity-50 duration-150 rounded-md"
                                      onClick={() => onImageUpdate(2)}
                                    ></Image>
                                    {/* 刪除 */}
                                    <button
                                      className="absolute top-1 right-1 z-20 text-primary-tint hover:text-highlight"
                                      onClick={() => onImageRemove(2)}
                                    >
                                      <MdOutlineCancel className="text-3xl" />
                                    </button>
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                        </ImageUploading>
                      </div>

                      {/* 輸入內容 */}
                      <textarea
                        ref={textRefAry.current[i]}
                        name="blogContent"
                        cols={30}
                        rows={10}
                        className="p-3 w-full bg-gray-F4 rounded-md focus:outline-none focus:shadow-md"
                        placeholder="請輸入內容"
                        style={{ resize: 'none' }}
                      ></textarea>
                    </div>
                  )
                }
              )}
            </div>

            {/* 按鈕們 */}
            <div className="flex justify-end space-x-6 mt-[40px]">
              <BasicButton onClick={saveBlog} text={'儲存'} border />
              <BasicButton onClick={releaseBlog} text={'發布'} />
            </div>
          </div>
        </div>
      </div>
    </>
  )

  function addTypeTag(): React.MouseEventHandler<HTMLSpanElement> | undefined {
    return () => {
      setCateGory(() => {
        const newData = [...cateGory]

        // ===隨機亂數賦予新的type===
        while (true) {
          const random_number = Math.floor(Math.random() * 6)
          const newType = types[random_number]
          if (!newData.includes(newType)) {
            newData.push(newType)
            break
          }
        }
        return newData
      })
    }
  }

  function removeTypeTag(
    i: number
  ): React.MouseEventHandler<SVGElement> | undefined {
    return (e) => {
      e.stopPropagation()
      setCateGory(() => {
        const newData = [...cateGory]
        newData.splice(i, 1)
        return newData
      })
    }
  }

  function changeTypeTag(
    i: number
  ): React.MouseEventHandler<HTMLButtonElement> | undefined {
    return () => {
      if (cateGory.length === 6) return
      setCateGory(() => {
        const newData = [...cateGory]

        // ===隨機亂數賦予新的type===
        while (true) {
          const random_number = Math.floor(Math.random() * 6)
          const newType = types[random_number]
          if (!newData.includes(newType)) {
            newData[i] = newType
            break
          }
        }

        return newData
      })
    }
  }

  async function saveBlog() {
    // ======判斷有無token===
    const token = getCookie('auth')
    if (!token) {
      alert('請重新登入')
      return
    }

    // ======判斷一定要有標題=====
    if (titleRef.current?.value === '') {
      alert('請填寫標題')
      return
    }

    // ======複製data，開始準備資料，以及data Guid======
    const newData = { ...data }
    newData.BlogGuid = String(id)

    // =====重設定data類別======
    newData.Category = cateGory.length ? cateGory : ['隨心所欲']

    // ======replace網址,不然後端會存到像是"httphttp"格式======
    const httpUrl = 'https://travelmaker.rocket-coding.com/upload/blogImage/'

    // ======重設定data中cover圖片(的key名字)======
    const coverImageAry = cover
      .map((cover) => {
        // 包含http嗎，有->放http.jpg，沒有->放file name
        if (!cover['data_url'].includes(httpUrl)) {
          return String(cover?.file?.name)
        } else {
          return String(cover['data_url']?.replace(httpUrl, ''))
        }
      })
      .join()
    newData.Cover = coverImageAry !== '' ? coverImageAry : null

    // ======重設定data景點圖片(的key名字)======
    newData.BlogAttractionList.map(
      (item: { ImageUrl: string[] }, i: number) => {
        // 宣告圖片陣列改為圖片名稱陣列 並賦值到newData景點中 => 將newData中景點圖片陣列改為圖片名稱陣列
        const ImageNameAry = imageAry[i].map((images) => {
          // 包含http嗎，有->放http.jpg，沒有->放file name
          if (!images['data_url'].includes(httpUrl)) {
            return String(images?.file?.name)
          } else {
            return String(images['data_url']?.replace(httpUrl, ''))
          }
        })
        item.ImageUrl = ImageNameAry
        return item
      }
    )

    // ======標題文字 & 景點文字======
    if (titleRef.current?.value !== undefined) {
      newData.Title = titleRef.current?.value
    }
    newData.BlogAttractionList.map((item, i) => {
      item.Description = String(textRefAry.current[i].current?.value)
      return item
    })

    // ======新建formData======
    const formData = new FormData()
    formData.append('BlogData', JSON.stringify(newData))
    // ======有新的cover嗎 有->設定fromData的cover(的key,value,名字)======
    cover[0]?.file
      ? formData.append('Image', cover[0].file, cover[0].file.name)
      : null
    // ======有新的景點圖片嗎 有->設定fromData的景點圖片(的key,value,名字)======
    imageAry.map((images) => {
      images.map((imageListType) => {
        if (imageListType.file) {
          formData.append('Image', imageListType.file, imageListType.file.name)
        }
      })
    })

    // ======打API======
    try {
      const myHeaders = new Headers()
      if (token !== undefined) {
        myHeaders.append('Authorization', String(token))
      }

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formData,
      }

      setIsLoading(true)
      // saveBlogApi
      await saveBlogApi(requestOptions)
      setModal(true)
      setModalText('已儲存編輯內容')

      // router.push(`/blog/post-blog/${id}`)
    } catch (err) {
      alert('網路連線異常')
      return 404
    } finally {
      setIsLoading(false)
    }
  }

  async function releaseBlog() {
    // ======判斷有無token===
    const token = getCookie('auth')
    if (!token) {
      alert('請重新登入')
      return
    }

    // ======判斷圖片是否全數設置好，並警告用戶======
    let isImageAllSet = true
    for (let i = 0; i < imageAry.length; i++) {
      if (!imageAry[i].length) {
        isImageAllSet = false
        break
      }
    }
    if (!isImageAllSet || !cover[0]?.['data_url']) {
      alert('請填滿圖片，內容可留空')
      return
    }

    try {
      setIsLoading(true)
      // 先執行儲存blog函式
      const saveBlogStatus = await saveBlog()
      setModal(false)
      if (saveBlogStatus === 404) {
        return
      }

      const myHeaders = new Headers()
      if (token !== undefined) {
        myHeaders.append('Authorization', String(token))
      }

      const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
      }

      const res = await fetch(
        `https://travelmaker.rocket-coding.com/api/blogs/release/${id}`,
        requestOptions
      )

      if (res.status === 400) {
        alert('此遊記已發布')
      }

      if (res.status === 200) {
        setModal(true)
        setModalText('成功發佈，自動跳轉中...')
      }

      setTimeout(() => {
        router.push(`/blog/view-blog/${id}`)
      }, 1000)
    } catch (err) {
      alert(err)
      alert('網路連線異常')
    } finally {
      setIsLoading(false)
    }
  }
}

export async function getServerSideProps({
  req,
  res,
  query,
}: {
  req: undefined
  res: undefined
  query: { id: number }
}) {
  const token = getCookie('auth', { req, res })
  const { id } = query
  const headers: { [key: string]: string } = {
    'Content-Type': 'application/json',
  }
  token ? (headers.Authorization = String(token)) : null

  const response = await fetch(
    `https://travelmaker.rocket-coding.com/api/blogs/draft/${id}`,
    {
      method: 'GET',
      headers,
    }
  )
  if (response.status === 401) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
      props: {},
    }
  }
  const resJSON = await response.json()
  return {
    props: {
      data: resJSON,
    },
  }
}
