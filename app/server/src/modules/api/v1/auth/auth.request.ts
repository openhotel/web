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
  func: () => {
    return getResponse(HttpStatusCode.OK, {
      data: {
        connectionUrl: System.auth.getConnectionUrl(),
      },
    });
  },
};
