import { Sequelize, type WhereOptions } from "sequelize"
import {
  Authors, Comments, Topics, Reactions,
  type CommentsAttr, type ReactionType
} from "@/models"

type AuthorCreateParams = {
  id: number
  name: string
  avatar: string
}

type TopicCreateParams = {
  title: string
  author_id: number
  description: string
}

type CommentCreateParams = {
  content: string
  author_id: number
  topic_id: number
  parent_comment_id?: number
}

type ReactionCreateParams = {
  type: ReactionType
  author_id: number
  comment_id?: number
  topic_id?: number
}

export class ForumService {
  public getAllTopics(options?: WhereOptions<Topics>) {
    try {
      return Topics.findAll({
        where: options,
        attributes: {
          include: [[Sequelize.fn('COUNT', Sequelize.col('comments.id')), 'comments_count']],
          exclude: ['author_id', 'topic_id']
        },
        include: [{
          model: Comments,
          attributes: []
        },
        {
          model: Authors,
          attributes: {
            include: ['name', 'avatar']
          },
        }
        ],
        group: ['Topics.id', 'author.id', 'author.name', 'author.avatar']
      })
    } catch (error) {
      throw new Error(`${error}`)
    }
  }

  public async createAuthor({ id, name, avatar }: AuthorCreateParams) {
    try {
      const [author, created] = await Authors.findCreateFind({
        where: { id },
      });
      if (!created) {
        const updatedAuthor = await author.update({ name, avatar })
        return updatedAuthor
      } else {
        return author
      }
    } catch (error) {
      throw new Error(`${error}`)
    }
  }

  public createTopic({ title, description, author_id }: TopicCreateParams) {
    try {
      return Topics.create({ title, author_id, description })
    } catch (error) {
      throw new Error(`${error}`)
    }
  }

  public async getTopic(id: number) {
    const topic = await Topics.findOne({
      where: { id },
      attributes: {
        exclude: ['author_id', 'topic_id'],
      },
      include: {
        model: Authors,
        attributes: { exclude: [] }
      },
    })
    const comments = await Comments.findAll(
      {
        where: { topic_id: id },
        attributes: {
          exclude: ['author_id', 'topic_id', 'comment_id']
        },
        include: [
          {
            model: Authors,
            attributes: {
              include: ['name', 'avatar'],
              exclude: ['createdAt', 'updatedAt']
            },
          }
        ],
        group: ['Comments.id', 'author.id', 'author.name', 'author.avatar']
      }
    )


    try {

      if (topic) {
        topic.comments_count = comments.length
      }

      const commentsCopy = JSON.parse(JSON.stringify(comments)) as CommentsAttr[]

      const buildCommentTree = (parentCommentId: number | null): CommentsAttr[] => {
        const tree: CommentsAttr[] = [];

        commentsCopy
          .filter(comment => comment.parent_comment_id === parentCommentId)
          .forEach(comment => {
            if (comment.id) {
              const childComments = buildCommentTree(comment.id)
              comment.child_comments = childComments
              tree.push(comment)
            }
          })

        return tree;
      }

      const tree = buildCommentTree(null)

      return { post: { ...topic?.toJSON(), author: topic?.author }, comments: tree }

    } catch (error) {
      throw new Error(`${error}`)
    }
  }

  public createComment(params: CommentCreateParams) {
    try {
      return Comments.create(params)
    } catch (error) {
      throw new Error(`${error}`)
    }
  }

  public getAllComments(options?: WhereOptions<Comments>) {
    try {
      return Comments.findAll({ where: options })
    } catch (error) {
      throw new Error(`${error}`)
    }
  }

  public createReaction(params: ReactionCreateParams) {
    try {
      return Reactions.create(params)
    } catch (error) {
      throw new Error(`${error}`)
    }
  }

  public getAllReactions(options?: WhereOptions<Reactions>) {
    try {
      return Reactions.findAll({ where: options })
    } catch (error) {
      throw new Error(`${error}`)
    }
  }

  public async updateViewsCount(topic_id: number) {
    try {
      const topic = await Topics.findOne({ where: { id: topic_id } })
      if (topic) {
        topic.count_views = topic.count_views + 1
        await topic.save()
      }
    } catch (error) {
      throw new Error(`${error}`)
    }
  }
}
