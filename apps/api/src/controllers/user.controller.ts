import { PrismaService } from '@/prisma/prisma.service'
import { Controller, Get } from '@nestjs/common'

@Controller('/users')
export class UserController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async list() {
    return await this.prisma.user.findMany()
  }
}
