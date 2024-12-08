import { badRequest } from 'api/core/utils/docs/error.docs'
import { HttpStatusCodes } from 'api/core/utils/http/status-code'
import { zodToSchema } from 'api/core/utils/zod'

import { StorageWithdrawRequest, StorageWithdrawResponse } from './payload'
import { TOKEN_OPERATIONS_TAG } from '../../utils/constants'

export default {
  post: {
    summary: 'Withdraw specified amount of available Ⓝ for predecessor account.',
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
            schema: zodToSchema(StorageWithdrawResponse),
          },
        },
      },
      ...badRequest,
    },
    requestBody: {
      content: {
        'application/json': {
          schema: zodToSchema(StorageWithdrawRequest),
        },
      },
    },
  },
}
