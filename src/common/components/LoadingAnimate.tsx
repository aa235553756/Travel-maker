import Image from 'next/image'

export default function LoadingAnimate({ isLoading }: { isLoading: boolean }) {
  return (
    <>
      {isLoading ? (
        <div className="bg-glass-45 top-0 left-0 fixed w-screen h-screen z-50">
          <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] rounded-full h-[200px] w-[200px] bg-primary shadow text-xl animate-pulse">
            <span className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-white ">
              <Image
                alt="loading"
                src={'/loadingCarTint.png'}
                width={105}
                height={76}
              ></Image>
            </span>
          </div>
        </div>
      ) : null}
    </>
  )
}
