import { z } from 'zod'

import { createResponseSchema } from 'api/core/framework/use-case/base'

export const balanceOfType = z.object({
  account_id: z.string(),
  balance: z.string(),
})

export const BalanceOfResponseType = balanceOfType

/* Request Schema */

export const BalanceOfRequest = balanceOfType.pick({
  account_id: true,
})

export type BalanceOfRequest = z.infer<typeof BalanceOfRequest>

/* Response Schema */

export const BalanceOfResponse = createResponseSchema(BalanceOfResponseType)

export type BalanceOfResponse = z.infer<typeof BalanceOfResponse>
