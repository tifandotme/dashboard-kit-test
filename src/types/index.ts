import type { LoaderFunction } from "react-router-dom"

export type User = {
  id: number
  email: string
  password: string
  role: "admin" | "guest"
}

export type Stats = {
  hour: string
  today: number
  yesterday: number
}

export type Task = {
  id: number
  isDone: boolean
  text: string
  label: "urgent" | "new" | null
}

export type Statuses = {
  unresolved: number
  overdue: number
  open: number
  onHold: number
}

// React Router's loader type so that we can get a type-safe data in useLoaderData
export type LoaderData<TLoaderFn extends LoaderFunction> =
  Awaited<ReturnType<TLoaderFn>> extends Response | infer D ? D : never
