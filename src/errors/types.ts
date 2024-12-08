export enum ErrorCode {
  'UNKNOWN_ERROR',
  'BAD_REQUEST',
  'VALIDATION_ERROR',
  'PERMISSION_ERROR',
  'RESOURCE_NOT_FOUND',
  'RESOURCE_CONFLICTED',
  'NEAR_ERROR',
}

export type ErrorMessage = {
  code: ErrorCode
  message: string
  details?: string
}