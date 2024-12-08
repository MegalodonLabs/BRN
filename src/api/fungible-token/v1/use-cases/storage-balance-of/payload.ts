import { z } from 'zod'

import { createResponseSchema } from 'api/core/framework/use-case/base'

/* Request Schema */

export const getStorageBalanceType = z.object({
  account_id: z.string(),
})

export const getStorageBalanceResponseType = z.object({
  total: z.string().nullable(),
  available: z.string(),
})

export const GetStorageBalanceRequest = getStorageBalanceType.pick({
  account_id: true,
})

export type GetStorageBalanceRequest = z.infer<typeof GetStorageBalanceRequest>

/* Response Schema */

export const GetStorageBalanceResponse = createResponseSchema(getStorageBalanceResponseType)

export type GetStorageBalanceResponse = z.infer<typeof GetStorageBalanceResponse>
