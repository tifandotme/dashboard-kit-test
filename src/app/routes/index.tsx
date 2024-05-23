import { RootPage } from "@/app/routes/root"
import { SignInPage } from "@/app/routes/signin"
import { RootLayout } from "@/components/layouts/root-layout"
import { createBrowserRouter } from "react-router-dom"

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: RootPage,
      },
      // {
      //   path: ":id",
      //   Component: DetailPage,
      // },
    ],
  },
  {
    path: "signin",
    Component: SignInPage,
  },
  // {
  //   path: "auth",
  //   Component: AuthLayout,
  //   children: [
  //     {
  //       path: "signin",
  //       Component: SignInPage,
  //     },
  //     {
  //       path: "sso-callback",
  //       Component: SSOCallbackPage,
  //     },
  //   ],
  // },
  // {
  //   path: "*",
  //   element: <NotFoundPage />,
  // },
])
