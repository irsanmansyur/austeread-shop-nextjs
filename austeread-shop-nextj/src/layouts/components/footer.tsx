import FooterCategoriesLink from "./footer-categories";
import FooterAbout from "./footer-about";
import FooterContact from "./footer-contact";
import FooterAdvertising from "./footer-advertising";
import { useRecoilValue, useSetRecoilState } from "recoil";
import FooterBottom from "./footer-bottom";
import { configsAtom, kategoriesAtom, scrollInfoAtom } from "@/commons/data/layoutAtom";
import Image from "next/image";
import SosmedIcon from "@/components/sosmed-icon";

export default function Footer({ configs, categories }: any) {
  const setConfigs = useSetRecoilState(configsAtom);
  const mainLayout = useRecoilValue(scrollInfoAtom);

  setConfigs(configs);

  return (
    <footer className="bg-black text-light font-PublicSansRegular">
      <div className="container absolute right-0 bottom-0 flex justify-end">
        <button
          onClick={(e) => {
            mainLayout.refParent?.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <Image alt="icon back" width={35} height={35} style={{ width: "auto", height: "auto" }} src="/icons/back@2x.png" className="!w-[35px] sm:!w-[45px]" />
        </button>
      </div>
      <div className="container px-[15px] py-[30px] sm:px-0">
        <div className="grid grid-cols-1 gap-10 sm:gap-20 sm:grid-cols-2 ">
          <div className="">
            <h6 className="text-uppercase fw-bold mb-4">
              <Image alt="" width={40} height={40} style={{ width: "auto", height: "auto" }} src={"/icons/logo-white.png"} />
            </h6>
            <div className="flex gap-2 mt-2">
              <a className="me-4 text-reset pr-2" href={configs?.instagram} target="blank">
                <SosmedIcon src={"/icons/instagram_white_ek2.png"} alt="Insagram" />
              </a>
              <a className="me-4 text-reset pr-2" target="blank">
                <SosmedIcon src={"/icons/facebook_white_ek2.png"} alt="Facebook" />
              </a>
              <a className="me-4 text-reset pr-2" href={configs?.twitter} target="blank">
                <SosmedIcon src={"/icons/twitter_white_ek2.png"} alt="Twitter" />
              </a>
              <a className="me-4 text-reset pr-2" href={`mailto:${configs?.email}`} target="blank">
                <SosmedIcon src={"/icons/mail_white_ek2.png"} alt="Mail" />
              </a>
              <a className="me-4 text-reset pr-2" href={`http://wa.me/${configs?.whatsapp}`} target="blank">
                <SosmedIcon src={"/icons/whatsapp_white_ek2.png"} alt="WhatsApp" />
              </a>
            </div>
          </div>
          <div className="mt-[40px]">
            <div className="flex text-xs  sm:text-[18px] flex-col gap-[15px] sm:gap-8 sm:flex-row">
              <FooterAbout />
              <FooterContact />
              <FooterAdvertising />
            </div>
          </div>
        </div>
        <FooterBottom />
      </div>
    </footer>
  );
}
