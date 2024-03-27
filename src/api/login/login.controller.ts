import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { LoginService } from './login.service';
import { LoginVo } from './vo/login.vo';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('登录模块')
@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @ApiOperation({ summary: '登录' })
  @Post('login')
  async loginApi(@Body() req: LoginDto): Promise<LoginVo | null> {
    return await this.loginService.loginApi(req);
  }
}
