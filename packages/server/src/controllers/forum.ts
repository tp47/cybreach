import { ForumService } from '../services'
import type { Response, Request } from 'express'
import type { CommentsAttr } from '@/models/Comments'
import type { ReactionsAttr } from '@/models/Reactions'
import type { AuthorAttrs } from '@/models/Authors'


const forumService = new ForumService()

const forumController = {
  async getAllTopics(_: Request, response: Response) {
    try {
      const topics = await forumService.getAllTopics()
      if (topics) {
        response.status(200).json(topics)
      }
    } catch (error) {
      response.status(500).json(`Error on providing topics list, ${error}`)
    }
  },

  async createTopic(req: Request, res: Response) {

    try {

      const { author_id = '', title = '', description = '' } = req.body

      if (author_id && title && description) {
        await forumService.createTopic({ title, author_id, description })
        res.status(201).json('Created topic')
      } else {
        res.status(400).json('Request data is not valid')
      }
    } catch (error) {

      res.status(500).json(`Error on creating topic, ${error}`)
    }
  },

  async getTopic(req: Request, res: Response) {

    try {
      const id = +req.params.id

      if (id && !isNaN(id)) {
        const topic = await forumService.getTopic(id)

        if (topic) {
          res.status(200).json(topic)
          forumService.updateViewsCount(id)
        } else {
          res.status(404).json('Not found')
        }
      } else {
        res.status(400).json('Bad request')
      }
    } catch (error) {
      res.status(500).json(`Error on fetching topic, ${error}`)
    }

  },

  async createComment(req: Request, res: Response) {

    try {

      const { content = '', topic_id = '', parent_comment_id = '', author_id = '' } = req.body

      if (content && author_id && topic_id) {
        const params: CommentsAttr = {
          content,
          author_id,
          topic_id,
        }

        if (parent_comment_id) {
          params.parent_comment_id = parent_comment_id
        }

        await forumService.createComment(params)
        res.status(201).json('Comment added')
      } else {
        res.status(400).json('Bad request')
      }

    } catch (error) {
      res.status(500).json(`Error on creating comment, ${error}`)
    }
  },

  async getAllComments(_: Request, res: Response) {
    try {

      const comments = await forumService.getAllComments()

      res.status(201).json(comments)

    } catch(error) {
      res.status(500).json(`Error on creating comment, ${error}`)
    }

  },

  async createOrUpdateAuthor(req: Request, res: Response) {
    try {
      const { id = 0, name = '', avatar = '' } = req.body;
      if (id&&name) {
        const params: AuthorAttrs = { id, name, avatar}
        const result = await forumService.createAuthor(params)
        res.status(201).json(result)
      }
      
    } catch(error) {
      res.status(500).json(`Error on creating or updating author, ${error}`)
    }
  },


  async createReaction(req: Request, res: Response) {

    try {
      const { type = '', author = '', comment = '', topic = '', author_id = '' } = req.body

      if (type && author && comment || type && author && topic) {
        const params: ReactionsAttr = {
          type,
          author_id,
          author,
          comment,
          topic
        }
  
        await forumService.createReaction(params)
        res.status(201).json('Reaction added')
      } else {
        res.status(400).json('Bad request')
      }

    } catch(error) {
      res.status(500).json(`Error on creating reaction, ${error}`)
    }
  },

  async getAllReactions(_: Request, res: Response) {

    try {
      const reactions = await forumService.getAllReactions()

      res.status(201).json(reactions)
    } catch(error) {
      res.status(500).json(`Error on fetching reactions, ${error}`)
    }

  },


  async updateViewsCount(req: Request, res: Response) {

    try {
      await forumService.updateViewsCount(req.body.id)

      res.status(200).json('Views updated')
    } catch(error) {
      res.status(500).json(`Error on updating views count, ${error}`)
    }

  }
}

export { forumController }
