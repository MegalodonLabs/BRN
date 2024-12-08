import { z } from 'zod'

import { createResponseSchema } from 'api/core/framework/use-case/base'

export const transferType = z.object({
  sender_id: z.string(),
  sender_secret_key: z.string(),
  receiver_id: z.string(),
  amount: z.string(),
  memo: z.string().optional(),
})

export const transferResponseType = transferType.omit({ sender_secret_key: true })

/* Request Schema */

export const TransferRequest = transferType.pick({
  sender_id: true,
  sender_secret_key: true,
  receiver_id: true,
  amount: true,
  memo: true,
})

export type TransferRequest = z.infer<typeof TransferRequest>

/* Response Schema */

export const TransferResponse = createResponseSchema(transferResponseType)

export type TransferResponse = z.infer<typeof TransferResponse>
