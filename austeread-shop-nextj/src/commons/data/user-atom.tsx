import { useState } from "react";
import { useCookies } from "react-cookie";
import { atom, useRecoilState } from "recoil";
import { AppInterface } from "../interface/app";
import { UserInfoAtom } from "./layoutAtom";

export const userAtom = atom({
  key: "userAtom",
  default: null,
});

export default function useUser() {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [user, setUser] = useRecoilState(UserInfoAtom);
  const [loading, setLoading] = useState(false);
  const updateUser = (user: AppInterface.User) => {
    setUser(user);
    setCookie("token", user.token);
  };

  const setUserByToken = (tokenJwt: string) => {
    setLoading(true);
    const token = (tokenJwt as string).split(".")[1];
    try {
      const user = JSON.parse(atob(token));
      setUser({ ...user, token: tokenJwt });
    } catch (error) {
      removeCookie("token");
      setUser(null);
    }
    setLoading(false);
  };

  if (!user && loading == false && cookies.token) setUserByToken(cookies.token);

  return { user, setUser: updateUser, loading };
}
