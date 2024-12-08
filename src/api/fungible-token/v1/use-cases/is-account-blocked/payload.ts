import { z } from 'zod'

import { createResponseSchema } from 'api/core/framework/use-case/base'

/* Request Schema */
export const IsAccountBlockedRequest = z.object({
  account_id: z.string(),
})

export type IsAccountBlockedRequest = z.infer<typeof IsAccountBlockedRequest>

/* Response Schema */
export const IsAccountBlockedResponse = createResponseSchema(
  z.object({
    is_blocked: z.boolean(),
  })
)

export type IsAccountBlockedResponse = z.infer<typeof IsAccountBlockedResponse>
