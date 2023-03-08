import "@/styles/globals.css";
import { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { AppInterface } from "@/commons/interface/app";
import { configure } from "axios-hooks";
import LRU from "lru-cache";
import axios, { AxiosError } from "axios";
import BaseLayout from "@/layouts/base-layout";
import Head from "next/head";
import { AuthProvider } from "@/contexts/auth";
import api from "@/api";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_API;
const axx = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API,
  withCredentials: true,
});
const cache = new LRU({ max: 10 });
configure({ axios: axx, cache });

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
  requiresAuth?: boolean;
  redirectUnauthenticatedTo?: string;
};

let configPropsCache: any;
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  configProps: typeof configPropsCache;
};

export default function MyApp({ Component, pageProps, configProps }: AppPropsWithLayout) {
  configPropsCache = configProps;

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  const layout = getLayout(<Component {...pageProps} configs={configProps} />);
  return (
    <>
      {Component.requiresAuth && (
        <Head>
          <script
            // If no token is found, redirect inmediately
            dangerouslySetInnerHTML={{
              __html: `if(!document.cookie || document.cookie.indexOf('token') === -1)
            {location.replace(
              "/auth/login?next=" +
                encodeURIComponent(location.pathname + location.search)
            )}
            else {document.documentElement.classList.add("render")}`,
            }}
          />
        </Head>
      )}
      <AuthProvider configs={configProps}>
        <BaseLayout>{layout}</BaseLayout>
      </AuthProvider>
    </>
  );
}

MyApp.getInitialProps = async () => {
  let configs = {};
  try {
    if (!configPropsCache || Object.keys(configPropsCache).length < 1) {
      const { data: configsData } = await api.get<{ data: AppInterface.Config }>("config");
      configs = configsData;
    }
  } catch (error) {
    const err = error as AxiosError;
    console.log("Initial page error : ", err.message);
  }
  return { configProps: configs };
};
