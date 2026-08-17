// schemas/change-pin.schema.ts
import { z } from "zod"

export const changePinSchema = z
  .object({
    pin: z
      .string()
      .length(6, "O PIN deve ter 6 dígitos")
      .regex(/^\d{6}$/, "O PIN deve conter apenas números"),
    confirmPin: z.string(),
  })
  .refine((data) => data.pin === data.confirmPin, {
    message: "Os PINs não coincidem",
    path: ["confirmPin"],
  })

export type ChangePinInput = z.input<typeof changePinSchema>
export type ChangePinValues = z.output<typeof changePinSchema>
