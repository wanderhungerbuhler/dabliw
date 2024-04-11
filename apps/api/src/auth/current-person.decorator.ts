import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { PersonPayload } from './jwt.strategy'

export const CurrentPerson = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()

    return request.user as PersonPayload
  },
)
