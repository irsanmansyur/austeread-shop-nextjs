import Image from "next/image";
import Link from "next/link";

type Props = {
  product?: {
    qty: number;
  };
};
export default function ProductCardHome({ product = { qty: 1 } }: Props) {
  return (
    <Link href={"/product/sdsds"} className="product-card">
      <div className="product-card-image h-[225px] sm:h-[332px]">
        <Image style={{ width: "auto", height: "auto" }} width={100} height={100} src="/image/product-image.jpg" alt="image" className="!h-full !w-full" />
      </div>
      <div className="product-card-detail space-y-1">
        <div className="product-nama font-Garnett-Regular text-base">Austeread x Jane Doe</div>
        <div className="product-desc font-Garnett-Regular text-xs text-gray-700">Austeread Clasic</div>
        <div className="product-harga font-Garnett-Semibold text-gray-900 text-xs">Rp. 100.000</div>
      </div>
    </Link>
  );
}
