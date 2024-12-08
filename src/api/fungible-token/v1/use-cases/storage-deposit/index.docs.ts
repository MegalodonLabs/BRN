import { badRequest } from 'api/core/utils/docs/error.docs'
import { HttpStatusCodes } from 'api/core/utils/http/status-code'
import { zodToSchema } from 'api/core/utils/zod'

import { StorageDepositRequest, StorageDepositResponse } from './payload'
import { TOKEN_OPERATIONS_TAG } from '../../utils/constants'

export default {
  post: {
    summary: 'Execute storage deposit of BRN Token',
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
            schema: zodToSchema(StorageDepositResponse),
          },
        },
      },
      ...badRequest,
    },
    requestBody: {
      content: {
        'application/json': {
          schema: zodToSchema(StorageDepositRequest),
        },
      },
    },
  },
}
