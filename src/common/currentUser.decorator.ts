import { createParamDecorator } from '@nestjs/common'

export interface CurrentUserOptions {
  required?: boolean
}

// export const CurrentUser: (options?: CurrentUserOptions) => ParameterDecorator = createParamDecorator((options: CurrentUserOptions = {}, req) => {
//   const user = req.user
//   if (options.required && !user) {
//     throw new UnauthorizedException()
//   }
//   return user
// })

export const CurrentUser = createParamDecorator(
  (data, [root, args, ctx, info]) => ctx.req.user
)
