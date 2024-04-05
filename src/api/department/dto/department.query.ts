import { QueryOptionsDto } from '@src/shared/dto/query.options.dto';
import { ApiProperty } from '@nestjs/swagger';

export class QueryDepartmentDto extends QueryOptionsDto {
  @ApiProperty({ description: '部门名称', default: '' })
  name?: string;

  @ApiProperty({ description: '部门状态', required: false, default: '' })
  status?: number;
}
