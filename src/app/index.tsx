import { router } from "@/app/routes"
import { Toaster } from "@/components/ui/toast"
import { RouterProvider } from "react-router-dom"

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  )
}

export default App
