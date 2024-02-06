import { Comments, CommentsAttr } from "@/models/Comments"
import { Reactions, ReactionType } from "@/models/Reactions"
import { Topics } from "@/models/Topics"
import { Sequelize, type WhereOptions } from "sequelize"

type TopicCreateParams = {
  title: string
  author: string
  description: string
}

type CommentCreateParams = {
  content: string
  author: string
  topic_id: number
  parent_comment_id?: number
}

type ReactionCreateParams = {
  type: ReactionType
  user_id: number
  comment_id: number
}

export class ForumService {
  public getAllTopics(options?: WhereOptions<Topics>) {
    return Topics.findAll({
      where: options,
      attributes: {
        include: [[Sequelize.fn('COUNT', Sequelize.col('comments.id')), 'comments_count']]
      },
      include: [{
        model: Comments,
        attributes: []
      }],
      group: ['Topics.id']
    })
  }

  public createTopic({ title, author, description }: TopicCreateParams) {
    return Topics.create({ title, author, description })
  }

  public async getTopic(id: number) {
    const topic = await Topics.findOne({ where: { id } })
    const comments = await Comments.findAll({ where: { topic_id: id } })

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

    return { topic, comments: tree }
  }

  public createComment(params: CommentCreateParams) {
    return Comments.create(params)
  }

  public getAllComments(options?: WhereOptions<Comments>) {
    return Comments.findAll({ where: options })
  }

  public createReaction(params: ReactionCreateParams) {
    return Reactions.create(params)
  }

  public getAllReactions(options?: WhereOptions<Reactions>) {
    return Reactions.findAll({ where: options })
  }

  public async updateViews(topic_id: number) {
    const topic = await Topics.findOne({ where: { id: topic_id } })
    if (topic) {
      topic.count_views = topic.count_views + 1

      await topic.save()
    }
    console.log(topic)
  }
}
