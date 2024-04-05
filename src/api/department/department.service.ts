import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindOperator, ILike, Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PageEnum } from '@src/enums/page.enum';
import { mapToObj } from '@src/utils';
import { DepartmentListVo } from './vo/department.vo';
import { QueryDepartmentDto } from './dto/department.query';
import { DepartmentEntity } from './entities/department.entity';
import {
  DepartmentDto,
  UpdateDepartmentInfoDto,
  UpdateDepartmentStatusDto,
} from './dto/department.dto';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(DepartmentEntity)
    private readonly departmentRepository: Repository<DepartmentEntity>
  ) {}

  /**
   * @Description: 获取部门列表
   * @param {QueryUserDto} queryOption
   * @return {*}
   */
  async getDepartmentList(queryOption: QueryDepartmentDto): Promise<DepartmentListVo> {
    const {
      name,
      status,
      pageNumber = PageEnum.PAGE_NUMBER,
      pageSize = PageEnum.PAGE_SIZE,
    } = queryOption;
    const query = new Map<string, FindOperator<string> | number>();
    if (name) {
      query.set('name', ILike(`%${name}%`));
    }
    if (typeof status === 'number') {
      query.set('status', status);
    }

    const total = await this.departmentRepository
      .createQueryBuilder('department')
      .where([mapToObj(query)])
      .getCount();
    const queryBuilder = this.queryDepartmentBuilder();
    const data = await queryBuilder
      .where([mapToObj(query)])
      .offset((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .getRawMany();
    return {
      list: data,
      total,
      pageNumber: Number(pageNumber),
      pageSize: Number(pageSize),
    };
  }

  /**
   * @Description: 新增部门
   * @param {DepartmentDto} req
   * @return {*}
   */
  async addDepartment(req: DepartmentDto): Promise<string> {
    if (!req.name) {
      throw new HttpException(`部门名称不能为空`, HttpStatus.BAD_REQUEST);
    }
    // 创建数据
    const data = this.departmentRepository.create({
      name: req.name,
      parentId: req.parentId,
      sort: req.sort,
      status: req.status,
      directorUserId: req.directorUserId,
      createTime: new Date(),
    });
    await this.departmentRepository.save(data);
    return '创建成功';
  }

  /**
   * @Description: 修改部门信息
   * @param {UpdateDepartmentInfoDto} req
   * @return {*}
   */
  async updateDepartment(req: UpdateDepartmentInfoDto): Promise<string> {
    if (!req.name) {
      throw new HttpException(`部门名称不能为空`, HttpStatus.BAD_REQUEST);
    }
    const departmentEntity: DepartmentEntity | null = await this.departmentRepository.findOne({
      where: { id: req.id },
    });
    if (!departmentEntity?.id) {
      throw new HttpException(`部门不存在`, HttpStatus.BAD_REQUEST);
    }
    await this.departmentRepository.update(
      { id: req.id },
      {
        name: req.name,
        parentId: req.parentId,
        sort: req.sort,
        status: req.status,
        directorUserId: req.directorUserId,
        updateTime: new Date(),
      }
    );
    return '更新成功';
  }

  /**
   * @Description: 部门修改状态
   * @param {UpdateDepartmentStatusDto} req
   * @return {*}
   */
  async updateDepartmentStatus(req: UpdateDepartmentStatusDto): Promise<string> {
    const departmentEntity: DepartmentEntity | null = await this.departmentRepository.findOne({
      where: { id: req.id },
    });
    if (!departmentEntity?.id) {
      throw new HttpException(`部门不存在`, HttpStatus.BAD_REQUEST);
    }
    await this.departmentRepository.update(
      { id: req.id },
      {
        status: req.status,
        updateTime: new Date(),
      }
    );
    return '更新成功';
  }

  /**
   * @Description: 删除部门
   * @param {id} id
   * @return {*}
   */
  async deleteDepartmentById(id: number): Promise<string> {
    const departmentEntity: DepartmentEntity | null = await this.departmentRepository.findOne({
      where: { id },
    });
    if (!departmentEntity?.id) {
      throw new HttpException(`部门不存在`, HttpStatus.BAD_REQUEST);
    }
    const { affected } = await this.departmentRepository.softDelete(id);
    if (affected) {
      return '删除成功';
    } else {
      return '删除失败';
    }
  }

  // 内部查询方法
  private queryDepartmentBuilder(): SelectQueryBuilder<DepartmentEntity> {
    return this.departmentRepository
      .createQueryBuilder('department')
      .select('department.id', 'id')
      .addSelect('department.parentId', 'parentId')
      .addSelect('department.name', 'name')
      .addSelect('department.sort', 'sort')
      .addSelect('department.status', 'status')
      .addSelect('department.directorUserId', 'directorUserId')
      .addSelect('department.directorNickname', 'directorNickname')
      .addSelect('department.createUserId', 'createUserId')
      .addSelect('department.createNickname', 'createNickname')
      .addSelect('department.lastLoginDate', 'lastLoginDate')
      .addSelect('department.createTime', 'createTime')
      .addSelect('department.updateTime', 'updateTime');
  }
}
