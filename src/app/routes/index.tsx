import { RootPage } from "@/app/routes/root"
import { SignInPage } from "@/app/routes/signin"
import { RootLayout } from "@/components/layouts/root-layout"
import { api } from "@/lib/api-client"
import { useStore } from "@/lib/stores"
import type { Stats, Statuses, Task } from "@/types"
import { createBrowserRouter, redirect } from "react-router-dom"

export const rootLoader = async () => {
  const user = useStore.getState().user
  if (!user) {
    return redirect("/signin")
  }

  const theme = useStore.getState().theme
  if (theme === "dark") {
    document.documentElement.classList.add("dark")
  }

  const data = {
    statuses: await api.get<Statuses>("/statuses"),
    tasks: await api.get<Task[]>("/tasks"),
    stats: await api.get<Stats[]>("/stats"),
  }

  return data
}

export const authLoader = () => {
  const user = useStore.getState().user
  if (user) {
    return redirect("/")
  }

  const theme = useStore.getState().theme
  if (theme === "dark") {
    document.documentElement.classList.add("dark")
  }

  return null
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        loader: rootLoader,
        Component: RootPage,
      },
    ],
  },
  {
    path: "signin",
    loader: authLoader,
    Component: SignInPage,
  },
  // {
  //   path: "*",
  //   element: <NotFoundPage />,
  // },
])
