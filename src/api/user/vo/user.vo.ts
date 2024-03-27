import { QueryListVo } from '@src/shared/vo/query.list.vo';
import { QueryVo } from '@src/shared/vo/query.vo';

export class UserVo extends QueryVo {
  username!: string; // 账号
  email?: string; // 邮箱
  isValid!: number; // 是否可用
  isAdmin!: number; // 是否管理员
  lastLoginDate?: Date; // 最后登录时间
  createTime?: Date;
  updateTime?: Date;
}

export class UserListVo extends QueryListVo {
  list!: UserVo[];
}
