import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';
import { DepartmentEntity } from './entities/department.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    RouterModule.register([
      {
        path: '', // 指定项目名称
        module: DepartmentModule,
      },
    ]),
    TypeOrmModule.forFeature([DepartmentEntity]),
  ],
  controllers: [DepartmentController],
  providers: [DepartmentService],
})
export class DepartmentModule {}
