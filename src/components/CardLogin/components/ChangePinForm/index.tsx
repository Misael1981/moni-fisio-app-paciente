"use client"

import { changePinAction } from "@/app/actions/change-pin-action"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  changePinSchema,
  type ChangePinInput,
  type ChangePinValues,
} from "@/schemas/change-pin.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"

const ChangePinForm = () => {
  const router = useRouter()
  const { update } = useSession()
  const [isPending, startTransition] = useTransition()
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePinInput, unknown, ChangePinValues>({
    resolver: zodResolver(changePinSchema),
    defaultValues: { pin: "", confirmPin: "" },
  })

  const onSubmit = async (data: ChangePinValues) => {
    setServerError(null)

    startTransition(async () => {
      const result = await changePinAction(data.pin)

      if (result?.error) {
        setServerError("Não foi possível salvar o novo PIN. Tente novamente.")
        return
      }

      await update()

      router.push("/dashboard")
      router.refresh()
    })
  }

  return (
    <form className="w-full space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field>
          <FieldLabel>Novo PIN</FieldLabel>
          <FieldDescription>
            Senha de 6 números, só você vai saber
          </FieldDescription>
          <Input
            inputMode="numeric"
            maxLength={6}
            placeholder="••••••••"
            {...register("pin")}
          />
          <FieldError>{errors.pin?.message}</FieldError>
        </Field>

        <Field>
          <FieldLabel>Confirme o novo PIN</FieldLabel>
          <Input
            inputMode="numeric"
            maxLength={6}
            placeholder="••••••••"
            {...register("confirmPin")}
          />
          <FieldError>{errors.confirmPin?.message}</FieldError>
        </Field>

        {serverError && (
          <p role="alert" className="text-destructive text-sm">
            {serverError}
          </p>
        )}
      </FieldGroup>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Salvando..." : "Confirmar novo PIN"}
      </Button>
    </form>
  )
}

export default ChangePinForm
