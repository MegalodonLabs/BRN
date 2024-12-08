import { z } from 'zod'

import { createResponseSchema } from 'api/core/framework/use-case/base'

/* Request Schema */
export const StorageDepositRequest = z.object({
  account_id: z.string(),
  secret_key: z.string(),
  registration_only: z.boolean().nullable(),
  amount: z.string(),
})

export type StorageDepositRequest = z.infer<typeof StorageDepositRequest>

/* Response Schema */
export const StorageDepositResponse = createResponseSchema(
  z.object({
    total: z.string(),
    available: z.string(),
  })
)

export type StorageDepositResponse = z.infer<typeof StorageDepositResponse>
