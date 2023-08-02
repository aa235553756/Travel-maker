// 新增草稿遊
export function postNewDraftBlogApi(
  TourId: number,
  token: string | boolean | null | undefined
) {
  return fetch(`${process.env.NEXT_PUBLIC_baseUrl}/blogs/${TourId}`, {
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
  return fetch(`${process.env.NEXT_PUBLIC_baseUrl}/blogs/edit`, requestOptions)
}
