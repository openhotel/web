import {
  RequestType,
  RequestMethod,
  getResponse,
  HttpStatusCode,
  RequestKind,
} from "@oh/utils";
import { System } from "modules/system/main.ts";

export const getRequest: RequestType = {
  method: RequestMethod.GET,
  pathname: "",
  kind: RequestKind.PUBLIC,
  func: async (request: Request) => {
    const fingerprint = request.headers.get("fingerprint");
    const token = request.headers.get("token");

    return getResponse(HttpStatusCode.OK, {
      data: {
        account: System.accounts.get(fingerprint, token),
      },
    });
  },
};
