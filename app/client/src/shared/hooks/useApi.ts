import { Request } from "shared/types";
import { RequestMethod } from "../enums";
import { useCallback } from "react";

export const useApi = () => {
  const $fetch = useCallback(
    async ({
      method = RequestMethod.GET,
      pathname,
      body,
      headers = {},
      cache = true,
      rawResponse = false,
      preventReload = false,
    }: Request) => {
      const response = await fetch(`/api/${pathname}`, {
        method,
        headers: new Headers({
          ...headers,
        }),
        body,
        credentials: "include",
        cache: cache ? "default" : "no-store",
      }).then(async (data) => {
        if (rawResponse) return data;

        const contentType = data.headers.get("content-type");

        // Check that the response is JSON before calling `.json()`,
        // otherwise there is no way to recover the response_text in case of an error
        if (contentType && contentType.indexOf("application/json") !== -1) {
          try {
            return await data.json();
          } catch (e) {
            throw {
              status: data.status,
              message: data.statusText,
              response_text: null,
            };
          }
        }
        // If the response is not JSON, throw an error
        const response_text = await data.text();
        throw {
          status: data.status,
          message: response_text.length
            ? `${data.status}: Invalid JSON response`
            : `${data.status}: Empty response`,
          response_text,
        };
      });

      if (rawResponse) return response;

      if (response.status === 403 && !preventReload) {
        globalThis.location.reload();
        return;
      }

      if (response.status !== 200) throw response;

      return response;
    },
    [],
  );

  const getVersion = useCallback(async (): Promise<string> => {
    const {
      data: { version },
    } = await $fetch({
      method: RequestMethod.GET,
      pathname: "/version",
    });
    return version;
  }, [$fetch]);

  return {
    fetch: $fetch,
    getVersion,
  };
};
