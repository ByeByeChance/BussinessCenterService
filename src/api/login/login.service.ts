import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { AccessTokenEntity } from '../user/entities/accessToken.entity';
import { ToolsService } from '@src/plugin/tools/tools.service';
import { LoginVo } from './vo/login.vo';
import dayjs from 'dayjs';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(AccessTokenEntity)
    private readonly accessTokenRepository: Repository<AccessTokenEntity>,
    private readonly toolsService: ToolsService
  ) {}

  /**
   * @Description: 登录操作
   * @param {LoginDto} req
   * @return {*}
   */
  async loginApi(req: LoginDto): Promise<LoginVo | null> {
    const { username, password } = req;
    const userEntity: UserEntity | null = await this.userRepository
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .getOne();
    let data: LoginVo | null = null;
    if (userEntity) {
      const tempPassword = this.toolsService.makePassword(password, userEntity.salt);
      if (tempPassword === userEntity.password) {
        const accessTokenEntity: AccessTokenEntity | null = await this.accessTokenRepository
          .createQueryBuilder('accessToken')
          .where('accessToken.userId = :userId', { userId: userEntity.id })
          .getOne();
        if (accessTokenEntity) {
          // 判断token是否过期
          if (dayjs().isAfter(accessTokenEntity.expirationTime)) {
            // token过期了，重新生成
            const token = this.toolsService.uuidToken;
            const refreshToken = this.toolsService.uuidToken;
            const expirationTime = dayjs().add(7, 'day').toDate();
            await this.accessTokenRepository.update(accessTokenEntity.id, {
              token,
              refreshToken,
              expirationTime,
              updateTime: new Date(),
            });
            data = {
              id: userEntity.id,
              username: userEntity.username,
              roleId: userEntity.roleId,
              token,
              refreshToken,
            };
          } else {
            data = {
              id: userEntity.id,
              username: userEntity.username,
              roleId: userEntity.roleId,
              token: accessTokenEntity.token,
              refreshToken: accessTokenEntity.refreshToken,
            };
          }
        } else {
          // 生成token
          const token = this.toolsService.uuidToken;
          const refreshToken = this.toolsService.uuidToken;
          const expirationTime = dayjs().add(7, 'day').toDate();
          const newTokenData = this.accessTokenRepository.create({
            userId: userEntity.id,
            token,
            refreshToken,
            expirationTime,
            createTime: new Date(),
            updateTime: new Date(),
          });
          await this.accessTokenRepository.save(newTokenData);
          data = {
            id: userEntity.id,
            username: userEntity.username,
            roleId: userEntity.roleId,
            token,
            refreshToken,
          };
        }
        // 登录成功，更新上次登录时间
        this.userRepository.update(userEntity.id, {
          lastLoginDate: new Date(),
        });
      } else {
        throw new HttpException(`密码错误`, HttpStatus.BAD_REQUEST);
      }
    } else {
      throw new HttpException(`用户不存在`, HttpStatus.BAD_REQUEST);
    }
    return data;
  }
}
