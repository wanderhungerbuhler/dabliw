import { ReactNode } from 'react'

export type BdayPersonProps = {
  data: {
    id: string
    userId: string
    name: string
    gender: string
    birthDate: Date
    maritalStatus: string
    createdAt: string
    updatedAt: string
  }[]
}

export type PersonProps = {
  id: string
  userId: string
  name: string
  gender: string
  birthDate: Date
  maritalStatus: string
  address: []
  createdAt: string
  updatedAt: string
}

export type CreatePersonProps = {
  children: ReactNode
  defaultValue?: BdayPersonProps
}

export type UpdatePersonProps = {
  children: ReactNode
  defaultValue?: BdayPersonProps
  person: PersonProps
}
