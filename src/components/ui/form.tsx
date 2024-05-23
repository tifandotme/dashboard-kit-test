import { cn } from "@/lib/utils"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"
import React from "react"

const labelVariants = cva(
  "h-4 text-xs font-bold uppercase leading-none text-[#9FA2B4] peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    className={cn(labelVariants(), className)}
    ref={ref}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

const ErrorMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-sm font-medium text-red-400", className)}
      {...props}
    >
      {children}
    </p>
  )
})
ErrorMessage.displayName = "FormMessage"

export { Label, ErrorMessage }
