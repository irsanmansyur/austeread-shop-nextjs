import { convertBase64 } from "@/commons/helpers/images";
import { AppInterface } from "@/commons/interface/app";
import { useAuth } from "@/contexts/auth";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { BsPencilFill, BsX } from "react-icons/bs/index";
import ButtonCustom from "../form/button";
import ChangePassword from "./change-password";

type Props = {
  user?: AppInterface.User;
};
export default function ProfileUser(props: Props) {
  const { user, logout } = useAuth();
  const [image, setImage] = useState<{ srcBase64: string; file: File | null }>({ srcBase64: "", file: null });
  const imageRef = useRef<HTMLImageElement>(null);
  const onChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.currentTarget.files || !imageRef.current) return;

    const file = e.currentTarget.files[0];
    const base64 = await convertBase64(file);

    imageRef.current.srcset = base64 + "";
    setImage({ file: file, srcBase64: base64 + "" });
  };

  useEffect(() => {
    if (!imageRef) return;

    return () => {};
  }, [imageRef]);

  return (
    <>
      <div className="profile flex flex-col gap-3 items-center">
        <div className="relative">
          <Image ref={imageRef} width={100} height={100} alt="profil user" src={user?.img + ""} className="!h-[100px] !w-[100px] rounded-full bg-white backdrop-blur border" />
          <label
            htmlFor="changeImage"
            className="absolute right-[-7px] top-[60px] cursor-pointer flex w-[35px] h-[35px] items-center justify-center rounded-full bg-black text-white"
          >
            <BsPencilFill />
          </label>
          <input type="file" accept="image/*" id="changeImage" className="hidden" onChange={onChangeImage} />
        </div>
        {image.file && (
          <div className="flex justify-center py-1 gap-2">
            <ButtonCustom
              className="bg-secondary !py-1"
              onClick={(e) => {
                if (!imageRef.current) return;
                setImage({ srcBase64: "", file: null });
                imageRef.current.srcset = user?.img + "";
              }}
            >
              Cancel
            </ButtonCustom>{" "}
            <ButtonCustom className="!py-1">Save</ButtonCustom>
          </div>
        )}

        <div>
          <span className="font-Garnett-Light">You are logged in as</span> <span className="font-bold">{user?.fullname} </span> <br />
        </div>
        <button
          className="text-primary-others"
          onClick={(e) => {
            logout();
          }}
        >
          Sign out
        </button>
      </div>
      <div className="cradential">
        <h3 className="text-center font-bold pb-4">Cradentials</h3>
        <div className="space-y-4">
          <div>
            <p className="text-xs">Email</p>
            <span className="text-sm">{user?.email}</span>
          </div>
          <div>
            <p className="text-xs">Password</p>
            <ChangePassword />
          </div>
        </div>
      </div>
    </>
  );
}
