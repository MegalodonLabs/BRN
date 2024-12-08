import { z } from 'zod'

import { createResponseSchema } from 'api/core/framework/use-case/base'

/* Response Schema */
export const OwnerResponse = createResponseSchema(
  z.object({
    owner_id: z.string(),
  })
)

export type OwnerResponse = z.infer<typeof OwnerResponse>
