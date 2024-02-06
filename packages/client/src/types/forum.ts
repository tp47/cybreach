import type { User } from './user'

export interface ITopic {
  id: number
  title: string
  description: string
  author: User | string
  createdAt: number
  comments_count: number
}
