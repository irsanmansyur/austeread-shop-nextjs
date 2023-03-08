import SeoLayout from "@/layouts/seo-layout";
import Image from "next/image";
import Link from "next/link";
import React, { ReactElement } from "react";
type Props = {};
const succesfullyPage = ({ ...props }: Props) => {
  return (
    <SeoLayout title={"Successfully payment "} descrtiption={"ini descripsi product"}>
      <div className="max-w-sm mx-auto bg-white">
        <header className="border-b flex justify-center py-10">
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
        </header>
        <div id="main" className="py-5 space-y-5">
          <div className="text-center space-y-3">
            <div>
              <span className="text-gray-normal text-sm">Hello </span> Ranti
            </div>
            <div className="font-bold">Your order has been successful!</div>
            <div className="text-gray-normal text-sm">Thank you, here are your order details.</div>
          </div>
          <div className="flex justify-between items-center">
            <span>Order #240821</span>
            <div>
              24 August 2021 <span>12.00</span>
            </div>
          </div>
          <div className="shipping-details">
            <h3 className="font-bold">Shipping Details</h3>
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="py-1 text-gray-normal">Shipping to</td>
                  <td className="py-1">Ranti</td>
                </tr>
                <tr>
                  <td className="py-1 text-gray-normal">Phone Number</td>
                  <td className="py-1">088-8999-7675</td>
                </tr>
                <tr>
                  <td className="py-1 text-gray-normal">Ship to</td>
                  <td className="py-1">AZ Solusindo, Suri Kosambi, Cengkareng, Jakarta Barat, DKI Jakarta, 15504</td>
                </tr>
                <tr>
                  <td className="py-1 text-gray-normal">Shipping Method</td>
                  <td className="py-1">Sicepat - Same Day - 1 Day - Rp. 18.000</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="shipping-details">
            <h3 className="font-bold">Payment Information</h3>
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="py-1 text-gray-normal">Payment Method</td>
                  <td className="py-1">BCA Virtual Account</td>
                </tr>
                <tr>
                  <td className="py-1 text-gray-normal">Amount</td>
                  <td className="py-1">Rp. 615.000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SeoLayout>
  );
};
succesfullyPage.getLayout = (page: ReactElement) => <>{page}</>;
export default succesfullyPage;
