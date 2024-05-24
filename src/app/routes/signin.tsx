import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { ErrorMessage, Label } from "@/components/ui/form"
import { Input, type InputProps } from "@/components/ui/input"
import { api } from "@/lib/api-client"
import { useStore } from "@/lib/stores"
import { cn } from "@/lib/utils"
import { type User } from "@/types"
import { EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

type FormData = {
  email: string
  password: string
}

export function SignInPage() {
  const navigate = useNavigate()
  const updateUser = useStore((state) => state.updateUser)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isSubmitted },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: FormData) => {
    try {
      const res = await api.get<User[]>("users")
      const user = res.data.find((user) => user.email === data.email)

      if (!user) {
        throw new Error("User not found")
      }
      if (user.password !== data.password) {
        throw new Error("Password is incorrect")
      }

      updateUser(user)
      navigate("/")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "An error occurred")
    }
  }

  return (
    <div className="min-h-screen overflow-auto bg-black/80 dark:bg-white/10">
      <main className="w-full bg-background px-8 py-10 max-xs:min-h-screen max-xs:!pt-20 xs:mx-auto xs:my-32 xs:w-96 xs:rounded-lg">
        <header className="mb-10 flex flex-col gap-8">
          <div className="w-full space-y-3 text-center">
            <Icons.Logo className="inline-block size-12" />
            <h1 className="text-lg font-bold tracking-wide text-gray-400 opacity-70">
              Dashboard Kit
            </h1>
          </div>
          <div className="w-full space-y-3 text-center">
            <h2 className="text-balance text-2xl font-bold tracking-tight text-gray-800 dark:text-gray-200">
              Log In to Dashboard Kit
            </h2>
            <p className="text-sm leading-tight tracking-tight text-gray-400">
              Enter your email and password below
            </p>
          </div>
        </header>
        <form className="mb-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="Email address"
              {...register("email", {
                required: true,
                setValueAs: (value: string) => value.toLowerCase().trim(),
              })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <PasswordInput
              id="password"
              placeholder="Password"
              {...register("password", {
                required: true,
                minLength: {
                  value: 8,
                  message: "Minimum password is 8 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Minimum password is 20 characters",
                },
              })}
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </div>
          <Button
            className="w-full"
            type="submit"
            size="lg"
            disabled={(isSubmitted && !isValid) || isSubmitting}
          >
            Log In
          </Button>
        </form>
        <p className="text-center text-sm text-gray-400">
          Don&apos;t have an account?{" "}
          <span className="font-semibold text-primary">Sign Up</span>
        </p>
      </main>
    </div>
  )
}

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
      <div className="relative">
        <Input
          className={cn("pr-10", className)}
          type={showPassword ? "text" : "password"}
          ref={ref}
          {...props}
        />
        <Button
          type="button"
          variant="unstyled"
          size="icon"
          className="absolute right-0 top-0 h-full cursor-default px-3 py-1 text-gray-400"
          onClick={() => setShowPassword((prev) => !prev)}
          disabled={props.value === "" || props.disabled}
        >
          {showPassword ?
            <EyeNoneIcon className="size-4" />
          : <EyeOpenIcon className="size-4" />}
        </Button>
      </div>
    )
  },
)
