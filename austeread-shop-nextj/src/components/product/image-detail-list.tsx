import Image from "next/image";
import React from "react";

export default function ProductImageThumbnail() {
  return (
    <div className="image h-[75px]">
      <Image height={70} width={70} style={{ width: "auto", height: "auto" }} src="/image/product-image.jpg" alt="image" className="!h-full !w-full" />
    </div>
  );
}
