import { RequestType, getPathRequestList } from "@oh/utils";

import { miscRequestList } from "./misc/main.ts";
import { authRequestList } from "./auth/main.ts";
import { accountRequestList } from "./account/main.ts";

export const requestV1List: RequestType[] = getPathRequestList({
  requestList: [...miscRequestList, ...authRequestList, ...accountRequestList],
  pathname: "/api/v1",
});
