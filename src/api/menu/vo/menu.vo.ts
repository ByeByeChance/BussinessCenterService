import { QueryListVo } from '@src/shared/vo/query.list.vo';
import { QueryVo } from '@src/shared/vo/query.vo';

export class MenuVo extends QueryVo {
  id?: number;
  parentId?: number;
  name?: string;
  path?: string;
  component?: string;
  redirect?: string;
  icon?: string;
  title?: string;
  isLink?: string;
  isHide?: boolean;
  isFull?: boolean;
  isAffix?: boolean;
  isKeepAlive?: boolean;
  sort?: number;
}

export class MenuItemVo {
  id!: number;
  parentId?: number;
  name?: string;
  path?: string;
  component?: string;
  redirect?: string;
  meta!: {
    icon?: string;
    title?: string;
    isLink?: string;
    isHide?: boolean;
    isFull?: boolean;
    isAffix?: boolean;
    isKeepAlive?: boolean;
    sort: number;
  };
  children?: MenuItemVo[];
}

export class MenuListVo extends QueryListVo {
  list!: MenuVo[];
}
