import AddressUser from "@/components/user/address-user";
import OrdersUser from "@/components/user/orders-user";
import ProfileUser from "@/components/user/profile-user";
import PublicLayout from "@/layouts/public-layout";
import React, { ReactElement, useState } from "react";
import SeoLayout from "@/layouts/seo-layout";

export default function PageAccount() {
  const [show, setShow] = useState<"account" | "address" | "orders">("account");

  return (
    <SeoLayout title={`Profile User`} descrtiption={`Halaman pencarian article`} className="py-10 space-y-10  px-3 sm:px-0 sm:w-[323px] mx-auto">
      <div className="flex justify-center gap-3 font-GarnettBold font-bold text-gray-normal">
        <button className={`flex whitespace-nowrap ${show == "account" ? "text-dark" : ""}`} onClick={() => setShow("account")}>
          My Account
        </button>
        <button className={`flex whitespace-nowrap ${show == "address" ? "text-dark" : ""}`} onClick={() => setShow("address")}>
          Addresses
        </button>
        <button className={`flex whitespace-nowrap ${show == "orders" ? "text-dark" : ""}`} onClick={() => setShow("orders")}>
          Orders
        </button>
      </div>
      {show == "account" && <ProfileUser />}
      {show == "address" && <AddressUser />}
      {show == "orders" && <OrdersUser />}
    </SeoLayout>
  );
}
PageAccount.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout {...page.props}>{page}</PublicLayout>;
};
