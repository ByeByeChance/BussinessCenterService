import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt } from 'class-validator';

export class DepartmentDto {
  @ApiProperty({ description: '上级部门id', required: false, default: undefined })
  parentId?: number;

  @ApiProperty({ description: '部门名称', required: true, default: '' })
  @IsNotEmpty({ message: '部门名称不能为空' })
  name!: string;

  @ApiProperty({ description: '排序', required: false, default: 0 })
  sort?: number;

  @ApiProperty({ description: '状态', required: false, default: 0 })
  status?: number;

  @ApiProperty({ description: '负责人', required: false, default: '' })
  directorUserId?: number;

  @ApiProperty({ description: '负责人姓名', required: false, default: '' })
  directorNickname?: string;
}

export class UpdateDepartmentInfoDto {
  @ApiProperty({ description: 'id', default: '' })
  @IsNotEmpty({ message: 'id不能为空' })
  id!: number;

  @ApiProperty({ description: '上级部门id', required: false, default: undefined })
  parentId?: number;

  @ApiProperty({ description: '部门名称', required: true, default: '' })
  @IsNotEmpty({ message: '部门名称不能为空' })
  name!: string;

  @ApiProperty({ description: '排序', required: false, default: 0 })
  sort?: number;

  @ApiProperty({ description: '状态', required: false, default: 0 })
  status?: number;

  @ApiProperty({ description: '负责人', required: false, default: '' })
  directorUserId?: number;

  @ApiProperty({ description: '负责人姓名', required: false, default: '' })
  directorNickname?: string;
}

export class UpdateDepartmentStatusDto {
  @ApiProperty({ description: 'id', default: '' })
  @IsNotEmpty({ message: 'id不能为空' })
  id!: number;

  @ApiProperty({ description: '部门状态', required: true, default: 1 })
  @IsInt({ message: '部门状态只能为数字' })
  status?: number;
}
