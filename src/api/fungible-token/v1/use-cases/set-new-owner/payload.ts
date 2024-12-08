import { z } from 'zod'

import { createResponseSchema } from 'api/core/framework/use-case/base'

/* Request Schema */
export const SetNewOwnerRequest = z.object({
  actual_owner_id: z.string(),
  actual_owner_secret_key: z.string(),
  new_owner_id: z.string(),
})

export type SetNewOwnerRequest = z.infer<typeof SetNewOwnerRequest>

/* Response Schema */

export const SetNewOwnerResponse = createResponseSchema(z.object({}))

export type SetNewOwnerResponse = z.infer<typeof SetNewOwnerResponse>
