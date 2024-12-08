import { z } from 'zod'

import { createResponseSchema } from 'api/core/framework/use-case/base'

/* Request Schema */
export const StorageWithdrawRequest = z.object({
  account_id: z.string(),
  secret_key: z.string(),
  amount: z.string(),
})

export type StorageWithdrawRequest = z.infer<typeof StorageWithdrawRequest>

/* Response Schema */
export const StorageWithdrawResponse = createResponseSchema(
  z.object({
    total: z.string(),
    available: z.string(),
  })
)

export type StorageWithdrawResponse = z.infer<typeof StorageWithdrawResponse>
