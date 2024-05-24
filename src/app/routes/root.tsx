import type { rootLoader } from "@/app/routes"
import { Icons } from "@/components/icons"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import type { LoaderData, Task } from "@/types"
import { useLoaderData } from "react-router-dom"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

export function RootPage() {
  const { stats, tasks, statuses } = useLoaderData() as LoaderData<
    typeof rootLoader
  >

  return (
    <div className="mb-4 space-y-5">
      <div className="max-lg:grid-ros-2 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Object.entries(statuses.data).map(([key, value]) => (
          <Card
            key={key}
            className="group flex min-h-[135px] flex-col justify-center gap-3 text-center hover:border-primary"
          >
            <p className="text-[1.1875rem] font-bold text-[#9FA2B4] group-hover:text-primary">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </p>
            <p className="text-[2.5rem] font-bold leading-none group-hover:text-primary">
              {value}
            </p>
          </Card>
        ))}
      </div>

      <Card className="flex h-[546px]">
        <div className="w-full p-5 md:p-8 lg:w-[70%]">
          <CardTitle className="mb-2">Today's trends</CardTitle>
          {/* <CardDescription>as of 25 May 2019, 09:41 PM</CardDescription> */}
          {/* create date like abovewith Date object */}
          <CardDescription>
            as of{" "}
            {new Intl.DateTimeFormat("en-US", {
              dateStyle: "long",
              timeStyle: "short",
            }).format(Date.now())}
          </CardDescription>
          {/* NOTE error logs about "defaultProps" is being fixed: https://github.com/recharts/recharts/issues/3615 */}
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={stats.data}
              margin={{ top: 40, right: 0, left: 0, bottom: 40 }}
            >
              <defs>
                <linearGradient id="colorToday" x1="0" y1="0" x2="1" y2="0">
                  <stop
                    offset="5%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity={0.2}
                    direction="y"
                  />
                  <stop
                    offset="20%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="hour"
                axisLine={false}
                tickLine={false}
                tickMargin={10}
                tick={{ fill: "#9FA2B4" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                orientation="right"
                mirror={true}
                tick={{ fill: "#9FA2B4" }}
                className="-translate-y-5"
              />
              <CartesianGrid vertical={false} />
              <Tooltip cursor={{ stroke: "#DFE0EB" }} />
              <Area
                type="monotone"
                dataKey="yesterday"
                stroke="#DFE0EB"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorYesterday)"
              />
              <Area
                type="monotone"
                dataKey="today"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorToday)"
                activeDot={{
                  r: 7,
                  fill: "white",
                  strokeWidth: 5,
                  stroke: "hsl(var(--primary))",
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex w-[30%] flex-col border-l max-lg:hidden [&>*:not(:last-child)]:border-b">
          <div className="flex h-full flex-col items-center justify-center gap-1.5">
            <p className="font-semibold text-[#9FA2B4]">Resolved</p>
            <p className="text-2xl font-bold leading-none">449</p>
          </div>
          <div className="flex h-full flex-col items-center justify-center gap-1.5">
            <p className="font-semibold text-[#9FA2B4]">Received</p>
            <p className="text-2xl font-bold leading-none">426</p>
          </div>
          <div className="flex h-full flex-col items-center justify-center gap-1.5">
            <p className="font-semibold text-[#9FA2B4]">
              Average first response time
            </p>
            <p className="text-2xl font-bold leading-none">33m</p>
          </div>
          <div className="flex h-full flex-col items-center justify-center gap-1.5">
            <p className="font-semibold text-[#9FA2B4]">Average reponse time</p>
            <p className="text-2xl font-bold leading-none">3h 3m</p>
          </div>
          <div className="flex h-full flex-col items-center justify-center gap-1.5">
            <p className="font-semibold text-[#9FA2B4]">
              Resolution within SLA
            </p>
            <p className="text-2xl font-bold leading-none">94%</p>
          </div>
        </div>
      </Card>

      <div className="flex gap-5 max-lg:flex-col">
        <TicketsCard />
        <TasksCard tasks={tasks.data} />
      </div>
    </div>
  )
}

function TicketsCard() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Unresolved Tickes</CardTitle>
        <CardAction className="flex justify-end">
          <span className="text-right text-sm leading-none text-primary">
            View details
          </span>
        </CardAction>
        <CardDescription>
          Group: <span className="font-semibold">Support</span>
        </CardDescription>
      </CardHeader>
      <div className="flex h-[58px] items-center justify-between border-b px-5 last:border-b-0 md:px-8">
        <p className="text-sm font-medium">Waiting on Feature Request</p>
        <p className="text-sm text-[#9FA2B4]">420</p>
      </div>
      <div className="flex h-[58px] items-center justify-between border-b px-5 last:border-b-0 md:px-8">
        <p className="text-sm font-medium">Awaiting Customer Response</p>
        <p className="text-sm text-[#9FA2B4]">420</p>
      </div>
      <div className="flex h-[58px] items-center justify-between border-b px-5 last:border-b-0 md:px-8">
        <p className="text-sm font-medium">Awaiting Developer Fix</p>
        <p className="text-sm text-[#9FA2B4]">420</p>
      </div>
      <div className="flex h-[58px] items-center justify-between border-b px-5 last:border-b-0 md:px-8">
        <p className="text-sm font-medium">Pending</p>
        <p className="text-sm text-[#9FA2B4]">420</p>
      </div>
    </Card>
  )
}

function TasksCard({ tasks }: { tasks: Task[] }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Tasks</CardTitle>
        <CardAction className="flex justify-end">
          <span className="text-right text-sm leading-none text-primary">
            View all
          </span>
        </CardAction>
        <CardDescription>Today</CardDescription>
      </CardHeader>
      <div className="relative">
        <input
          className="h-[58px] w-full items-center justify-between border-0 border-b border-border bg-white px-5 py-0 text-sm font-medium text-[#9FA2B4] focus-visible:ring-0 dark:bg-black md:px-8"
          type="text"
          placeholder="Create new task"
        />
        <Button className="absolute right-0 top-2 px-5" variant="unstyled">
          <Icons.TaskPlus className="size-6" />
        </Button>
      </div>
      {tasks.map((task) => (
        <div className="flex h-[58px] items-center justify-between border-b px-5 last:border-b-0 md:px-8">
          <div className="flex items-center space-x-4">
            <Checkbox id={task.id.toString()} />
            <label
              htmlFor={task.id.toString()}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {task.text}
            </label>
          </div>
          <Badge variant={task.label ?? "default"}>
            {task.label ?? "default"}
          </Badge>
        </div>
      ))}
    </Card>
  )
}
