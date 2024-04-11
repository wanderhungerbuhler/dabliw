import axios from 'axios'

export const app = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API}`,
})
