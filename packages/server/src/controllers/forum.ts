import type { Response, Request } from 'express'

import { ForumService } from '../services'
import type { CommentsAttr } from '@/models/Comments'
import type { ReactionsAttr } from '@/models/Reactions'


const forumService = new ForumService()

const forumController = {
  async getAllTopics(_: Request, response: Response) {
    const topics = await forumService.getAllTopics()
    if (topics) {
      response.status(200).json(topics)
    }
  },

  async createTopic(req: Request, res: Response) {
    const { title = '', author = '' } = req.body
    if (title && author) {
      await forumService.createTopic({ title, author })
      res.status(201).json('Created')
    } else {
      res.status(400).json('Title or Author is not valid')
    }
  },

  async getTopic(req: Request, res: Response) {
    const id = +req.params.id

    if (id && !isNaN(id)) {
      const topic = await forumService.getTopic(id)

      if (topic) {
        res.status(200).json(topic)
      } else {
        res.status(404).json('Not found')
      }
    } else {
      res.status(400).json('Bad request')
    }
  },

  async createComment(req: Request, res: Response) {
    const { content = '', author = '', topic_id, parent_comment_id } = req.body

    if (content && author && topic_id) {
      const params: CommentsAttr = {
        content,
        author,
        topic_id
      }

      if (parent_comment_id) {
        params.parent_comment_id = parent_comment_id
      }

      await forumService.createComment(params)
      res.status(201).json('Comment added')
    } else {
      res.status(400).json('Bad request')
    }
  },

  async getAllComments(_: Request, res: Response) {    
    const comments = await forumService.getAllComments()

    res.status(201).json(comments)
  },


  async createReaction(req: Request, res: Response) {
    const { type = '', user_id = '', comment_id = ''} = req.body

    if (type && user_id && comment_id) {
      const params: ReactionsAttr = {
        type,
        user_id,
        comment_id
      }

      await forumService.createReaction(params)
      res.status(201).json('Reaction added')
    } else {
      res.status(400).json('Bad request')
    }

  },

  async getAllReactions(_: Request, res: Response) {    
    const reactions = await forumService.getAllReactions()

    res.status(201).json(reactions)
  },


  async updateViews(req: Request, res: Response) {
    await forumService.updateViews(req.body.id)

    res.status(200).json('Views updated')
  }
}

export { forumController }
