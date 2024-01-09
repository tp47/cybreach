import { Comments, CommentsAttr } from "@/models/Comments"
import { Topics } from "@/models/Topics"
import { Sequelize, type WhereOptions } from "sequelize"

type TopicCreate = {
  title: string
  author: string
}

type CommentCreate = {
  content: string
  author: string
  topic_id: number
  parent_comment_id?: number
}

export class ForumService {
  public getAllTopics(options?: WhereOptions<Topics>) {
    return Topics.findAll({
      where: options,
      attributes: {
        include: [[Sequelize.fn('COUNT', Sequelize.col('comments.id')), 'count_comments']]
      },
      include: [{
        model: Comments,
        attributes: []
      }],
      group: ['Topics.id']
    })
  }

  public createTopic({ title, author }: TopicCreate) {
    return Topics.create({ title, author })
  }

  public async getTopic(id: number) {
    const topic = await Topics.findOne({ where: { id } })
    const comments = await Comments.findAll({ where: { topic_id: id } })

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

  public createComment(params: CommentCreate) {
    return Comments.create(params)
  }

  public getAllComments(options?: WhereOptions<Comments>) {
    return Comments.findAll({ where: options })
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
