import React, { useState, useReducer } from 'react'
import { BsChevronDown } from 'react-icons/bs'
import {
  MdDirectionsRun,
  MdBarChart,
  MdDeck,
  MdLocalBar,
  MdAccountBalance,
  MdDirectionsBike,
  MdOutlineCancel,
} from 'react-icons/md'
import { FaCameraRetro } from 'react-icons/fa'
import { HiUserGroup } from 'react-icons/hi'
import Modal from 'react-modal'
import BannerCarousel from '../../../package/HomePage/BannerCarousel'

export default function Banner() {
  // 處理搜尋下拉選單 tag 狀態
  const initialState = {
    types: {
      random: false,
      city: false,
      photograph: false,
      relax: false,
      night: false,
      artists: false,
      family: false,
      adventure: false,
    },
    journeys: [
      { id: 1, content: '2個景點', active: false },
      { id: 2, content: '4個景點', active: false },
      { id: 3, content: '6個景點', active: false },
      { id: 4, content: '8個景點', active: false },
    ],
    transports: [
      { id: 1, content: '不限', active: false },
      { id: 2, content: '走路', active: false },
      { id: 3, content: '開車', active: false },
    ],
    nears: [{ id: 1, content: '鄰近', active: false }],
    areas: {
      random: false,
      中山區: false,
      大安區: false,
      信義區: false,
      士林區: false,
      大同區: false,
      內湖區: false,
      萬華區: false,
      松山區: false,
      文山區: false,
      北投區: false,
      南港區: false,
      中正區: false,
    },
  }
  const reducer = (state, action) => {
    switch (action.type) {
      case 'TYPE':
        return {
          ...state,
          types: {
            ...state.types,
            [action.payload]: !state.types[action.payload],
          },
        }
      case 'JOURNEY':
        return {
          ...state,
          journeys: state.journeys.map((journey) => {
            if (journey.id === action.payload) {
              return { ...journey, active: true }
            }
            return { ...journey, active: false }
          }),
        }
      case 'TRANSPORT':
        return {
          ...state,
          transports: state.transports.map((transport) => {
            if (transport.id === action.payload) {
              return { ...transport, active: true }
            }
            return { ...transport, active: false }
          }),
        }
      case 'NEAR':
        return {
          ...state,
          nears: state.nears.map((near) => {
            if (near.id === action.payload) {
              return { ...near, active: true }
            }
            return { ...near, active: false }
          }),
        }
      case 'AREA':
        return {
          ...state,
          areas: {
            ...state.areas,
            [action.payload]: !state.areas[action.payload],
          },
        }
      default:
        return state
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState)
  const handleClickType = (typeId) => {
    dispatch({ type: 'TYPE', payload: typeId })
  }
  const handleClickJourney = (journeyId) => {
    dispatch({ type: 'JOURNEY', payload: journeyId })
  }
  const handleClickTransport = (journeyId) => {
    dispatch({ type: 'TRANSPORT', payload: journeyId })
  }
  const handleClickNear = (nearId) => {
    dispatch({ type: 'NEAR', payload: nearId })
  }
  const handleClickArea = (areaId) => {
    dispatch({ type: 'AREA', payload: areaId })
  }

  // Toggle 選擇行程 & 距離下拉選單
  const [isToggle, setIsToggle] = useState(false)
  const toggleState = () => {
    setIsToggle(!isToggle)
    setAreaToggle(false)
  }

  // Toggle 選擇區域下拉選單
  const [areaToggle, setAreaToggle] = useState(false)
  const areaToggleState = () => {
    setAreaToggle(!areaToggle)
    setIsToggle(false)
  }

  // 手機版下拉選單
  const [modal, setModal] = useState(false)
  const openModal = () => {
    setModal(true)
  }
  const closeModal = () => {
    setModal(false)
  }

  return (
    <div>
      <div className="container">
        <div className="pb-[60px] w-full mx-auto lg:w-2/3 md:pb-[100px]">
          <h2 className="text-[28px] mb-6 md:text-5xl md:mb-8 md:leading-normal">
            還在為了聚會行程而煩惱？
            <br />
            聚會趣讓你五秒鐘搞定行程！
          </h2>
          <h3 className="text-[22px] mb-9 md:text-4xl md:mb-8">
            說走就走，我想要城市走走
          </h3>

          {/* 行程類別 */}
          <form className="hidden md:flex space-x-4 mb-4">
            <button
              className="py-4 border w-[calc((100%-112px)/8)] text-center bg-[#ccc]"
              onClick={() => handleClickType('random')}
              style={{
                backgroundColor: state.types.random ? '#ccc' : 'white',
              }}
            >
              <MdDirectionsRun className="mb-2 mx-auto text-2xl" />
              <p className="text-sm">隨心所欲</p>
            </button>
            <button
              className="py-4 border w-[calc((100%-112px)/8)] text-center"
              onClick={() => handleClickType('city')}
              style={{
                backgroundColor: state.types.city ? '#ccc' : 'white',
              }}
            >
              <MdBarChart className="mb-2 mx-auto text-2xl" />
              <p className="text-sm">城市走走</p>
            </button>
            <button
              className="py-4 border w-[calc((100%-112px)/8)] text-center"
              onClick={() => handleClickType('photograph')}
              style={{
                backgroundColor: state.types.photograph ? '#ccc' : 'white',
              }}
            >
              <FaCameraRetro className="mb-2 mx-auto text-2xl" />
              <p className="text-sm">拍照聖地</p>
            </button>
            <button
              className="py-4 border w-[calc((100%-112px)/8)] text-center"
              onClick={() => handleClickType('relax')}
              style={{
                backgroundColor: state.types.relax ? '#ccc' : 'white',
              }}
            >
              <MdDeck className="mb-2 mx-auto text-2xl" />
              <p className="text-sm">放鬆療癒</p>
            </button>
            <button
              className="py-4 border w-[calc((100%-112px)/8)] text-center"
              onClick={() => handleClickType('night')}
              style={{
                backgroundColor: state.types.night ? '#ccc' : 'white',
              }}
            >
              <MdLocalBar className="mb-2 mx-auto text-2xl" />
              <p className="text-sm">夜間首選</p>
            </button>
            <button
              className="py-4 border w-[calc((100%-112px)/8)] text-center"
              onClick={() => handleClickType('artists')}
              style={{
                backgroundColor: state.types.artists ? '#ccc' : 'white',
              }}
            >
              <MdAccountBalance className="mb-2 mx-auto text-2xl" />
              <p className="text-sm">文藝青年</p>
            </button>
            <button
              className="py-4 border w-[calc((100%-112px)/8)] text-center"
              onClick={() => handleClickType('family')}
              style={{
                backgroundColor: state.types.family ? '#ccc' : 'white',
              }}
            >
              <HiUserGroup className="mb-2 mx-auto text-2xl" />
              <p className="text-sm">親子互動</p>
            </button>
            <button
              className="py-4 border w-[calc((100%-112px)/8)] text-center"
              onClick={() => handleClickType('adventure')}
              style={{
                backgroundColor: state.types.adventure ? '#ccc' : 'white',
              }}
            >
              <MdDirectionsBike className="mb-2 mx-auto text-2xl" />
              <p className="text-sm">冒險活潑</p>
            </button>
          </form>
          <div className="block md:hidden">
            <BannerCarousel />
          </div>

          {/* 搜尋欄 */}
          <div className="hidden w-full md:h-[86px] md:bg-[#ccc] md:flex md:p-4 md:space-x-4">
            <button
              className="bg-[#d7d7d7] w-2/5 px-5 py-4 flex items-center justify-between"
              onClick={() => {
                toggleState()
              }}
            >
              行程/距離
              <BsChevronDown />
            </button>
            <button
              className="bg-[#d7d7d7] w-2/5 px-5 py-4 flex items-center justify-between"
              onClick={() => {
                areaToggleState()
              }}
            >
              請選擇區域
              <BsChevronDown />
            </button>
            <button className="w-1/5 bg-[#d7d7d7] p-4 block">開始規劃</button>
          </div>
          <button
            className="bg-[#d7d7d7] w-full px-5 py-4 mb-6 flex items-center justify-between md:hidden"
            onClick={() => {
              openModal()
            }}
          >
            請選擇行程/距離/區域
            <BsChevronDown />
          </button>
          <button className="w-full bg-[#d7d7d7] p-4 md:hidden">
            開始規劃
          </button>

          {/* 選擇行程 & 距離下拉選單 */}
          {isToggle ? (
            <div className="w-full bg-[#d7d7d7] px-5 py-6">
              {/* 選擇行程 */}
              <p className="text-xl mb-2 font-bold">
                選擇行程<span>(必選)</span>
              </p>
              <div className="flex space-x-5 mb-5">
                {state.journeys.map((journey) => (
                  <button
                    key={journey.id}
                    onClick={() => handleClickJourney(journey.id)}
                    style={{
                      borderColor: journey.active ? '#000' : '',
                    }}
                    className="w-20 py-1 border"
                  >
                    {journey.content}
                  </button>
                ))}
              </div>
              {/* 選擇交通工具 */}
              <p className="text-xl mb-2 font-bold">選擇交通工具</p>
              <div className="flex space-x-5 mb-6">
                {state.transports.map((transport) => (
                  <button
                    key={transport.id}
                    onClick={() => handleClickTransport(transport.id)}
                    style={{
                      borderColor: transport.active ? '#000' : '',
                    }}
                    className="w-20 py-1 border"
                  >
                    {transport.content}
                  </button>
                ))}
              </div>
              <hr className="mb-6" />
              <button
                className="px-7 py-3 bg-[#ccc] block ml-auto"
                onClick={() => {
                  toggleState()
                }}
              >
                OK
              </button>
            </div>
          ) : null}

          {/* 選擇區域下拉選單 */}
          {areaToggle ? (
            <div className="w-full bg-[#d7d7d7] px-5 py-6">
              <p className="text-xl mb-2 font-bold">
                選擇區域<span>(複選)</span>
              </p>
              <div className="flex space-x-5 mb-5">
                {state.nears.map((near) => (
                  <button
                    key={near.id}
                    onClick={() => handleClickNear(near.id)}
                    style={{
                      borderColor: near.active ? '#000' : '',
                    }}
                    className="w-20 py-1 border"
                  >
                    {near.content}
                  </button>
                ))}
              </div>
              <hr className="mb-5" />
              <div className="flex flex-wrap space-x-5 space-y-5 mb-6">
                <button
                  className="w-20 py-1 border"
                  onClick={() => handleClickArea('random')}
                  style={{
                    borderColor: state.areas.random ? '#000' : '',
                  }}
                >
                  不限
                </button>
                <button
                  className="w-20 py-1 border !mt-0"
                  onClick={() => handleClickArea('中山區')}
                  style={{
                    borderColor: state.areas.中山區 ? '#000' : '',
                  }}
                >
                  中山區
                </button>
                <button
                  className="w-20 py-1 border !mt-0"
                  onClick={() => handleClickArea('大安區')}
                  style={{
                    borderColor: state.areas.大安區 ? '#000' : '',
                  }}
                >
                  大安區
                </button>
                <button
                  className="w-20 py-1 border !mt-0"
                  onClick={() => handleClickArea('信義區')}
                  style={{
                    borderColor: state.areas.信義區 ? '#000' : '',
                  }}
                >
                  信義區
                </button>
                <button
                  className="w-20 py-1 border !mt-0"
                  onClick={() => handleClickArea('士林區')}
                  style={{
                    borderColor: state.areas.士林區 ? '#000' : '',
                  }}
                >
                  士林區
                </button>
                <button
                  className="w-20 py-1 border !mt-0"
                  onClick={() => handleClickArea('大同區')}
                  style={{
                    borderColor: state.areas.大同區 ? '#000' : '',
                  }}
                >
                  大同區
                </button>
                <button
                  className="w-20 py-1 border !mt-0 !mr-0"
                  onClick={() => handleClickArea('內湖區')}
                  style={{
                    borderColor: state.areas.內湖區 ? '#000' : '',
                  }}
                >
                  內湖區
                </button>
                <button
                  className="w-20 py-1 border !ml-0"
                  onClick={() => handleClickArea('萬華區')}
                  style={{
                    borderColor: state.areas.萬華區 ? '#000' : '',
                  }}
                >
                  萬華區
                </button>
                <button
                  className="w-20 py-1 border"
                  onClick={() => handleClickArea('松山區')}
                  style={{
                    borderColor: state.areas.松山區 ? '#000' : '',
                  }}
                >
                  松山區
                </button>
                <button
                  className="w-20 py-1 border"
                  onClick={() => handleClickArea('文山區')}
                  style={{
                    borderColor: state.areas.文山區 ? '#000' : '',
                  }}
                >
                  文山區
                </button>
                <button
                  className="w-20 py-1 border"
                  onClick={() => handleClickArea('北投區')}
                  style={{
                    borderColor: state.areas.北投區 ? '#000' : '',
                  }}
                >
                  北投區
                </button>
                <button
                  className="w-20 py-1 border"
                  onClick={() => handleClickArea('南港區')}
                  style={{
                    borderColor: state.areas.南港區 ? '#000' : '',
                  }}
                >
                  南港區
                </button>
                <button
                  className="w-20 py-1 border"
                  onClick={() => handleClickArea('中正區')}
                  style={{
                    borderColor: state.areas.中正區 ? '#000' : '',
                  }}
                >
                  中正區
                </button>
              </div>
              <hr className="mb-6" />
              <button
                className="px-7 py-3 bg-[#ccc] block ml-auto"
                onClick={() => {
                  areaToggleState()
                }}
              >
                OK
              </button>
            </div>
          ) : null}

          {/* 手機版顯示下拉選單 Modal */}
          <Modal
            isOpen={modal}
            onRequestClose={() => {
              closeModal()
            }}
            ariaHideApp={false}
            bodyOpenClassName="overflow-hidden"
            className="md:hidden"
          >
            <div>
              <button
                className="mb-4 ml-auto block text-2xl"
                onClick={() => {
                  closeModal()
                }}
              >
                <MdOutlineCancel />
              </button>

              <ul className="mb-4">
                <li className="px-4 py-2 border-y-2 font-bold">
                  選擇行程(必選)
                </li>
                <li className="flex justify-between px-4 py-2">
                  2個景點
                  <input type="checkbox" />
                </li>
                <li className="flex justify-between px-4 py-2">
                  4個景點
                  <input type="checkbox" />
                </li>
                <li className="flex justify-between px-4 py-2">
                  6個景點
                  <input type="checkbox" />
                </li>
                <li className="flex justify-between px-4 py-2">
                  8個景點
                  <input type="checkbox" />
                </li>
              </ul>

              <ul className="mb-4">
                <li className="px-4 py-2 border-y-2 font-bold">選擇交通工具</li>
                <li className="flex justify-between px-4 py-2">
                  不限
                  <input type="checkbox" />
                </li>
                <li className="flex justify-between px-4 py-2">
                  走路
                  <input type="checkbox" />
                </li>
                <li className="flex justify-between px-4 py-2">
                  開車
                  <input type="checkbox" />
                </li>
              </ul>

              <ul className="mb-6">
                <li className="px-4 py-2 border-y-2 font-bold">
                  選擇區域(必選)
                </li>
                <li className="flex justify-between px-4 py-2 border-b-2">
                  鄰近
                  <input type="checkbox" />
                </li>
                <li className="flex justify-between px-4 py-2">
                  不限
                  <input type="checkbox" />
                </li>
                <li className="flex justify-between px-4 py-2">
                  中山區
                  <input type="checkbox" />
                </li>
                <li className="flex justify-between px-4 py-2">
                  大安區
                  <input type="checkbox" />
                </li>
                <li className="flex justify-between px-4 py-2">
                  信義區
                  <input type="checkbox" />
                </li>
                <li className="flex justify-between px-4 py-2">
                  士林區
                  <input type="checkbox" />
                </li>
                <li className="flex justify-between px-4 py-2">
                  大同區
                  <input type="checkbox" />
                </li>
                <li className="flex justify-between px-4 py-2">
                  內湖區
                  <input type="checkbox" />
                </li>
                <li className="flex justify-between px-4 py-2">
                  萬華區
                  <input type="checkbox" />
                </li>
                <li className="flex justify-between px-4 py-2">
                  北投區
                  <input type="checkbox" />
                </li>
                <li className="flex justify-between px-4 py-2">
                  松山區
                  <input type="checkbox" />
                </li>
              </ul>

              <hr />

              <div className="flex justify-between px-4 py-4">
                <button className="underline">清除全部</button>
                <button className="bg-[#ccc] px-8 py-2">送出</button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  )
}
