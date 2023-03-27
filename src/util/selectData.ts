// 有這個不用寫defaultChecked
// nearBy值會經處理轉換經緯度，再傳給後端
export const defaultValues = {
  CategoryId: ['1'],
  AttrCounts: '4',
  Transports: '不限',
  nearBy: false,
  DistrictName: ['不限']
}
export const CategoryId = [
  {
    name: '隨心所欲',
    value: '1',
    checked: true,
  },
  {
    name: '城市走走',
    value: '2',
  },
  {
    name: '拍照聖地',
    value: '3',
  },
  {
    name: '放鬆療癒',
    value: '4',
  },
  {
    name: '夜間首選',
    value: '5',
  },
  {
    name: '文藝青年',
    value: '6',
  },
  {
    name: '親子互動',
    value: '7',
  },
  {
    name: '冒險活潑',
    value: '8',
  },
]
export const AttrCounts = [
  { name: '2個景點', value: '2' },
  { name: '4個景點', value: '4', checked: true },
  { name: '6個景點', value: '6' },
  { name: '8個景點', value: '8' },
]
export const Transports = [
  { name: '不限', value: '不限', checked: true },
  { name: '開車', value: '開車' },
  { name: '走路', value: '走路' },
]
export const DistrictName = [
  '不限',
  '鄰近',
  '中山區',
  '大安區',
  '信義區',
  '士林區',
  '大同區',
  '內湖區',
  '萬華區',
  '松山區',
  '文山區',
  '北投區',
  '南港區',
  '中正區',
]

