import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { QueryDepartmentDto } from './dto/department.query';
import { DepartmentListVo } from './vo/department.vo';
import { DepartmentService } from './department.service';
import {
  DepartmentDto,
  UpdateDepartmentInfoDto,
  UpdateDepartmentStatusDto,
} from './dto/department.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('部门模块')
@Controller('/department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @ApiOperation({ summary: '获取部门列表' })
  @Get('getDepartmentList')
  async getDepartmentListApi(@Query() queryOption: QueryDepartmentDto): Promise<DepartmentListVo> {
    return await this.departmentService.getDepartmentList(queryOption);
  }

  @ApiOperation({ summary: '新增部门' })
  @Post('addDepartment')
  async addDepartmentApi(@Body() req: DepartmentDto): Promise<string> {
    return await this.departmentService.addDepartment(req);
  }

  @ApiOperation({ summary: '更新部门信息' })
  @Post('updateDepartment')
  async updateDepartmentApi(@Body() req: UpdateDepartmentInfoDto): Promise<string> {
    return await this.departmentService.updateDepartment(req);
  }

  @ApiOperation({ summary: '更新部门状态' })
  @Post('updateDepartmentStatus')
  async updateDepartmentStatusApi(@Body() req: UpdateDepartmentStatusDto): Promise<string> {
    return await this.departmentService.updateDepartmentStatus(req);
  }

  @ApiOperation({ summary: '根据部门id删除部门' })
  @Delete('deleteDepartmentById/:id')
  async deleteDepartmentByIdApi(@Param('id', new ParseIntPipe()) id: number): Promise<string> {
    return await this.departmentService.deleteDepartmentById(id);
  }
}
