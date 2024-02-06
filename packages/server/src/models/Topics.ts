import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript'
import { Comments } from './Comments'

interface TopicCreationAttrs {
  title: string
  author: string
  description: string
  comments_count?: number
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
  description: string

  @Column({ type: DataType.STRING, allowNull: false })
  title: string

  @Column({ type: DataType.STRING, allowNull: false })
  author: string

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  comments_count: number

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  count_views: number

  @HasMany(() => Comments)
  comments: Comments[]
}
