import React from "react";
import {
  BoxProps,
  BackgroundComponent,
  CardComponent,
  SocialComponent,
  LicenseComponent,
} from "@openhotel/web-components";
//@ts-ignore
import styles from "./card-layout.module.scss";

type Props = {
  children?: React.ReactNode;
} & Partial<BoxProps>;

export const CardLayoutComponent: React.FC<Props> = ({ ...props }) => {
  return (
    <BackgroundComponent>
      <CardComponent {...props} className={styles.card} />
      <div className={styles.footer}>
        <SocialComponent />
        <LicenseComponent />
      </div>
    </BackgroundComponent>
  );
};
