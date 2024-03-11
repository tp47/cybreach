import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Comments, Authors , Topics } from "@/models";

export enum ReactionType {
    LIKE = "like",
    DISLIKE = "dislike",
    SMILE = "smile",
    TEARS = "tears",
    FIRE = "fire",
}

export type ReactionsAttr = {
    id?: number;
    type: ReactionType;
    author?: Authors
    author_id: number;
    comment?: number;
    topic?: number
}

@Table({ tableName: 'reactions', createdAt: true })
export class Reactions extends Model<Reactions, ReactionsAttr> {

    @ForeignKey(() => Comments)
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
      })
      override id: number

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    type: ReactionType

    @BelongsTo(() => Comments, { foreignKey: 'comment_id'})
    comment: Comments;

    @BelongsTo(() => Topics, { foreignKey: 'topic_id' })
    topic: Comments;

    @BelongsTo(() => Authors, { foreignKey: 'author_id' })
    author: Authors

}
