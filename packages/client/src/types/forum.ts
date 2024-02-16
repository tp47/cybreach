import type { User } from './user'

export interface ITopic {
  id: number
  title: string
  description: string
  author: string
  createdAt: number
  comments: IComment[]
  comments_count: number
}

export interface IComment {
  id: number

  author: User | string
  createdAt: number
}
