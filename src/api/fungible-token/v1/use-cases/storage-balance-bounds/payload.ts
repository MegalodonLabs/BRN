import { z } from 'zod'

import { createResponseSchema } from 'api/core/framework/use-case/base'

/* Response Schema */
export const StorageBalanceBoundsResponse = createResponseSchema(
  z.object({
    min: z.string(),
    max: z.string().nullable(),
  })
)

export type StorageBalanceBoundsResponse = z.infer<typeof StorageBalanceBoundsResponse>
