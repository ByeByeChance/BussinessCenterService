import { Transform, TransformFnParams } from 'class-transformer';
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BaseEntity,
} from 'typeorm';

export class SharedEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: '主键id',
  })
  id!: number;

  @Transform((row: TransformFnParams) => +new Date(row.value))
  @CreateDateColumn({
    type: 'datetime',
    nullable: false,
    name: 'createTime',
    comment: '创建时间',
  })
  createTime!: Date;

  @Transform((row: TransformFnParams) => +new Date(row.value))
  @UpdateDateColumn({
    type: 'datetime',
    nullable: false,
    name: 'updateTime',
    comment: '更新时间',
  })
  updateTime!: Date;

  @DeleteDateColumn({
    type: 'datetime',
    nullable: false,
    name: 'deleteTime',
    select: false,
    comment: '软删除时间',
  })
  deleteTime!: Date;
}
