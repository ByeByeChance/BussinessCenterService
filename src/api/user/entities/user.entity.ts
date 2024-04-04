import { SharedEntity } from '@src/shared/entities/base.entity';
import { Entity, Column, Index } from 'typeorm';

@Entity('user')
export class UserEntity extends SharedEntity {
  @Index()
  @Column({
    type: 'varchar',
    length: 50,
    name: 'username',
    comment: '用户名',
  })
  username!: string;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'nickname',
    comment: '用户姓名',
  })
  nickname!: string;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'password',
    comment: '密码',
  })
  password!: string;

  @Column({
    type: 'int',
    name: 'gender',
    comment: '性别：0 未知 1 男 2 女',
  })
  gender!: number;

  @Column({
    type: 'datetime',
    name: 'birthday',
    comment: '生日',
  })
  birthday!: Date;

  @Column({
    type: 'varchar',
    name: 'phone',
    comment: '手机号码',
  })
  phone?: number;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'email',
    comment: '邮箱',
  })
  email?: string;

  @Column({
    type: 'int',
    name: 'jobId',
    comment: '职位',
  })
  jobId?: number;

  @Column({
    type: 'int',
    name: 'departmentId',
    comment: '所属部门',
  })
  departmentId?: number;

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
