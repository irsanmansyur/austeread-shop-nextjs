import { scrollInfoAtom, UserInfoAtom } from "@/commons/data/layoutAtom";
import { AppInterface } from "@/commons/interface/app";
import { useAuth } from "@/contexts/auth";
import React, { useRef } from "react";
import { useSetRecoilState } from "recoil";
import Footer from "./components/footer";
import Navbar from "./components/navbar";

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
  children?: string | JSX.Element | JSX.Element[];
  configs: AppInterface.Config;
  categories: AppInterface.Kategori[];
};
export default function PublicLayout({ children, ...props }: Props) {
  // untuk mendapatkan info scroll dan window main utama
  const setScrollInfo = useSetRecoilState(scrollInfoAtom);
  const { user } = useAuth();
  const parentMain = useRef<HTMLDivElement>(null);

  const handleScroll = (event: any) => {
    setScrollInfo((inf) => {
      return {
        top: event.currentTarget.scrollTop,
        height: event.currentTarget.scrollHeight,
        to: event.currentTarget.scrollTop > inf.top ? "bottom" : "top",
        refParent: parentMain.current,
      };
    });
  };
  return (
    <div className="relative overflow-hidden font-garnet">
      <div
        ref={parentMain}
        id="main-menu"
        onScroll={handleScroll}
        className="flex justify-between flex-col h-screen overflow-y-auto overflow-x-hidden scroll-smooth"
        scroll-region="true"
      >
        <div>
          <Navbar user={user} />
          <main {...props}>{children}</main>
        </div>
        <Footer categories={props.categories} configs={props.configs} />
      </div>
    </div>
  );
}
