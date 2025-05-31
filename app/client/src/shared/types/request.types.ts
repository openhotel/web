import { RequestMethod } from "shared/enums";

export type Request = {
  method?: RequestMethod;
  pathname: string;
  body?: unknown;
  headers?: Record<string, string>;
  cache?: boolean;
  rawResponse?: boolean;
  preventReload?: boolean;
};
