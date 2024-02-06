import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Comments } from "./Comments";

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
    comment_id: number;
    user_id: number;
}

@Table({ tableName: 'reactions', created_at: true })
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
        type: DataType.INTEGER,
        onDelete: 'CASCADE',
    })
    comment_id: number

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    type: ReactionType

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    user_id: number

    @BelongsTo(() => Comments)
    comment: Comments;

}
