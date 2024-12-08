import { badRequest } from 'api/core/utils/docs/error.docs'
import { HttpStatusCodes } from 'api/core/utils/http/status-code'
import { zodToSchema } from 'api/core/utils/zod'

import { MetadataResponse } from './payload'
import { TOKEN_OPERATIONS_TAG } from '../../utils/constants'

export default {
  get: {
    summary: 'Get metadata of BRN Token',
    tags: [TOKEN_OPERATIONS_TAG],
    security: [
      {
        bearerAuth: [],
      },
    ],
    responses: {
      [HttpStatusCodes.OK]: {
        type: 'object',
        content: {
          'application/json': {
            schema: zodToSchema(MetadataResponse),
          },
        },
      },
      ...badRequest,
    },
  },
}
