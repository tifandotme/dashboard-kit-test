import type { User } from "@/types"
import { create } from "zustand"
import { persist } from "zustand/middleware"

type State = {
  loading: boolean
  user: User | null
  theme: "light" | "dark"
}

type Actions = {
  updateUser: (user: User | null) => void
  updateTheme: (theme: "light" | "dark") => void
}

export const useStore = create<State & Actions>()(
  persist(
    (set) => ({
      loading: true,
      user: null,
      theme: "light",

      updateUser: (user) => set(() => ({ user })),
      updateTheme: (theme) => set(() => ({ theme })),
    }),
    {
      name: "userStorage",
      partialize: (state) => ({ user: state.user, theme: state.theme }),
    },
  ),
)
