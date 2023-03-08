import Image from "next/image";
import { ReactElement, useRef, useState } from "react";
import PublicLayout from "@/layouts/public-layout";
import Banner from "@/components/banner";
import { AppInterface } from "@/commons/interface/app";
import Link from "next/link";
import { urlAsset } from "@/commons/helpers";
import { NextPageWithLayout } from "../_app";
import IconCopy from "@/components/article/icon-copy";
import CommentParent from "@/components/article/commen-parent";
import { textHtmlBersih } from "@/commons/helpers/text";
import SeoLayout from "@/layouts/seo-layout";
import Breadcrumbs from "@/layouts/components/breadcrumbs";
import ProductCardCheckout from "@/components/product/product-card-checkout";
import { InputCustom } from "@/components/form/InputGroup";
import { BsArrowDownShort } from "react-icons/bs";

type Props = { product: AppInterface.Product };
const ChekoutPage: NextPageWithLayout<Props> = ({ product }) => {
  return (
    <SeoLayout title={"Ini halaman detail prouct "} descrtiption={"ini descripsi product"}>
      <div className="container">
        <Breadcrumbs breads={[{ label: "Ini halaman detail product" }]} />
        <div className="p-2 flex w-full flex-col sm:flex-row gap-5 sm:gap-x-10">
          <div className="sm:order-2 sm:w-1/2">
            <div className="bg-gray-200 p-2 space-y-6">
              <ul className="flex gap-2 flex-col">
                {[1, 2, 3].map((s) => {
                  return (
                    <li className="border-b pb-2 last:pb-0 last:border-b-0" key={s}>
                      <ProductCardCheckout />
                    </li>
                  );
                })}
              </ul>
              <hr className="mx-2 border-t-2 border-gray-400" />
              <div>
                <div className="flex justify-between">
                  <input className="outline-none border border-gray-normal p-2 w-[calc(100%-110px)] bg-white" />
                  <button className="outline-none px-2 bg-black text-white w-[102px]">APPLY</button>
                </div>
                <div className="flex justify-between mt-2 text-sm">
                  <span>Diskon</span>
                  <span>Rp. 10.000</span>
                </div>
              </div>
              <hr className="mx-2 border-t-2 border-gray-400" />
              <div>
                <div className="flex justify-between mt-2 text-sm">
                  <span>Subtotal</span>
                  <span>Rp. 597.000</span>
                </div>
                <div className="flex justify-between mt-2 text-sm">
                  <span>Shipping</span>
                  <span>Rp. 18.000</span>
                </div>
                <div className="flex justify-between mt-2 text-sm">
                  <span>Total Diskon</span>
                  <span>- Rp. 10.000</span>
                </div>
              </div>
              <hr className="mx-2 border-t-2 border-gray-400" />
              <div className="flex justify-between mt-2 text-sm font-bold pb-4">
                <span>Total</span>
                <span>Rp. 600.000</span>
              </div>
            </div>
          </div>
          <div className="sm:w-1/2 space-y-5">
            <div className="personal-information">
              <div className="flex justify-between">
                <span className="font-GarnettMedium text-2xl">Personal Information</span>
                <div className="text-right text-sm">
                  <span className="whitespace-nowrap">Already have an account?</span>
                  <br />
                  <Link className="text-primary" href="/auth/login">
                    Login
                  </Link>
                </div>
              </div>
              <div className="py-3">
                <label htmlFor="email-pers">Email</label>
                <input id="email-pers" placeholder="Enter your Email" className="my-2 outline-none border-2 border-gray-normal p-2 w-full block text-gray-normal" />
                <p className="font-normal font-GarnettLight text-xs italic">Enter your email or log in to to receive an invoice related to the order.</p>
              </div>
            </div>
            <div className="personal-information">
              <div className="flex justify-between">
                <span className="font-GarnettMedium text-2xl">Shipping Information</span>
              </div>
              <div className="body">
                <div className="py-3">
                  <label htmlFor="email-pers">Email</label>
                  <input id="email-pers" placeholder="Enter your Email" className="my-2 outline-none border-2 border-gray-normal p-2 w-full block text-gray-normal" />
                </div>
                <div className="flex gap-2">
                  <div className="w-1/2">
                    <InputCustom
                      label="First Name"
                      placeholder="Enter your First Name"
                      className="border-gray-normal border-2 !p-3 focus:bg-transparent rounded-none focus:border-gray-normal"
                    />
                  </div>
                  <div className="w-1/2">
                    <InputCustom
                      label="Last Name"
                      placeholder="Enter your Last Name"
                      className="border-gray-normal border-2 !p-3 focus:bg-transparent rounded-none focus:border-gray-normal"
                    />
                  </div>
                </div>
                <InputCustom
                  classParent="mt-2"
                  label="Address"
                  placeholder="Input your address"
                  className="border-gray-normal border-2 !p-3 focus:bg-transparent rounded-none focus:border-gray-normal"
                />
                <InputCustom
                  label="City or district"
                  placeholder="Select your city or district"
                  className="border-gray-normal border-2 !p-3 focus:bg-transparent rounded-none focus:border-gray-normal"
                />
                <div className="flex gap-2">
                  <div className="w-1/2">
                    <InputCustom
                      label="Country"
                      placeholder="Choose your country"
                      className="border-gray-normal border-2 !p-3 focus:bg-transparent rounded-none focus:border-gray-normal"
                    />
                  </div>
                  <div className="w-1/2">
                    <InputCustom
                      label="Last Name"
                      placeholder="Input your post code"
                      className="border-gray-normal border-2 !p-3 focus:bg-transparent rounded-none focus:border-gray-normal"
                    />
                  </div>
                </div>
                <InputCustom
                  classParent="mt-2"
                  label="Phone Number"
                  placeholder="Input your phone number"
                  className="border-gray-normal border-2 !p-3 focus:bg-transparent rounded-none focus:border-gray-normal"
                />
              </div>
            </div>
            <div className="personal-information">
              <div className="flex justify-between">
                <span className="font-GarnettMedium text-2xl">Shipping Method</span>
              </div>
              <div className="body py-4 space-y-3">
                <div className="flex justify-between p-3 border-2 border-gray-normal text-sm">
                  <span className="text-gray-normal">Sicepat Sameday</span>
                  <div className="font-bold flex items-center gap-2">
                    <span>Rp. 12.000</span>
                    <BsArrowDownShort />
                  </div>
                </div>
                <div className="flex justify-between gap-3 font-GarnettRegular">
                  <button className="w-1/2">Back to cart</button>
                  <Link href="/product/select-payment" className="w-1/2 text-center bg-primary text-white p-3 ">
                    Select Payment
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SeoLayout>
  );
};

ChekoutPage.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout {...page.props}>{page}</PublicLayout>;
};

export default ChekoutPage;
