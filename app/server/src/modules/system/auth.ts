import { System } from "modules/system/main.ts";
import { getRandomString } from "@oh/utils";

type Props = {
  url: string;
  connectionToken?: string;
};

export const auth = () => {
  let $hotelId: string;
  let $integrationId: string;
  //TODO permanent op
  let $ownerId: string;

  const state = getRandomString(64);

  const load = async () => {
    if (!(await isAuthEnabled()))
      console.error("/!\\ Auth service is down or Hotel License is not valid!");
  };

  const isAuthEnabled = async () => {
    if (!System.getConfig().auth.enabled) return true;

    try {
      const { hotelId, accountId, integrationId } = await $fetch({
        url: "/hotel/license",
      });
      $hotelId = hotelId;
      $integrationId = integrationId;
      $ownerId = accountId;
      return true;
    } catch (e) {
      return false;
    }
  };

  const $fetch = async ({ url, connectionToken }: Props) => {
    const config = System.getConfig();
    const { status, data } = await (
      await fetch(`${config.auth.api}/api/v3${url}`, {
        headers: new Headers({
          "Content-Type": "application/json",
          "license-token": config.auth.licenseToken,
          ...(connectionToken
            ? {
                "connection-token": connectionToken,
              }
            : {}),
        }),
      })
    ).json();
    return data;
  };

  const getHotelId = () => $hotelId;
  const getIntegrationId = () => $integrationId;
  const getOwnerId = () => $ownerId;

  const getState = () => state;

  const getConnectionUrl = () => {
    const config = System.getConfig();

    const composedRedirectUrl = new URL(`${config.auth.api}/connection`);
    composedRedirectUrl.searchParams.append("state", state);

    composedRedirectUrl.searchParams.append("hotelId", $hotelId);
    composedRedirectUrl.searchParams.append("integrationId", $integrationId);

    return composedRedirectUrl.href;
  };

  return {
    load,
    isAuthEnabled,

    fetch: $fetch,

    getHotelId,
    getIntegrationId,
    getOwnerId,

    getState,

    getConnectionUrl,
  };
};
