import { z } from 'zod'

import { createResponseSchema } from 'api/core/framework/use-case/base'

export const transferCallType = z.object({
  sender_id: z.string(),
  sender_secret_key: z.string(),
  receiver_id: z.string(),
  amount: z.string(),
  msg: z.string(),
  value: z.string(),
  memo: z.string().optional(),
})

export const transferCallResponseType = transferCallType.omit({ sender_secret_key: true })

/* Request Schema */

export const TransferCallRequest = transferCallType.pick({
  sender_id: true,
  sender_secret_key: true,
  receiver_id: true,
  amount: true,
  msg: true,
  memo: true,
})

export type TransferCallRequest = z.infer<typeof TransferCallRequest>

/* Response Schema */

export const TransferCallResponse = createResponseSchema(transferCallResponseType)

export type TransferCallResponse = z.infer<typeof TransferCallResponse>
