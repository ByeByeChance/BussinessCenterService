import { QueryListVo } from '@src/shared/vo/query.list.vo';
import { QueryVo } from '@src/shared/vo/query.vo';

export class UserVo extends QueryVo {
  username!: string; // 账号
  email?: string; // 邮箱
  roleId!: number; // 角色类型：1普通账号, 2是主账号, 3是超管
  status!: number; // 账号状态：1是正常,0是禁用
  lastLoginDate?: Date; // 最后登录时间
  createdTime?: Date;
  updatedTime?: Date;
}

export class UserListVo extends QueryListVo {
  list!: UserVo[];
}
