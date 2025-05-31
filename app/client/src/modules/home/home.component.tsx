import React, { useEffect, useState } from "react";
import { ButtonComponent } from "@openhotel/web-components";
import { useApi, useCookies } from "shared/hooks";
import { RequestMethod } from "shared/enums";
import { useSearchParams } from "react-router-dom";

export const HomeComponent: React.FC = () => {
  const { fetch } = useApi();
  const { set, get } = useCookies();
  const [searchParams] = useSearchParams();

  const [account, setAccount] = useState<any>(null);
  const [connectionUrl, setConnectionUrl] = useState<string>(null);

  useEffect(() => {
    fetch({
      method: RequestMethod.GET,
      pathname: "/account",
      headers: {
        token: get("token"),
      },
    }).then(({ data: { account } }) => setAccount(account));

    fetch({ method: RequestMethod.GET, pathname: "/auth" }).then(
      ({ data: { connectionUrl } }) => setConnectionUrl(connectionUrl),
    );
  }, [fetch, setAccount, setConnectionUrl, get]);

  useEffect(() => {
    if (!searchParams.has("state") || !searchParams.has("token")) return;

    const body = {
      state: searchParams.get("state"),
      token: searchParams.get("token"),
    };
    window.history.pushState(null, null, "/");

    fetch({ method: RequestMethod.POST, pathname: "/auth/login", body }).then(
      ({ data: { account, token } }) => {
        setAccount(account);
        set("token", token, 10_000);
      },
    );
  }, [searchParams, setAccount, set]);

  console.log(account);
  return (
    <div>
      <h2>Home</h2>
      <label>
        {account
          ? `Welcome back ${account.username}!`
          : "Welcome to OpenHotel!"}
      </label>
      <p />
      <ButtonComponent
        color="yellow"
        variant="3d"
        onPointerDown={() =>
          window.location.replace("https://client.openhotel.club")
        }
      >
        Play!
      </ButtonComponent>
      <p />
      {account ? null : (
        <ButtonComponent
          color="light"
          onPointerDown={() => window.location.replace(connectionUrl)}
        >
          Login
        </ButtonComponent>
      )}
    </div>
  );
};
