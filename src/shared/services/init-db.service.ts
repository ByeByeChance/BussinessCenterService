import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@src/api/user/entities/user.entity';
import { ToolsService } from '@src/plugin/tools/tools.service';
import { Repository } from 'typeorm';
@Injectable()
export class InitDbService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
    private readonly toolsService: ToolsService
  ) {}

  onModuleInit() {
    console.log('初始化数据库');
    this.initData();
  }

  /**
   * @Description: 初始化账号
   * @return {*}
   */
  private async initData(): Promise<void> {
    // 初始化账号
    const total = await this.userRepository.count();
    if (total === 0) {
      const username: string = this.configService.get('defaultAccount') ?? 'admin';
      const defaultPassword: string = this.configService.get('defaultPassword') ?? '123456';
      const salt = this.toolsService.getRandomSalt;
      const password = this.toolsService.makePassword(defaultPassword, salt);
      const userData = this.userRepository.create({
        username,
        password,
        salt,
        status: 1,
        roleId: 1,
        email: '17621431@qq.com',
      });
      await this.userRepository.save(userData);
    }
  }
}
