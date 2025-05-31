import { RequestType, getPathRequestList } from "@oh/utils";
import { getRequest } from "./auth.request.ts";
import { postLoginRequest } from "./login.request.ts";

export const authRequestList: RequestType[] = getPathRequestList({
  requestList: [getRequest, postLoginRequest],
  pathname: "/auth",
});
