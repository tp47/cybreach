import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Topics } from "./Topics";

export type CommentsAttr = {
  id?: number
  content: string
  author: string
  topic_id: number
  parent_comment_id?: number
  child_comments?: CommentsAttr[]
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

  @Column({ type: DataType.STRING, allowNull: false })
  author: string

  @BelongsTo(() => Comments, { foreignKey: 'parent_comment_id' })
  parent_comment: Comments

  @HasMany(() => Comments, { foreignKey: 'parent_comment_id' })
  child_comments: Comments[]
}
