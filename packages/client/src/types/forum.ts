import type { User } from './user'

export interface ITopic {
  id: number
  title: string
  description: string
  author: User
  created_at: number
  comments_count: number
}
