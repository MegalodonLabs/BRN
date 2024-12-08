import { badRequest } from 'api/core/utils/docs/error.docs'
import { HttpStatusCodes } from 'api/core/utils/http/status-code'
import { zodToSchema } from 'api/core/utils/zod'

import { BalanceOfResponse } from './payload'
import { TOKEN_OPERATIONS_TAG } from '../../utils/constants'

export default {
  get: {
    summary: 'Get balance of account in BRN Token',
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
            schema: zodToSchema(BalanceOfResponse),
          },
        },
      },
      ...badRequest,
    },
    parameters: [
      {
        in: 'query',
        name: 'account_id',
        required: true,
        schema: {
          type: 'string',
        },
      },
    ],
  },
}
