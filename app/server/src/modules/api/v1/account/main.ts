import { RequestType, getPathRequestList } from "@oh/utils";
import { getRequest } from "./account.request.ts";

export const accountRequestList: RequestType[] = getPathRequestList({
  requestList: [getRequest],
  pathname: "/account",
});
