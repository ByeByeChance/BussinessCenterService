import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, IsInt } from 'class-validator';

export class UserDto {
  @ApiProperty({ description: '用户名', default: '' })
  @MaxLength(50, { message: '用户名最大长度为50' })
  @IsNotEmpty({ message: '用户名不能为空' })
  username!: string;

  @ApiProperty({ description: '密码', default: '' })
  password?: string;

  @ApiProperty({ description: '邮箱', required: false, default: '' })
  email?: string;

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

  @ApiProperty({ description: '用户名', default: '' })
  @MaxLength(50, { message: '用户名最大长度为50' })
  @IsNotEmpty({ message: '用户名不能为空' })
  username!: string;

  @ApiProperty({ description: '邮箱', required: false, default: '' })
  email?: string;

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
