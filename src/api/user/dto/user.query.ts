import { QueryOptionsDto } from '@src/shared/dto/query.options.dto';

export class QueryUserDto extends QueryOptionsDto {
  readonly username?: string; // 用户名
  readonly status?: number; // 是否有效
}
