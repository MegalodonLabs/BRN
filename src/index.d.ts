import { User } from 'api/core/entities/user'

declare module 'express-serve-static-core' {
  interface Request {
    user: User
  }
}
