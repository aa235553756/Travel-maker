
import { LoginFormProp } from "@/pages/login"

export function loginApi(data: LoginFormProp) {
  return fetch(
    `${process.env.NEXT_PUBLIC_baseUrl}/users/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  )
}