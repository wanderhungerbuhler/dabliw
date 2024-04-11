import { ZodValidationPipe } from '@/pipes/zod-validation-pipes'
import { PrismaService } from '@/prisma/prisma.service'
import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcryptjs'
import { z } from 'zod'

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(7),
})

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

@Controller('/sessions')
export class AuthenticateController {
  constructor(
    private jwt: JwtService,
    private prisma: PrismaService,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async create(@Body() body: AuthenticateBodySchema) {
    const { email, password } = body

    const user = await this.prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      throw new UnauthorizedException('User credentials do not match')
    }

    const isPasswordValid = await compare(password, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException('User credentials do not match')
    }

    const accessToken = this.jwt.sign({ sub: user.id })

    await this.prisma.session.create({
      data: {
        userId: user.id,
        sessionToken: accessToken,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      },
    })

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      access_token: accessToken,
    }
  }
}
