import { SharedEntity } from '@src/shared/entities/base.entity';
import { Entity, Column, Index } from 'typeorm';

@Entity('department')
export class DepartmentEntity extends SharedEntity {
  @Index()
  @Column({
    type: 'int',
    name: 'parentId',
    comment: '上级id',
  })
  parentId!: number;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'name',
    comment: '部门名称',
  })
  name!: string;

  @Column({
    type: 'int',
    name: 'status',
    comment: '部门状态',
  })
  status!: number;

  @Column({
    type: 'int',
    name: 'sort',
    comment: '排序',
  })
  sort!: number;

  @Column({
    type: 'int',
    name: 'directorUserId',
    comment: '负责人',
  })
  directorUserId!: number;

  @Column({
    type: 'varchar',
    name: 'directorNickname',
    comment: '负责人姓名',
  })
  directorNickname!: string;

  @Column({
    type: 'int',
    name: 'createUserId',
    comment: '创建人',
  })
  createUserId!: number;

  @Column({
    type: 'varchar',
    name: 'createNickname',
    comment: '创建人姓名',
  })
  createNickname!: string;
}
