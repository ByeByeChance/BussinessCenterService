import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, IsInt } from 'class-validator';

export class UserDto {
  @ApiProperty({ description: '用户名', required: true, default: '' })
  @MaxLength(50, { message: '用户名最大长度为50' })
  @IsNotEmpty({ message: '用户名不能为空' })
  username!: string;

  @ApiProperty({ description: '用户姓名', required: true, default: '' })
  @MaxLength(50, { message: '用户姓名最大长度为50' })
  @IsNotEmpty({ message: '用户姓名不能为空' })
  nickname!: string;

  @ApiProperty({ description: '密码', required: true, default: '' })
  @IsNotEmpty({ message: '用户密码不能为空' })
  password!: string;

  @ApiProperty({ description: '性别', required: false, default: 0 })
  gender?: number;

  @ApiProperty({ description: '生日', required: false, default: 0 })
  birthday?: Date;

  @ApiProperty({ description: '手机号码', required: false, default: '' })
  phone?: number;

  @ApiProperty({ description: '邮箱', required: false, default: '' })
  email?: string;

  @ApiProperty({ description: '职位', required: false, default: '' })
  jobId?: number;

  @ApiProperty({ description: '所属部门', required: false, default: '' })
  departmentId?: number;

  @ApiProperty({ description: '账号状态', required: false, default: 1 })
  @IsInt({ message: '账号状态只能为数字' })
  status?: number;

  @ApiProperty({ description: '角色类型', required: false, default: 1 })
  @IsInt({ message: '角色类型只能为数字' })
  roleId?: number;
}

export class UpdateUserInfoDto {
  @ApiProperty({ description: 'id', default: '' })
  @IsNotEmpty({ message: 'id不能为空' })
  id!: number;

  @ApiProperty({ description: '用户姓名', required: true, default: '' })
  @MaxLength(50, { message: '用户姓名最大长度为50' })
  @IsNotEmpty({ message: '用户姓名不能为空' })
  nickname!: string;

  @ApiProperty({ description: '用户名', default: '' })
  @MaxLength(50, { message: '用户名最大长度为50' })
  @IsNotEmpty({ message: '用户名不能为空' })
  username!: string;

  @ApiProperty({ description: '性别', required: false, default: 0 })
  gender?: number;

  @ApiProperty({ description: '生日', required: false, default: 0 })
  birthday?: Date;

  @ApiProperty({ description: '手机号码', required: false, default: '' })
  phone?: number;

  @ApiProperty({ description: '邮箱', required: false, default: '' })
  email?: string;

  @ApiProperty({ description: '职位', required: false, default: '' })
  jobId?: number;

  @ApiProperty({ description: '所属部门', required: false, default: '' })
  departmentId?: number;

  @ApiProperty({ description: '账号状态', required: false, default: 1 })
  @IsInt({ message: '账号状态只能为数字' })
  status?: number;

  @ApiProperty({ description: '角色类型', required: false, default: 1 })
  @IsInt({ message: '角色类型只能为数字' })
  roleId?: number;
}

export class UpdateUserStatusDto {
  @ApiProperty({ description: 'id', default: '' })
  @IsNotEmpty({ message: 'id不能为空' })
  id!: number;

  @ApiProperty({ description: '账号状态', required: false, default: 1 })
  @IsInt({ message: '账号状态只能为数字' })
  status?: number;
}
