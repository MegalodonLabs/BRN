import { z } from 'zod'

import { createResponseSchema } from 'api/core/framework/use-case/base'

export const unblockAccountType = z.object({
  account_id: z.string(),
  owner_id: z.string(),
  owner_secret_key: z.string(),
})

export const unblockAccountResponseType = unblockAccountType.pick({ account_id: true })

/* Request Schema */

export const UnblockAccountRequest = unblockAccountType

export type UnblockAccountRequest = z.infer<typeof unblockAccountType>

/* Response Schema */

export const UnblockAccountResponse = createResponseSchema(unblockAccountResponseType)

export type UnblockAccountResponse = z.infer<typeof UnblockAccountResponse>
