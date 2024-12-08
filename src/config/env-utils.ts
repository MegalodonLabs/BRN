/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { logger } from './logger'

export const envTypes = {
  DEV: 'development',
  TEST: 'test',
}

export function isDevEnv(): boolean {
  return process.env.NODE_ENV === envTypes.DEV
}

export function isTestEnv(): boolean {
  return process.env.NODE_ENV === envTypes.TEST
}

export function getValueFromEnv(name: string, fallback?: string): string {
  const envValue = process.env[name]
  if (!envValue && !fallback) {
    logger.error(
      {
        name,
        actor: 'aws',
        err: 'variable not found',
      },
      'invalid configuration'
    )
    throw new Error(`Missing ENV variable: ${name}`)
  }
  return envValue || fallback!
}

export const rootDir = process.env.DEPLOY_STAGE === 'local' ? 'src/' : 'dist/'

export const codeExtension = process.env.DEPLOY_STAGE === 'local' ? '.ts' : '.js'
