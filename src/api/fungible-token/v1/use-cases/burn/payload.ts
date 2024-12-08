import { z } from 'zod'

import { createResponseSchema } from 'api/core/framework/use-case/base'

export const burnType = z.object({
  owner_id: z.string(),
  owner_secret_key: z.string(),
  amount: z.string(),
})

export const BurnResponseType = burnType.pick({ owner_id: true, amount: true })

/* Request Schema */

export const BurnRequest = burnType

export type BurnRequest = z.infer<typeof BurnRequest>

/* Response Schema */

export const BurnResponse = createResponseSchema(BurnResponseType)

export type BurnResponse = z.infer<typeof BurnResponse>
