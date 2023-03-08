import NavbarMenu from "./navbar-menu";
import Link from "next/link";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import { scrollInfoAtom } from "@/commons/data/layoutAtom";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import NavbarSearch from "./navbar-search";
import NavbarCart from "./navbar-cart";
import { AppInterface } from "@/commons/interface/app";
type Props = { user?: AppInterface.User | null };
export default function Navbar({ user }: Props) {
  const mainInfo = useRecoilValue(scrollInfoAtom);
  const [show, setShow] = useState(false);

  return (
    <>
      <nav
        className={twMerge(
          "border-b   bg-white",
          mainInfo.to == "top" && mainInfo.top > 100 ? "border-b-2 border-gray-normal absolute bg-opacity-90  top-0 left-0 right-0 backdrop-blur z-50" : "sm:py-6"
        )}
      >
        <div className="flex justify-between items-center container p-2  sm:px-0 relative">
          <div className="sm:w-1/3">
            <Link href={"#"}>
              <Image
                height={45}
                width={45}
                style={{ width: "auto", height: "auto" }}
                className="navbar-brand !w-[35px] !h-[35px] sm:!w-[45px] sm:!h-[45px] "
                alt="navbar-logo"
                src={"/icons/logo.austeread.gif"}
              />
            </Link>
          </div>
          <Link className="navbar-brand text-[29px] sm:text-[38px] absolute left-1/2 -translate-x-1/2 " href="/">
            <span className="font-Garnett-Light">auste</span>
            <span className="">read</span>
          </Link>
          <div className="flex justify-end items-center w-full gap-2">
            <div className="hidden" id="searchForm">
              <input className="form-control PublicSans-regular" id="searchbox" type="search" placeholder="Search" data-toggle="dropdown" />
              <ul className="dropdown-menu" id="searchboxcontent" role="menu" aria-labelledby="menu1" style={{ maxWidth: 400 }} />
            </div>
            <div className="flex justify-end items-center w-2/3">
              <div className="flex gap-[5px] items-end">
                <NavbarSearch />
                <Link className="" href={!user ? "/auth/login" : "/user/account"}>
                  <Image alt="icon profile" width={23} height={23} style={{ width: "auto", height: "auto" }} className="!w-[23px]" src={"/icons/icon_profile.png"} />
                </Link>
                <NavbarCart />
              </div>
            </div>
          </div>
        </div>
      </nav>
      <NavbarMenu show={show} setShow={setShow} />
    </>
  );
}
