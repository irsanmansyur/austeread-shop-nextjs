import { ReactElement } from "react";
import PublicLayout from "@/layouts/public-layout";
import { AppInterface } from "@/commons/interface/app";
import Link from "next/link";
import { NextPageWithLayout } from "../_app";
import SeoLayout from "@/layouts/seo-layout";
import Breadcrumbs from "@/layouts/components/breadcrumbs";
import ProductCardCheckout from "@/components/product/product-card-checkout";
import { useCountdown } from "@/components/timer/coundown";

type Props = { product: AppInterface.Product };
const SelectPayment: NextPageWithLayout<Props> = ({ product }) => {
  return (
    <SeoLayout title={"Ini halaman detail prouct "} descrtiption={"ini descripsi product"}>
      <div className="container">
        <Breadcrumbs breads={[{ label: "Cart", url: "/product/checkout" }, { label: "payment" }]} />
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <div className="w-full sm:w-3/5 p-2 space-y-5">
            <div className="payment">
              <div className="flex justify-between">
                <span className="font-GarnettMedium text-2xl">Payment Method </span>
              </div>
            </div>
            <div className="bodi-method-payment">
              <h3 className="title">E-Wallet</h3>
              <div className="flex flex-wrap py-2">
                <div className="bg-gray-normal w-[calc(33.3%-10px)]">
                  <img src="/static/icons/shopie-icon.png" className="w-full" />
                </div>
              </div>
            </div>
            <div className="bodi-method-payment">
              <h3 className="title">Virtual Account</h3>
              <div className="flex flex-wrap py-2">
                <div className="bg-gray-normal w-[calc(33.3%-10px)]">
                  <img src="/static/icons/shopie-icon.png" className="w-full" />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full sm:w-2/5 body py-4 space-y-3">
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
            <div className="flex justify-between gap-3 font-GarnettRegular">
              <Link href={"/product/checkout"} className="w-1/2 flex items-center justify-center">
                Back to Checkout
              </Link>
              <Link href="/product/payment-details" className="w-1/2 bg-primary text-white p-3 text-center ">
                Pay Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SeoLayout>
  );
};

SelectPayment.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout {...page.props}>{page}</PublicLayout>;
};

export default SelectPayment;
