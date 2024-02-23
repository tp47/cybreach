import { Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript'
import { Comments , Reactions, Topics } from '@/models'

export interface AuthorAttrs {
  id: number
  name: string
  avatar: string
  comments?: string
  topics?: number
  reactions?: number
}

@Table({ tableName: 'authors', createdAt: true })
export class Authors extends Model<Authors, AuthorAttrs> {
  @ForeignKey(() => Comments)
  @ForeignKey(() => Topics)
  @ForeignKey(() => Reactions)
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  override id: number

  @Column({ type: DataType.STRING })
  name: string

  @Column({ type: DataType.STRING })
  avatar: string

  @HasMany(() => Comments, { foreignKey: 'comment_id' })
  comments: Comments[]

  @HasMany(() => Reactions, { foreignKey: 'reaction_id' })
  reactions: Reactions[]

  @HasMany(() => Topics, { foreignKey: 'topic_id' })
  topics: Topics[]
}
