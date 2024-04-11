import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { ZodValidationPipe } from '@/pipes/zod-validation-pipes'
import { PrismaService } from '@/prisma/prisma.service'
import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { z } from 'zod'

const pageQueryParamsSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamsSchema)

type PageQueryParamsSchema = z.infer<typeof pageQueryParamsSchema>

@Controller('/listperson')
@UseGuards(JwtAuthGuard)
export class ListPersonController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async list(@Query('page', queryValidationPipe) page: PageQueryParamsSchema) {
    const perPage = 1
    const person = await this.prisma.person.findMany({
      take: 10,
      skip: (page - 1) * perPage,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        address: true,
      },
    })

    return { person }
  }
}
