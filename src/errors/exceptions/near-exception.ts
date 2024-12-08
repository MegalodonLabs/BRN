import { HttpStatusCodes } from 'api/core/utils/http/status-code'

import { BaseException } from './base'
import { ErrorCode } from '../types'

export class NearException extends BaseException {
  constructor(details: unknown) {
    super(ErrorCode.NEAR_ERROR, HttpStatusCodes.BAD_REQUEST, details)
  }
}
