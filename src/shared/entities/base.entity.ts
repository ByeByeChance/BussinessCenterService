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
    name: 'createdTime',
    comment: '创建时间',
  })
  createdTime!: Date;

  @Transform((row: TransformFnParams) => +new Date(row.value))
  @UpdateDateColumn({
    type: 'datetime',
    nullable: false,
    name: 'updatedTime',
    comment: '更新时间',
  })
  updatedTime!: Date;

  @DeleteDateColumn({
    type: 'datetime',
    nullable: false,
    name: 'deletedTime',
    select: false,
    comment: '软删除时间',
  })
  deletedTime!: Date;
}
