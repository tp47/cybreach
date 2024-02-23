export interface IAuthor {
  id: number
  name: string
  avatar: string
  comments?: IComment[]
  topics?: ITopic[]
}

export interface ITopic {
  id: number
  title: string
  description: string
  author: IAuthor
  createdAt: number
  comments: IComment[]
  comments_count: number
  count_views: number
}

export interface IComment {
  id: number
  content: string
  author: IAuthor
  createdAt: number
  child_comments: IComment[]
  parent_comment_id: number
}
