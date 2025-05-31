import {
  RequestType,
  RequestMethod,
  getResponse,
  HttpStatusCode,
  RequestKind,
} from "@oh/utils";
import { System } from "modules/system/main.ts";

export const postLoginRequest: RequestType = {
  method: RequestMethod.POST,
  pathname: "/login",
  kind: RequestKind.PUBLIC,
  func: async (request: Request) => {
    const { state, token: connectionToken } = await request.json();
    const fingerprint = request.headers.get("fingerprint");

    if (state !== System.auth.getState())
      return getResponse(HttpStatusCode.BAD_REQUEST);

    const { accountId, username, admin, languages } = await System.auth.fetch({
      url: "/user/@me",
      connectionToken,
    });

    const account = {
      accountId,
      username,
      admin,
      languages,
    };

    const token = System.accounts.set(fingerprint, { ...account });

    return getResponse(HttpStatusCode.OK, {
      data: {
        token,
        account,
      },
    });
  },
};
