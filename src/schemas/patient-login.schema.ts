import z from "zod"

export const patientLoginSchema = z.object({
  cpf: z
    .string()
    .min(1, "CPF é obrigatório")
    .transform((val) => val.replace(/\D/g, ""))
    .pipe(z.string().length(11, "CPF deve ter 11 dígitos")),
  pin: z
    .string()
    .length(6, "O PIN deve ter 6 dígitos")
    .regex(/^\d{6}$/, "O PIN deve conter apenas números"),
})

export type PatientLoginInput = z.input<typeof patientLoginSchema>
export type PatientLoginValues = z.output<typeof patientLoginSchema>
