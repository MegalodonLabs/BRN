import { z } from 'zod'

import { createResponseSchema } from 'api/core/framework/use-case/base'

export const blockAccountType = z.object({
  account_id: z.string(),
  owner_id: z.string(),
  owner_secret_key: z.string(),
})

export const blockAccountResponseType = blockAccountType.pick({ account_id: true })

/* Request Schema */

export const BlockAccountRequest = blockAccountType

export type BlockAccountRequest = z.infer<typeof blockAccountType>

/* Response Schema */

export const BlockAccountResponse = createResponseSchema(blockAccountResponseType)

export type BlockAccountResponse = z.infer<typeof BlockAccountResponse>
