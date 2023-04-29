import Image from 'next/image'

export default function LoadingAnimate({ isLoading }: { isLoading: boolean }) {
  return (
    <>
      {isLoading ? (
        <div className="fixed bottom-5 right-5 rounded-full h-[80px] w-[80px] bg-primary shadow text-xl animate-pulse flex justify-center items-center z-30 text-white">
          <Image
            alt="loading"
            src={'/loadingCarTint.png'}
            width={50}
            height={38}
          ></Image>
        </div>
      ) : null}
    </>
  )
}
