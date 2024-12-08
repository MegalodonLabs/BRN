import { badRequest } from 'api/core/utils/docs/error.docs'
import { HttpStatusCodes } from 'api/core/utils/http/status-code'
import { zodToSchema } from 'api/core/utils/zod'

import { OwnerResponse } from './payload'
import { TOKEN_OPERATIONS_TAG } from '../../utils/constants'

export default {
  get: {
    summary: 'Returns the account ID of the token smart contract owner.',
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
            schema: zodToSchema(OwnerResponse),
          },
        },
      },
      ...badRequest,
    },
  },
}
