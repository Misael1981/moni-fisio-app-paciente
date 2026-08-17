"use client"

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
  PatientLoginInput,
  patientLoginSchema,
  PatientLoginValues,
} from "@/schemas/patient-login.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

const FormLogin = () => {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PatientLoginInput, unknown, PatientLoginValues>({
    resolver: zodResolver(patientLoginSchema),
    defaultValues: { cpf: "", pin: "" },
  })

  const onSubmit = async (data: PatientLoginValues) => {
    setIsLoading(true)
    setError(null)

    const result = await signIn("credentials", {
      cpf: data.cpf,
      pin: data.pin,
      redirect: false,
    })

    setIsLoading(false)

    if (result?.error === "ACCOUNT_LOCKED") {
      setError(
        "Conta bloqueada temporariamente. Tente novamente em alguns minutos.",
      )
      return
    }

    if (result?.error) {
      setError("CPF ou PIN incorretos.")
      return
    }

    router.push("/dashboard")
    router.refresh()
  }

  return (
    <form className="w-full space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field>
          <FieldLabel>CPF</FieldLabel>
          <Input
            placeholder="XXX.XXX.XXX-XX"
            inputMode="numeric"
            {...register("cpf")}
          />
          <FieldError>{errors.cpf?.message}</FieldError>
        </Field>

        <Field>
          <FieldLabel>Senha</FieldLabel>
          <FieldDescription>Senha de 6 números</FieldDescription>
          <Input
            inputMode="numeric"
            maxLength={6}
            placeholder="••••••••"
            {...register("pin")}
          />
          <FieldError>{errors.pin?.message}</FieldError>
        </Field>

        {error && (
          <p role="alert" className="text-destructive text-sm">
            {error}
          </p>
        )}
      </FieldGroup>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Acessando..." : "Acessar App"}
      </Button>
    </form>
  )
}

export default FormLogin
