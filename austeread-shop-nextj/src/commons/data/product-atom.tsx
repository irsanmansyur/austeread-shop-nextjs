import { atom } from "recoil";
import { AppInterface } from "../interface/app";

export const productKeranjangAtom = atom<AppInterface.ProductKeranjangs[]>({
  key: "userAtom",
  default: [],
});
