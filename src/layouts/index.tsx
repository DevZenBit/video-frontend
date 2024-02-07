import { ReactElement } from "react";
import AuthGuard from "@/utils/guards/AuthGuard";

import { MainLayout } from "./MainLayout";
import { LayoutVariants } from "./enums";

interface Props {
  children: ReactElement;
  variant?: LayoutVariants.withAuth;
}

export default function Layout({ variant, children }: Props) {
  if (variant === LayoutVariants.withAuth) {
    return (
      <MainLayout>
        <AuthGuard>{children}</AuthGuard>
      </MainLayout>
    );
  }

  return <MainLayout>{children}</MainLayout>;
}
