import { Module } from '@nestjs/common';
import { LoginModule } from './login/login.module';
import { UserModule } from './user/user.module';
import { MenuModule } from './menu/menu.module';

@Module({
  imports: [LoginModule, UserModule, MenuModule],
  controllers: [],
  providers: [],
})
export class ApiModule {}
