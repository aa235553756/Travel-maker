
import tw from 'tailwind-styled-components'
interface ButtonProps {
  $primary?: boolean
}

export const Button = tw.div<ButtonProps>`
    ${(p) => (p.$primary ? 'bg-indigo-600' : 'bg-indigo-300')}
    flex
    inline-flex
    items-center
    border
    border-transparent
    text-xs
    font-medium
    rounded
    shadow-sm
    text-white

    hover:bg-indigo-700
    focus:outline-none
`