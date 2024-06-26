import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { QueryUserDto } from './dto/user.query';
import { UserListVo } from './vo/user.vo';
import { UserService } from './user.service';
import { UserDto, UpdateUserInfoDto, UpdateUserStatusDto } from './dto/user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('用户模块')
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '获取用户列表' })
  @Get('getUserList')
  async getUserListApi(@Query() queryOption: QueryUserDto): Promise<UserListVo> {
    return await this.userService.getUserList(queryOption);
  }

  @ApiOperation({ summary: '新增用户' })
  @Post('addUser')
  async addUserApi(@Body() req: UserDto): Promise<string> {
    return await this.userService.addUser(req);
  }

  @ApiOperation({ summary: '更新用户信息' })
  @Post('updateUser')
  async updateUserApi(@Body() req: UpdateUserInfoDto): Promise<string> {
    return await this.userService.updateUser(req);
  }

  @ApiOperation({ summary: '更新用户状态' })
  @Post('updateUserStatus')
  async updateUserStatusApi(@Body() req: UpdateUserStatusDto): Promise<string> {
    return await this.userService.updateUserStatus(req);
  }

  @ApiOperation({ summary: '根据用户id删除用户' })
  @Delete('deleteUserById/:id')
  async deleteUserByIdApi(@Param('id', new ParseIntPipe()) id: number): Promise<string> {
    return await this.userService.deleteUserById(id);
  }
}
