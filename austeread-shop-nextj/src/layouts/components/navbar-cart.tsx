import { productKeranjangAtom } from "@/commons/data/product-atom";
import ProductCard from "@/components/product/product-card";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import NavbarModal from "./navbar-modal";

export default function NavbarCart() {
  const [keranjangs, setKeranjangs] = useRecoilState(productKeranjangAtom);
  const [show, setShow] = useState(false);
  const sidebarCartRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // @ts-ignore
      if (sidebarCartRef.current && !sidebarCartRef.current.contains(event.target)) {
        setShow(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarCartRef]);
  return (
    <div className="flex">
      <button className="outline-none relative" id="user" onClick={() => setShow(true)}>
        <Image alt="icon cart" width={23} height={23} style={{ width: "auto", height: "auto" }} className="!w-[23px]" src={"/icons/icon_cart.png"} />
        {keranjangs.length > 0 && (
          <span className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 rounded-full text-[10px] flex justify-center items-center w-[15px] h-[15px]  bg-primary text-white">
            {keranjangs.length}
          </span>
        )}
      </button>
      <NavbarModal open={show} setIsOpen={setShow} classParent="h-full bg-dark sm:bg-white/40 backdrop-blur flex justify-end w-full">
        <div ref={sidebarCartRef} className="border-l-2 border-l-dark text-dark min-w-[300px] h-full flex flex-col justify-between px-4 bg-white">
          <div>
            <div className="border-b border-light py-3 flex items-center justify-between">
              <h1 className="font-GarnettMedium font-bold text-2xl">Shopping Cart</h1>
              <button className="outline-none">
                <Image
                  width={24}
                  height={30}
                  style={{ width: "auto", height: "auto" }}
                  src="/icons/icon_x.png"
                  onClick={(e) => setShow(false)}
                  className="!w-[24px]"
                  alt="close icons"
                />
              </button>
            </div>
            {keranjangs.length > 0 ? (
              <>
                <ul className="navbar-menu PublicSansBlack  flex flex-col gap-3">
                  {keranjangs.map((krj, i) => {
                    return (
                      <li key={i}>
                        <ProductCard product={krj} />
                      </li>
                    );
                  })}
                </ul>
                <hr className="my-3" />
                <div className="bg-white border relative w-full">
                  <input className="outline-none p-2 w-[calc(100%-110px)]" />
                  <button className="absolute right-0 outline-none h-full bg-black text-white w-[102px]">APPLY</button>
                </div>
                <hr className="my-3" />
                <div className="cart-price">
                  <div className="flex justify-between font-bold w-full">
                    <span>Total</span>
                    <span>Rp. 597.000</span>
                  </div>
                </div>
              </>
            ) : (
              <div className=" flex justify-center items-center p-4 border text-center ">Keranjang kosong</div>
            )}
          </div>
          <div className="sidebar-footer-section mb-4">
            <div className="flex items-center justify-between">
              <Link href={"/"}>continue shopping</Link>
              {keranjangs.length > 0 && (
                <Link href={"/product/checkout"} className="bg-primary p-2 text-white hover:bg-opacity-90">
                  CHECKOUT
                </Link>
              )}
            </div>
          </div>
        </div>
      </NavbarModal>
    </div>
  );
}
