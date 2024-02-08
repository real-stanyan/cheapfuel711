import React from "react";
import Image from "next/image";

export default function MapLoading() {
  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center">
      <Image
        src={"/gifs/map-loading.gif"}
        width={1000}
        height={1000}
        className="w-[20vw] h-[20vw]"
        alt="Map-Loading-GIF"
      />
      <h1>map loading...</h1>
    </div>
  );
}
