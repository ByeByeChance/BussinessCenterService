import { Module } from '@nestjs/common';
import { LoginModule } from './login/login.module';
import { UserModule } from './user/user.module';
import { MenuModule } from './menu/menu.module';
import { DepartmentModule } from './department/department.module';

@Module({
  imports: [LoginModule, UserModule, MenuModule, DepartmentModule],
  controllers: [],
  providers: [],
})
export class ApiModule {}
