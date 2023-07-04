export function getAttractions(id: number, token?: string | boolean | null | undefined) {

  const headers: { [key: string]: string } = {
    'Content-Type': 'application/json',
  }

  if (token) {
    headers.Authorization = `${token}`
  }

  return fetch(
    `${process.env.NEXT_PUBLIC_baseUrl}/attractions/${id}`,
    {
      headers
    }
  )
}

export function changeCollectApi(AttractionId: number, method: string, token: string | boolean | null | undefined, isCollect: boolean) {
  return fetch(
    `${process.env.NEXT_PUBLIC_baseUrl}/attractions/${AttractionId}/collect`,
    {
      method,
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        AttractionId: AttractionId,
        IsCollect: !isCollect,
      }),
    }
  )
}

export function postAttrComment(token: string, AttractionId: number, commetInputRef: React.RefObject<HTMLTextAreaElement>, commentStar: number) {
  return fetch(
    `${process.env.NEXT_PUBLIC_baseUrl}/attractions/comments/add`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        AttractionId: AttractionId,
        Comment: commetInputRef?.current?.value,
        Score: commentStar,
      }),
    }
  )
}