import { SharedEntity } from '@src/shared/entities/base.entity';
import { Entity, Column, Index } from 'typeorm';

@Entity('menu')
export class MenuEntity extends SharedEntity {
  @Index()
  @Column({
    type: 'int',
    name: 'parentId',
    comment: '父级id',
  })
  parentId!: number;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'path',
    comment: '菜单路径',
  })
  path!: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'name',
    comment: '菜单name',
  })
  name!: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'component',
    comment: '组件路径',
  })
  component?: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'redirect',
    comment: '重定向菜单路径',
  })
  redirect!: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'icon',
    comment: '菜单图标',
  })
  icon!: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'title',
    comment: '菜单名称',
  })
  title!: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'isLink',
    comment: '是否外链',
  })
  isLink!: string;

  @Column({
    type: 'int',
    name: 'isHide',
    comment: '是否外链',
  })
  isHide!: number;

  @Column({
    type: 'int',
    name: 'isFull',
    comment: '是否全屏',
  })
  isFull!: number;

  @Column({
    type: 'int',
    name: 'isAffix',
    comment: '是否在标签栏固定',
  })
  isAffix!: number;

  @Column({
    type: 'int',
    name: 'isKeepAlive',
    comment: '是否缓存页面',
  })
  isKeepAlive!: number;

  @Column({
    type: 'int',
    name: 'sort',
    comment: '排序',
  })
  sort!: number;
}
