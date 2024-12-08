import { z } from 'zod'

import { createResponseSchema } from 'api/core/framework/use-case/base'

export const metadataType = z.object({
  spec: z.string(),
  name: z.string(),
  symbol: z.string(),
  icon: z.string(),
  reference: z.string().nullable(),
  reference_hash: z.string().nullable(),
  decimals: z.number(),
})

export const metadataResponseType = metadataType

/* Response Schema */

export const MetadataResponse = createResponseSchema(metadataResponseType)

export type MetadataResponse = z.infer<typeof MetadataResponse>
