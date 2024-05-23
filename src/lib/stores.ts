import type { User } from "@/types"
import { create } from "zustand"
import { persist } from "zustand/middleware"

type State = {
  loading: boolean
  user: User | null
}

type Actions = {
  updateUser: (user: User | null) => void
}

export const useStore = create<State & Actions>()(
  persist(
    (set) => ({
      loading: true,
      user: null,

      updateUser: (user) => set(() => ({ user })),
    }),
    {
      name: "userStorage",
      partialize: (state) => ({ user: state.user }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.loading = false
        }
      },
      skipHydration: true,
    },
  ),
)
