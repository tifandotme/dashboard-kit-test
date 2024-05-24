import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { useStore } from "@/lib/stores"
import { ExitIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"

const NAV_ITEMS: { label: keyof typeof Icons; href: string }[] = [
  { label: "Overview", href: "/" },
  { label: "Tickets", href: "/tickets" },
  { label: "Ideas", href: "/ideas" },
  { label: "Contacts", href: "/contacts" },
  { label: "Agents", href: "/agents" },
  { label: "Articles", href: "/articles" },
]

export function RootLayout() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const updateUser = useStore((state) => state.updateUser)
  const updateTheme = useStore((state) => state.updateTheme)
  const theme = useStore((state) => state.theme)

  return (
    <>
      <main className="min-h-screen bg-[hsl(228,45%,98%)] p-4 dark:bg-[hsl(228,45%,4%)] max-xs:pb-[68px] xs:ml-[64px] lg:ml-[250px] lg:p-[1.875rem]">
        <header className="mb-12 flex h-11 items-center justify-between">
          <h2 className="font-bold text-gray-700 dark:text-gray-300 lg:text-2xl">
            Overview
          </h2>

          <div className="flex items-center">
            <Button
              className="text-[#C5C7CD] hover:text-primary"
              variant="unstyled"
              size="icon"
            >
              <Icons.Search className="size-4" />
            </Button>
            <Button
              className="text-[#C5C7CD] hover:text-primary"
              variant="unstyled"
              size="icon"
            >
              <Icons.NotificationBell className="size-4" />
            </Button>
            <Button
              className="text-[#C5C7CD] hover:text-primary"
              variant="unstyled"
              size="icon"
              onClick={() => {
                updateTheme(theme === "dark" ? "light" : "dark")
                document.documentElement.classList.toggle("dark")
              }}
            >
              {theme === "dark" ?
                <SunIcon className="size-4" />
              : <MoonIcon className="size-4" />}
            </Button>

            <div className="mx-3 h-7 w-px bg-gray-200" />

            <Button
              className="text-[#C5C7CD] hover:text-primary xs:hidden"
              variant="unstyled"
              size="icon"
            >
              <Icons.Subscriptions className="size-4" />
            </Button>
            <Button
              className="-mr-2 text-[#C5C7CD] hover:text-primary xs:hidden"
              variant="unstyled"
              size="icon"
            >
              <Icons.Settings className="size-4" />
            </Button>
            <Button
              className="flex h-11 gap-2 p-1 max-xs:hidden"
              variant="unstyled"
            >
              <span className="text-sm font-semibold">Jones Ferdinand</span>
              <img
                className="size-full rounded-full ring-2 ring-gray-200 ring-offset-2"
                src="https://i.pravatar.cc/400?img=69"
              />
            </Button>
          </div>
        </header>

        <Outlet />
      </main>

      {/* Tablet & Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 h-full overflow-y-scroll bg-background-nav max-lg:text-center max-xs:hidden xs:w-[64px] lg:w-[250px]">
        <h1 className="my-9 flex w-full justify-center gap-4">
          <Icons.Logo
            className="size-8"
            aria-hidden="true"
            aria-label="Dashboard Kit Logo"
          />
          <span className="text-lg font-bold tracking-wide text-gray-400 opacity-70 dark:text-black max-lg:hidden">
            Dashboard Kit
          </span>
        </h1>
        {NAV_ITEMS.map(({ label, href }) => {
          const Icon = Icons[label]
          return (
            <Link
              data-active={pathname === href}
              className="group relative flex items-center gap-6 px-6 py-[1.125rem] text-gray-400 opacity-40 hover:bg-[hsl(233,8%,25%)] hover:text-white hover:opacity-100 data-[active=true]:bg-[hsl(233,8%,25%)] data-[active=true]:text-white data-[active=true]:opacity-100 dark:text-black dark:hover:bg-[hsl(233,8%,50%)] dark:data-[active=true]:bg-[hsl(233,8%,50%)] max-lg:justify-center"
              key={href}
              to={href}
            >
              {Icon({ className: "size-4" })}
              <span className="text-indigo-100 dark:text-black max-lg:hidden">
                {label}
              </span>
              <div className="absolute left-0 hidden h-full w-[3px] bg-white group-hover:block group-data-[active=true]:block dark:bg-black" />
            </Link>
          )
        })}

        <div className="my-2 h-px w-full bg-zinc-700" />

        <div className="group relative flex items-center gap-6 px-6 py-[1.125rem] text-gray-400 opacity-40 hover:bg-[hsl(233,8%,25%)] hover:text-white hover:opacity-100 dark:text-black dark:hover:bg-[hsl(233,8%,50%)] max-lg:justify-center">
          <Icons.Settings className="size-4" />
          <span className="text-indigo-100 dark:text-black max-lg:hidden">
            Settings
          </span>
          <div className="absolute left-0 hidden h-full w-[3px] bg-white group-hover:block group-data-[active=true]:block dark:bg-black" />
        </div>
        <div className="group relative flex items-center gap-6 px-6 py-[1.125rem] text-gray-400 opacity-40 hover:bg-[hsl(233,8%,25%)] hover:text-white hover:opacity-100 dark:text-black dark:hover:bg-[hsl(233,8%,50%)] max-lg:justify-center">
          <Icons.Subscriptions className="size-4" />
          <span className="text-indigo-100 dark:text-black max-lg:hidden">
            Subscriptions
          </span>
          <div className="absolute left-0 hidden h-full w-[3px] bg-white group-hover:block group-data-[active=true]:block dark:bg-black" />
        </div>
        <button
          className="group relative flex w-full items-center gap-6 px-6 py-[1.125rem] text-gray-400 opacity-40 hover:bg-[hsl(233,8%,25%)] hover:text-white hover:opacity-100 dark:text-black dark:hover:bg-[hsl(233,8%,50%)] max-lg:justify-center"
          type="button"
          onClick={() => {
            updateUser(null)
            navigate("/signin")
          }}
        >
          <ExitIcon className="size-4 text-gray-100 dark:text-black" />
          <span className="text-indigo-100 dark:text-black max-lg:hidden">
            Log out
          </span>
          <div className="absolute left-0 hidden h-full w-[3px] bg-white group-hover:block group-data-[active=true]:block dark:bg-black" />
        </button>
      </aside>

      {/* Mobile Bottombar */}
      <aside className="fixed bottom-0 flex w-full justify-between bg-background-nav pb-4 xs:hidden">
        {NAV_ITEMS.map(({ label, href }) => {
          const Icon = Icons[label]
          return (
            <Link
              data-active={pathname === href}
              className="w p-4 text-[#9FA2B4] opacity-40 hover:text-white hover:opacity-100 data-[active=true]:text-white data-[active=true]:opacity-100 dark:text-black"
              key={href}
              to={href}
            >
              {Icon({ className: "size-5" })}
            </Link>
          )
        })}
      </aside>
    </>
  )
}
