export default function LoadingAnimate({ isLoading }: { isLoading: boolean }) {
  return (
    <>
      {isLoading ? (
        <div className="bg-glass-45 top-0 fixed w-screen h-screen z-50">
          <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] rounded-full h-[200px] w-[200px] bg-primary text-xl animate-pulse">
            <span className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-white">
              loading
            </span>
          </div>
        </div>
      ) : null}
    </>
  )
}
