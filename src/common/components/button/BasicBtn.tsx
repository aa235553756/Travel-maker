interface ButtonProps {
  text: string
  onClick?: () => void
  color?: string
  size?: string
}

export const BasicButton = ({
  text,
  onClick,
  color = 'primary',
  size = 'text-lg',
}: ButtonProps) => {
  const buttonClasses = `bg-${color} hover:bg-${color}-tint active:bg-${color}-dark text-white border px-5 py-2 rounded ${size}`

  return (
    <button className={buttonClasses} onClick={onClick}>
      {text}
    </button>
  )
}
