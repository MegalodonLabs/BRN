import { badRequest } from 'api/core/utils/docs/error.docs'
import { HttpStatusCodes } from 'api/core/utils/http/status-code'
import { zodToSchema } from 'api/core/utils/zod'

import { StorageUnregisterRequest, StorageUnregisterResponse } from './payload'
import { TOKEN_OPERATIONS_TAG } from '../../utils/constants'

export default {
  post: {
    summary: 'Unregisters the predecessor account and returns the storage NEAR deposit.',
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
            schema: zodToSchema(StorageUnregisterResponse),
          },
        },
      },
      ...badRequest,
    },
    requestBody: {
      content: {
        'application/json': {
          schema: zodToSchema(StorageUnregisterRequest),
        },
      },
    },
  },
}
