import { ReactElement } from "react";
import PublicLayout from "@/layouts/public-layout";
import { AppInterface } from "@/commons/interface/app";
import { NextPageWithLayout } from "../_app";
import SeoLayout from "@/layouts/seo-layout";
import Breadcrumbs from "@/layouts/components/breadcrumbs";
import { useCountdown } from "@/components/timer/coundown";
import { CountdownTimer } from "@/components/timer/CountdownTimer";
import { Tooltip } from "san-tooltip";

type Props = { product: AppInterface.Product };
const PaymentDetails: NextPageWithLayout<Props> = ({ product }) => {
  const THREE_HOUR_IN_MS = 3 * 60 * 60 * 1000;
  const NOW_IN_MS = new Date().getTime();
  const dateTimeAfterThreeDays = NOW_IN_MS + THREE_HOUR_IN_MS;

  return (
    <SeoLayout title={"Ini halaman detail prouct "} descrtiption={"ini descripsi product"}>
      <div className="container">
        <Breadcrumbs breads={[]} />
        <div className="font-GarnettRegular">
          <div className="py-5 text-center">
            <h1 className="font-PublicSansRegular font-normal text-dark">Complete Payment In</h1>
            <CountdownTimer targetDate={dateTimeAfterThreeDays} />
          </div>
          <div className="bg-gray-200 p-5 space-y-6 m-2  text-xs sm:w-[530px] sm:mx-auto">
            <div className="flex justify-between items-center">
            <h2 className="text-base">BCA Virtual Account</h2>

            </div>
            <hr className="border-t-2 border-gray-400" />
            <div className="order-number space-y-2">
              <div>Order Number</div>
              <div className="font-bold">#240821</div>
            </div>
            <div className="order-number space-y-2">
              <div>Virtual Account Number</div>
              <div className="font-bold flex justify-between">
                <span>088896755676333</span>
                <Tooltip event="click" text="Url berhasil di salin">
                  <button
                    className="outline-none text-primary"
                    onClick={async () => {
                      if ("clipboard" in navigator) {
                        await navigator.clipboard.writeText("088896755676333");
                      } else {
                        document.execCommand("copy", true, "088896755676333");
                      }
                    }}
                  >
                    Copy
                  </button>
                </Tooltip>
              </div>
            </div>
            <div className="order-number space-y-2">
              <div>Total</div>
              <div className="font-bold flex justify-between">
                <span>Rp. 500.000</span>
                <Tooltip
                  event="click"
                  text="Url berhasil di salin"
                  onClick={async () => {
                    if ("clipboard" in navigator) {
                      await navigator.clipboard.writeText("500.000");
                    } else {
                      document.execCommand("copy", true, "500.000");
                    }
                  }}
                >
                  <button className="outline-none text-primary">Copy</button>{" "}
                </Tooltip>
              </div>
            </div>
          </div>
          <div className="payment-info-action p-2 space-2  sm:w-[530px] sm:mx-auto flex flex-col sm:flex-row sm:gap-5 sm:px-0">
            <button className="border-2 py-3 w-full border-gray-normal font-GarnettRegular">CONTINUE SHOPPING</button>
            <div className="w-full group">
              <button className="border-2 py-3 w-full border-gray-normal bg-dark text-white font-GarnettRegular group-hover:w-2/3 transform duration-500 sm:group-hover:w-full hover:bg-dark/80">
                CEK PAYMENT STATUS
              </button>
            </div>
          </div>
        </div>
      </div>
    </SeoLayout>
  );
};

PaymentDetails.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout {...page.props}>{page}</PublicLayout>;
};

export default PaymentDetails;
