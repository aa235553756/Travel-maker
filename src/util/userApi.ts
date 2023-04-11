
import { LoginFormProp } from "@/pages/login"

export function loginApi(data: LoginFormProp) {
  return fetch(
    'https://travelmaker.rocket-coding.com/api/users/login',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  )
}