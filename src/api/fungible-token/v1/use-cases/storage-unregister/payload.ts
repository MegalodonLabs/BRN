import { z } from 'zod'

import { createResponseSchema } from 'api/core/framework/use-case/base'

/* Request Schema */
export const StorageUnregisterRequest = z.object({
  account_id: z.string(),
  secret_key: z.string(),
  force: z.boolean(),
})

export type StorageUnregisterRequest = z.infer<typeof StorageUnregisterRequest>

/* Response Schema */
export const StorageUnregisterResponse = createResponseSchema(z.boolean())

export type StorageUnregisterResponse = z.infer<typeof StorageUnregisterResponse>
