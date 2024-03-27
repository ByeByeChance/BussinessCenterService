import { ToolsService } from '@src/plugin/tools/tools.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindOperator, ILike, Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PageEnum } from '@src/enums/page.enum';
import { mapToObj } from '@src/utils';
import { UserListVo } from './vo/user.vo';
import { QueryUserDto } from './dto/user.query';
import { UserEntity } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import { AccountTypeEnum } from '@src/enums/account.type.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly toolsService: ToolsService
  ) {}

  /**
   * @Description: 获取用户列表
   * @param {UserDto} queryOption
   * @return {*}
   */
  async getUserList(queryOption: QueryUserDto): Promise<UserListVo> {
    const {
      username,
      status,
      pageNumber = PageEnum.PAGE_NUMBER,
      pageSize = PageEnum.PAGE_SIZE,
    } = queryOption;
    const query = new Map<string, FindOperator<string> | number>();
    if (username) {
      query.set('username', ILike(`%${username}%`));
    }
    if (status) {
      query.set('status', status);
    }

    const total = await this.userRepository
      .createQueryBuilder('user')
      .where([mapToObj(query)])
      .getCount();
    const queryBuilder = this.queryUserBuilder();
    const data = await queryBuilder
      .where([mapToObj(query)])
      .offset((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .getRawMany();
    return {
      list: data,
      total,
      pageNumber,
      pageSize,
    };
  }

  /**
   * @Description: 新增用户
   * @param {UserDto} req
   * @return {*}
   */
  async addUser(req: UserDto): Promise<string> {
    const userEntity: Pick<UserEntity, 'id'> | null = await this.userRepository.findOne({
      where: {
        username: req.username,
      },
      select: ['id'],
    });
    if (userEntity?.id) {
      throw new HttpException(`用户已存在`, HttpStatus.BAD_REQUEST);
    }
    // 默认密码加密
    const salt = this.toolsService.getRandomSalt;
    const password = this.toolsService.makePassword(req.password, salt);
    // 创建数据
    const data = this.userRepository.create({
      username: req.username,
      password,
      salt,
      email: req.email,
      status: req.status,
      roleId: req.roleId,
      lastLoginDate: new Date(),
    });
    await this.userRepository.save(data);
    return '创建成功';
  }

  /**
   * @Description: 用户修改信息
   * @param {UserDto} req
   * @return {*}
   */

  /**
   * @Description: 用户修改密码
   * @param {UserDto} req
   * @return {*}
   */

  /**
   * @Description: 删除用户
   * @param {id} id
   * @return {*}
   */
  async deleteUserById(id: number): Promise<string> {
    const userEntity: UserEntity | null = await this.userRepository.findOne({
      where: { id },
    });
    if (!userEntity?.id) {
      throw new HttpException(`用户不存在`, HttpStatus.BAD_REQUEST);
    }
    if (userEntity.roleId === AccountTypeEnum.SUPER_ACCOUNT) {
      throw new HttpException(`不能删除管理员`, HttpStatus.BAD_REQUEST);
    }
    const { affected } = await this.userRepository.softDelete(id);
    if (affected) {
      return '删除成功';
    } else {
      return '删除失败';
    }
  }

  // 内部查询方法
  private queryUserBuilder(): SelectQueryBuilder<UserEntity> {
    return this.userRepository
      .createQueryBuilder('user')
      .select('user.id', 'id')
      .addSelect('user.username', 'username')
      .addSelect('user.email', 'email')
      .addSelect('user.isValid', 'isValid')
      .addSelect('user.isAdmin', 'isAdmin')
      .addSelect('user.lastLoginDate', 'lastLoginDate')
      .addSelect('user.createdTime', 'createdTime')
      .addSelect('user.updatedTime', 'updatedTime');
  }
}
