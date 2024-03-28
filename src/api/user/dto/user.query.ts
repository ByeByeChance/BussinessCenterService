import { QueryOptionsDto } from '@src/shared/dto/query.options.dto';
import { ApiProperty } from '@nestjs/swagger';

export class QueryUserDto extends QueryOptionsDto {
  @ApiProperty({ description: '用户名', default: '' })
  username?: string;

  @ApiProperty({ description: '账号状态', required: false, default: '' })
  status?: number;

  @ApiProperty({ description: '角色类型', required: false, default: '' })
  roleId?: number;
}
