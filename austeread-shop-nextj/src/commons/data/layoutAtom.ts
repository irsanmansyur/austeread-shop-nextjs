import { atom } from "recoil";
import { AppInterface } from "../interface/app";

export const kategoriesAtom = atom<AppInterface.Kategori[] | null>({
  key: "kategoriesAtom",
  default: null,
});

export const configsAtom = atom<AppInterface.Config | null>({
  key: "configsAtom",
  default: null,
});
export const scrollInfoAtom = atom<{ top: number; height: number; to: "bottom" | "top"; refParent?: HTMLDivElement | null }>({
  key: "scrollInfoAtom",
  default: { top: 0, height: 0, to: "top", refParent: undefined },
});

export const UserInfoAtom = atom<AppInterface.User | null>({
  key: "userInfo",
  default: null,
});
