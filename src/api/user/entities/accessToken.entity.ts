import { SharedEntity } from '@src/shared/entities/base.entity';
import { Entity, Column, Index } from 'typeorm';

@Entity('accessToken')
export class AccessTokenEntity extends SharedEntity {
  @Index()
  @Column({
    type: 'int',
    name: 'userId',
    nullable: false,
    comment: '用户id',
  })
  userId!: number;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'token',
    nullable: false,
    comment: '登陆token',
  })
  token!: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'refreshToken',
    nullable: false,
    comment: '刷新token',
  })
  refreshToken!: string;

  @Column({
    type: 'datetime',
    name: 'expirationTime',
    nullable: false,
    comment: '过期时间',
  })
  expirationTime!: Date;
}
