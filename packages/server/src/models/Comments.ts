import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Authors, Reactions, Topics} from "@/models";
import type { ReactionsAttr } from "./Reactions";
// import type { AuthorAttrs } from "./Authors";


export type CommentsAttr = {
  id?: number
  content: string
  author_id: number
  topic_id: number
  parent_comment_id?: number
  child_comments?: CommentsAttr[]
  reactions?: ReactionsAttr[]
}

@Table({ tableName: 'comments', createdAt: true })
export class Comments extends Model<Comments, CommentsAttr> {

  @ForeignKey(() => Topics)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'CASCADE'
  })
  topic_id: number

  @Column({ type: DataType.STRING, allowNull: false })
  content: string

  @BelongsTo(() => Comments, { foreignKey: 'parent_comment_id' })
  parent_comment: Comments

  @HasMany(() => Comments, { foreignKey: 'parent_comment_id' })
  child_comments: Comments[]

  @HasMany(() => Reactions, { foreignKey: 'comment_id' })
  reactions: Reactions[];

  @BelongsTo(() => Authors, { foreignKey: 'author_id' })
  author: Authors
}
