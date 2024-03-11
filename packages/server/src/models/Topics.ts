import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript'
import { Authors, Comments, Reactions } from '@/models'

export interface TopicAttrs {
  title: string
  author_id: number
  description: string
  comments_count?: number
  count_views?: number
}

@Table({ tableName: 'topics', createdAt: true })
export class Topics extends Model<Topics, TopicAttrs> {

  @ForeignKey(() => Comments)
  @ForeignKey(() => Reactions)
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  override id: number

  @Column({ type: DataType.STRING, allowNull: false })
  description: string

  @Column({ type: DataType.STRING, allowNull: false })
  title: string

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  comments_count: number

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  count_views: number

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  author_id: number

  @HasMany(() => Comments, {foreignKey: 'topic_id'})
  comments: Comments[]

  @BelongsTo(() => Authors, { foreignKey: 'author_id' })
  author: Authors
}
