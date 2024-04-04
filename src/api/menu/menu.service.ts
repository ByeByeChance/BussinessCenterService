import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindOperator, ILike, Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PageEnum } from '@src/enums/page.enum';
import { mapToObj } from '@src/utils';
import { MenuListVo, MenuItemVo } from './vo/menu.vo';
import { QueryMenuDto } from './dto/menu.query';
import { MenuEntity } from './entities/menu.entity';
import { MenuDto } from './dto/menu.dto';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuEntity)
    private readonly MenuRepository: Repository<MenuEntity>
  ) {}

  /**
   * @Description: 获取菜单列表
   * @param {MenuDto} queryOption
   * @return {*}
   */
  async getMenuList(queryOption: QueryMenuDto): Promise<MenuListVo> {
    const { title, path, pageNumber, pageSize } = queryOption;
    const query = new Map<string, FindOperator<string>>();
    if (title) {
      query.set('title', ILike(`%${title}%`));
    }
    if (path) {
      query.set('path', ILike(`%${path}%`));
    }

    const total = await this.MenuRepository.createQueryBuilder('Menu')
      .where([mapToObj(query)])
      .getCount();
    const queryBuilder = this.queryMenuBuilder();
    const data = await queryBuilder
      .where([mapToObj(query)])
      .offset(0)
      .limit(1000)
      .getRawMany();
    return {
      list: this.createMenuMethod(data),
      total,
      pageNumber: pageNumber ? Number(pageNumber) : PageEnum.PAGE_NUMBER,
      pageSize: pageSize ? Number(pageSize) : PageEnum.PAGE_SIZE,
    };
  }

  /**
   * @Description: 新增菜单
   * @param {MenuDto} req
   * @return {*}
   */
  async addMenu(req: MenuDto): Promise<string> {
    // 创建数据
    const data = this.MenuRepository.create({
      parentId: req.parentId || undefined,
      name: req.name,
      path: req.path || '',
      component: req.component || '',
      redirect: req.redirect || '',
      icon: req.icon || '',
      title: req.title || '',
      isLink: req.isLink || '',
      isHide: req.isHide ? 1 : 0,
      isFull: req.isFull ? 1 : 0,
      isAffix: req.isAffix ? 1 : 0,
      isKeepAlive: req.isKeepAlive ? 1 : 0,
      sort: req.sort || 0,
      createTime: new Date(),
    });
    await this.MenuRepository.save(data);
    return '创建成功';
  }

  /**
   * @Description: 更新菜单
   * @param {MenuDto} req
   * @return {*}
   */
  async updateMenu(req: MenuDto): Promise<string> {
    const MenuEntity: MenuEntity | null = await this.MenuRepository.findOne({
      where: { id: req.id },
    });
    if (!MenuEntity?.id) {
      throw new HttpException(`菜单不存在`, HttpStatus.BAD_REQUEST);
    }
    await this.MenuRepository.update(
      { id: req.id },
      {
        parentId: req.parentId || undefined,
        name: req.name,
        path: req.path || '',
        component: req.component || '',
        redirect: req.redirect || '',
        icon: req.icon || '',
        title: req.title || '',
        isLink: req.isLink || '',
        isHide: req.isHide ? 1 : 0,
        isFull: req.isFull ? 1 : 0,
        isAffix: req.isAffix ? 1 : 0,
        isKeepAlive: req.isKeepAlive ? 1 : 0,
        sort: req.sort || 0,
        updateTime: new Date(),
      }
    );
    return '更新成功';
  }

  /**
   * @Description: 删除菜单
   * @param {id} id
   * @return {*}
   */
  async deleteMenuById(id: number): Promise<string> {
    const MenuEntity: MenuEntity | null = await this.MenuRepository.findOne({
      where: { id },
    });
    if (!MenuEntity?.id) {
      throw new HttpException(`菜单不存在`, HttpStatus.BAD_REQUEST);
    }
    const { affected } = await this.MenuRepository.softDelete(id);
    if (affected) {
      return '删除成功';
    } else {
      return '删除失败';
    }
  }

  // 内部查询方法
  private queryMenuBuilder(): SelectQueryBuilder<MenuEntity> {
    return this.MenuRepository.createQueryBuilder('menu')
      .select('Menu.id', 'id')
      .addSelect('Menu.parentId', 'parentId')
      .addSelect('Menu.name', 'name')
      .addSelect('Menu.path', 'path')
      .addSelect('Menu.component', 'component')
      .addSelect('Menu.redirect', 'redirect')
      .addSelect('Menu.icon', 'icon')
      .addSelect('Menu.title', 'title')
      .addSelect('Menu.isLink', 'isLink')
      .addSelect('Menu.isHide', 'isHide')
      .addSelect('Menu.isFull', 'isFull')
      .addSelect('Menu.isAffix', 'isAffix')
      .addSelect('Menu.isKeepAlive', 'isKeepAlive')
      .addSelect('Menu.sort', 'sort')
      .addSelect('Menu.createTime', 'createTime')
      .addSelect('Menu.updateTime', 'updateTime')
      .addSelect('Menu.deleteTime', 'deleteTime');
  }

  private handleMenuItem(menuEntity: MenuEntity): MenuItemVo {
    return {
      id: menuEntity.id,
      parentId: menuEntity.parentId,
      name: menuEntity.name,
      path: menuEntity.path,
      component: menuEntity.component,
      redirect: menuEntity.redirect,
      meta: {
        icon: menuEntity.icon,
        title: menuEntity.title,
        isLink: menuEntity.isLink,
        isHide: menuEntity.isHide === 1,
        isFull: menuEntity.isFull === 1,
        isAffix: menuEntity.isAffix === 1,
        isKeepAlive: menuEntity.isKeepAlive === 1,
        sort: menuEntity.sort,
      },
    };
  }
  // 递归生成菜单
  private createMenuMethod(menuList: MenuEntity[], parentId?: number): MenuItemVo[] {
    const newMenuList: MenuItemVo[] = [];

    for (const item of menuList) {
      if (item.parentId == parentId) {
        const menuOptions = this.handleMenuItem(item);
        menuOptions.children = this.createMenuMethod(menuList, item.id);
        newMenuList.push(menuOptions);
      }
    }

    return newMenuList.sort((a, b) => a.meta.sort - b.meta.sort);
  }
}
