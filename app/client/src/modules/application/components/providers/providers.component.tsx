import { Outlet } from "react-router";
import { FingerprintProvider, TitleProvider } from "shared/hooks";
import React from "react";
import { ModalProvider } from "@openhotel/web-components";

export const ProvidersComponent = () => {
  return (
    <TitleProvider>
      <ModalProvider>
        <FingerprintProvider>
          <Outlet />
        </FingerprintProvider>
      </ModalProvider>
    </TitleProvider>
  );
};
