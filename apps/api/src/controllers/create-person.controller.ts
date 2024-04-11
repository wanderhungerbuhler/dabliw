import { CurrentPerson } from '@/auth/current-person.decorator'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { PersonPayload } from '@/auth/jwt.strategy'
import { ZodValidationPipe } from '@/pipes/zod-validation-pipes'
import { PrismaService } from '@/prisma/prisma.service'
import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common'
import { format } from 'date-fns'

import { z } from 'zod'

const createPersonBodySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3),
  gender: z.string(),
  birthdate: z.string(),
  maritalStatus: z.string(),
  address: z.array(
    z.object({
      id: z.string().optional(),
      personId: z.string().optional(),
      postalCode: z.string(),
      address: z.string(),
      number: z.string(),
      district: z.string(),
      state: z.string(),
      city: z.string(),
    }),
  ),
})

const bodyValidationPipe = new ZodValidationPipe(createPersonBodySchema)

type CreatePersonBodySchema = z.infer<typeof createPersonBodySchema>

@Controller('/person')
@UseGuards(JwtAuthGuard)
export class CreatePersonController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async create(
    @Body(bodyValidationPipe) body: CreatePersonBodySchema,
    @CurrentPerson()
    user: PersonPayload,
  ) {
    if (body.id) {
      const updatePerson = await this.prisma.person.update({
        where: {
          id: body.id,
          // userId: user.sub,
        },
        data: {
          name: body.name,
          gender: body.gender,
          birthDate: format(new Date(body.birthdate), 'yyyy-MM-dd'),
          maritalStatus: body.maritalStatus,
        },
      })

      const existsAddress = await this.prisma.address.findMany({
        where: {
          personId: body.id,
        },
      })

      if (existsAddress.length > 0) {
        for (const updatedAddress of body.address) {
          const existingAddress = existsAddress.find(
            (address) => address.id === updatedAddress.id,
          )
          if (existingAddress) {
            await this.prisma.address.update({
              where: {
                id: updatedAddress.id,
                personId: body.id,
              },
              data: {
                personId: body.id,
                postalCode: updatedAddress.postalCode,
                address: updatedAddress.address,
                number: updatedAddress.number,
                district: updatedAddress.district,
                state: updatedAddress.state,
                city: updatedAddress.city,
              },
            })
          } else {
            await this.prisma.address.create({
              data: {
                personId: body.id,
                postalCode: updatedAddress.postalCode,
                address: updatedAddress.address,
                number: updatedAddress.number,
                district: updatedAddress.district,
                state: updatedAddress.state,
                city: updatedAddress.city,
              },
            })
          }
        }
      } else {
        for (const updatedAddress of body.address) {
          await this.prisma.address.create({
            data: {
              personId: body.id,
              postalCode: updatedAddress.postalCode,
              address: updatedAddress.address,
              number: updatedAddress.number,
              district: updatedAddress.district,
              state: updatedAddress.state,
              city: updatedAddress.city,
            },
          })
        }
      }

      return { error: null, data: { updatePerson } }
    }

    const person = await this.prisma.person.create({
      data: {
        userId: user.sub,
        name: body.name,
        gender: body.gender,
        birthDate: format(new Date(body.birthdate), 'yyyy-MM-dd'),
        maritalStatus: body.maritalStatus,
        address: {
          create: body.address,
        },
      },
    })

    return { error: null, data: person }
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    // @CurrentPerson() user: PersonPayload
    const existsAddress = await this.prisma.address.findMany({
      where: {
        personId: id,
      },
    })

    // const deletePersonWithSameUserId = await this.prisma.person.findMany({
    //   where: {
    //     userId: user.sub,
    //   },
    // })

    // if (deletePersonWithSameUserId.length === 0) {
    //   throw new ConflictException('Only the owner can delete this person')
    // }

    if (existsAddress.length > 0) {
      await this.prisma.address.deleteMany({
        where: {
          personId: id,
        },
      })
    }

    const deletePerson = await this.prisma.person.delete({
      where: {
        id,
        // userId: user.sub,
      },
    })

    return { error: null, data: deletePerson }
  }
}
