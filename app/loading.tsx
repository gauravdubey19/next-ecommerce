import Image from "next/image";

export default function Loading() {
  return (
    <>
      <div className="w-full h-[58vh] flex-center overflow-hidden">
        <Image
          src="/loadingCart.gif"
          alt="loading..."
          loading="eager"
          unoptimized
          width={200}
          height={200}
          className="w-full lg:w-[40%] h-[70%] lg:h-full"
        />
      </div>
    </>
  );
}
