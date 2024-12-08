import { z } from 'zod'

import { createResponseSchema } from 'api/core/framework/use-case/base'

export const totalSupplyType = z.object({
  total_supply: z.string(),
})

export const totalSupplyResponseType = totalSupplyType

/* Response Schema */

export const TotalSupplyResponse = createResponseSchema(totalSupplyResponseType)

export type TotalSupplyResponse = z.infer<typeof TotalSupplyResponse>
