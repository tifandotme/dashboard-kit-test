import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import React from "react"

const badgeVariants = cva(
  "inline-flex items-center rounded-lg border px-3 py-1 text-[11px] font-semibold uppercase transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-gray-100 text-gray-400 hover:bg-gray-100/80 dark:bg-gray-800 dark:text-gray-600 hover:dark:bg-gray-800/80",
        urgent:
          "bg-yellow-400 text-white hover:bg-yellow-400/80 dark:bg-yellow-700 dark:text-black dark:hover:bg-yellow-700/80",
        new: "bg-green-400 text-white hover:bg-green-400/80 dark:bg-green-700 dark:text-black dark:hover:bg-green-700/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge }
