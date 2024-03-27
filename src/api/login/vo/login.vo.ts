import { AccessTokenEntity } from '@src/api/user/entities/accessToken.entity';

export class LoginVo {
  readonly id!: number; // 账号id
  readonly username?: string; // 用户名
  readonly roleId?: number; // 账号类型:0普通账号,1是主账号,2是超管
  readonly token?: string; // 登录的token
  readonly refreshToken?: string; // 刷新token
}

export class LoginUserVo {
  readonly id!: number; // 账号id
  readonly username!: string; // 用户名
  readonly roleId!: number; // 角色类型: 0普通账号, 1是主账号, 2是超管
  readonly status!: number; // 状态：1是正常, 0是禁用
  readonly password!: string; // 密码
  readonly salt!: string; // 密码盐
}

export class LoginTokenDataVo {
  readonly userInfo!: LoginUserVo; // 用户基本信息
  readonly token!: string; // 登录的token
  readonly authApi!: Pick<AccessTokenEntity, 'token' | 'refreshToken' | 'expirationTime'>[];
}
