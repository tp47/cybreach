import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript'
import { Comments } from './Comments'

interface TopicCreationAttrs {
  title: string
  author: string
  count_comments?: number
  count_views?: number
}

@Table({ tableName: 'topics', createdAt: true })
export class Topics extends Model<Topics, TopicCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  override id: number

  @Column({ type: DataType.STRING, allowNull: false })
  title: string

  @Column({ type: DataType.STRING, allowNull: false })
  author: string

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  count_comments: number

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  count_views: number

  @HasMany(() => Comments)
  comments: Comments[]
}

