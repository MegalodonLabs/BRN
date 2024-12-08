import { z } from 'zod'

import { createResponseSchema } from 'api/core/framework/use-case/base'

export const mintType = z.object({
  owner_id: z.string(),
  owner_secret_key: z.string(),
  amount: z.string(),
})

export const mintResponseType = mintType.pick({ owner_id: true, amount: true })

/* Request Schema */

export const MintRequest = mintType

export type MintRequest = z.infer<typeof MintRequest>

/* Response Schema */

export const MintResponse = createResponseSchema(mintResponseType)

export type MintResponse = z.infer<typeof MintResponse>
