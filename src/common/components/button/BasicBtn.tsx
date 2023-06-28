interface ButtonProps {
  text: string
  onClick?: () => void
  border?: boolean
  color?: string
  size?: string
}

export const BasicButton = ({
  text,
  onClick,
  border,
  color = 'primary',
  size = 'text-lg',
}: ButtonProps) => {
  const buttonClasses = `bg-${color} hover:bg-${color}-tint active:bg-${color}-dark text-white border px-5 py-2 rounded ${size} duration-150`
  const borderClasses = `border-${color} hover:border-${color}-tint hover:text-${color}-tint text-${color} active:text-${color} border px-5 py-2 rounded ${size} duration-150`

  return (
    <button
      className={border ? borderClasses : buttonClasses}
      onClick={onClick}
    >
      {text}
    </button>
  )
}
