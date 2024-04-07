import { QueryListVo } from '@src/shared/vo/query.list.vo';
import { QueryVo } from '@src/shared/vo/query.vo';

export class DepartmentVo extends QueryVo {
  id!: number; // 部门id
  parentId!: number; // 上级id
  name!: string; // 部门名称
  status!: number; // 部门状态：1是正常,0是禁用
  sort!: number; // 排序
  directorUserId!: number; // 负责人
  directorNickname!: string; // 负责人姓名
  createUserId!: number; // 创建人
  createNickname!: string; // 创建人姓名
  createTime?: Date;
  updateTime?: Date;
}

export class DepartmentListVo extends QueryListVo {
  list!: DepartmentVo[];
}
