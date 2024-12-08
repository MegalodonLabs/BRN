import { badRequest } from 'api/core/utils/docs/error.docs'
import { HttpStatusCodes } from 'api/core/utils/http/status-code'
import { zodToSchema } from 'api/core/utils/zod'

import { TransferRequest, TransferResponse } from './payload'
import { TOKEN_OPERATIONS_TAG } from '../../utils/constants'

export default {
  post: {
    summary: 'Execute Transfer of BRN Token',
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
            schema: zodToSchema(TransferResponse),
          },
        },
      },
      ...badRequest,
    },
    requestBody: {
      content: {
        'application/json': {
          schema: zodToSchema(TransferRequest),
        },
      },
    },
  },
}
