// 新增草稿遊
export function postNewDraftBlogApi(
  TourId: number,
  token: string | boolean | null | undefined
) {
  return fetch(`https://travelmaker.rocket-coding.com/api/blogs/${TourId}`, {
    method: 'POST',
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'application/json',
    },
  })
}

// 儲存草稿遊記
export function saveBlogApi(requestOptions: {
  method: string
  headers: Headers
  body: FormData
}) {
  return fetch(
    'https://travelmaker.rocket-coding.com/api/blogs/edit',
    requestOptions
  )
}
