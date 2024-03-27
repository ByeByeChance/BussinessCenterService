import { SharedEntity } from '@src/shared/entities/base.entity';
import { Entity, Column, Index } from 'typeorm';

@Entity('user')
export class UserEntity extends SharedEntity {
  @Index()
  @Column({
    type: 'varchar',
    length: 50,
    name: 'username',
    nullable: true,
    comment: '账号',
  })
  username!: string;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'password',
    comment: '密码',
  })
  password!: string;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'email',
    comment: '邮箱',
  })
  email?: string;

  @Column({
    type: 'int',
    name: 'status',
    comment: '账号状态',
  })
  status!: number;

  @Column({
    type: 'int',
    name: 'roleId',
    comment: '角色类型',
  })
  roleId!: number;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'salt',
    nullable: true,
    comment: '密码盐',
  })
  salt!: string;

  @Column({
    type: 'datetime',
    name: 'lastLoginDate',
    nullable: true,
    comment: '最后登录时间',
  })
  lastLoginDate!: Date;
}
