import { IncomingMessage } from "http";
import { NextApiRequestCookies } from "next/dist/server/api-utils";
import { AppInterface } from "@/commons/interface/app";
// This gives back the user behind a given request
// either on API routes or getServerSideProps
export async function userFromRequest(req: IncomingMessage & { cookies: NextApiRequestCookies }): Promise<AppInterface.User | undefined> {
  const { token: tokenJwt } = req.cookies;

  if (!tokenJwt) return undefined;

  try {
    const token = (tokenJwt as string).split(".")[1];
    const user = JSON.parse(atob(token));
    return user;
  } catch (error) {
    return undefined;
  }
}
