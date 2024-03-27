import { QueryOptionsDto } from '@src/shared/dto/query.options.dto';

export class QueryMenuDto extends QueryOptionsDto {
  readonly title?: string; // 菜单标题
  readonly path?: string; // 菜单路径
}
