import useData from "@/commons/data";
import { AppInterface } from "@/commons/interface/app";
import { InputCustom } from "@/components/form/InputGroup";
import SeoLayout from "@/layouts/seo-layout";
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from "@leecheuk/react-google-login";
import Link from "next/link";
import { ReactElement, useEffect, useRef, useState } from "react";
import { NextPageWithLayout } from "../_app";
import ReCAPTCHA from "react-google-recaptcha";
import ButtonCustom from "@/components/form/button";
import AuthLayout from "@/layouts/auth-layout";
import { useRouter } from "next/router";
import Image from "next/image";
import { useAuth } from "@/contexts/auth";
type Props = {};
const Page: NextPageWithLayout<Props> = ({ ...props }) => {
  const { user, login } = useAuth();
  const { replace } = useRouter();
  const captchaRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const { post: postLoginForm, loading: loadingLogin, data: dataLoginRespon } = useData<AppInterface.User & { message?: string }>();
  const [data, setData] = useState<{ register_method?: number; email?: string; password?: string }>();
  const handleLogin = async (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    console.log(response);
  };

  const loginForm = async (e: React.FormEvent) => {
    e.preventDefault();
    // @ts-ignore
    const token = captchaRef?.current?.getValue() as string;
    if (!token) return setErrorMessage("Error! You must confirm you are not a robot");
    setErrorMessage(undefined);

    try {
      await login({ email: `${data?.email}`, token, password: `${data?.password}` });
    } catch (error: any) {
      if (error["response"] && error["response"]["status"] >= 400) {
        setErrorMessage(error["response"]["data"]["message"] ?? error["message"]);
      }
    }
  };

  useEffect(() => {
    if (user) replace("/");
    return () => {};
  }, [user, replace]);

  return (
    <SeoLayout title="Login Austeread" descrtiption="Welcome user" className="my-4 w-full sm:max-w-md px-3">
      <div className="header flex items-center flex-col gap-3">
        <Link href="/" className="flex items-center mb-10 text-primary">
          <Image width={60} height={60} style={{ width: "auto", height: "auto" }} alt="logo austeread" className="!w-[60px]" src="/icons/logo.austeread.gif" />
        </Link>
        <h5 className="Garnett-medium font-GarnettMedium text-xl">Sign in into your account</h5>
      </div>
      <div className="body py-10">
        <p>
          New user?
          <Link href="/auth/register" className="text-primary ml-2">
            Create an account
          </Link>
        </p>
        {errorMessage && <div className="flex justify-center items-center p-2 sm:p-4 text-white bg-red-500 rounded my-3">{errorMessage}</div>}
        <form action="" autoComplete="off" method="post" onSubmit={loginForm} className="py-5">
          <InputCustom autoComplete="off" onChange={(e) => setData({ ...data, email: e.target.value })} label="Email" placeholder="Enter your email" className="bg-transparent" />
          <InputCustom autoComplete="off" onChange={(e) => setData({ ...data, password: e.target.value })} label="Password" placeholder="Enter your password" type={"password"} />
          <div>
            <ReCAPTCHA
              onChange={(e) => {
                console.log(e);
              }}
              ref={captchaRef}
              sitekey={process.env.NEXT_PUBLIC_REACT_APP_SITE_KEY ?? ""}
            />
          </div>
          <div className="py-3">
            <ButtonCustom disabled={loadingLogin} type="submit" className="w-full" onClick={(e) => setData({ ...data, register_method: 0 })}>
              Submit
            </ButtonCustom>
          </div>
          <div className="text-center PublicSans-regular gap-2 relative flex items-center" style={{ marginTop: 20, marginBottom: 20, fontSize: 14, fontWeight: 600 }}>
            <div className="bg-black rounded w-full h-[2px]"></div>
            <span className="whitespace-nowrap">Or Sign in With</span>
            <div className="bg-black rounded w-full h-[2px]"></div>
          </div>
          <GoogleLogin
            disabled={loadingLogin}
            className="w-full flex justify-center"
            clientId={process.env.NEXT_PUBLIC_REACT_APP_GOOGLE_CLIENT_ID ?? ""}
            buttonText="Log in with Google"
            onSuccess={handleLogin}
            onFailure={handleLogin}
            isSignedIn={true}
            cookiePolicy={"single_host_origin"}
          />
        </form>
      </div>
    </SeoLayout>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout {...page.props}>{page}</AuthLayout>;
};

export default Page;
