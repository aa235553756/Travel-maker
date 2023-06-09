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
