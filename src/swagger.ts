import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import * as packageConfig from '../package.json';
import { INestApplication } from '@nestjs/common';

export const generateDocument = (app: INestApplication) => {
  // 创建swagger接口文档
  const options = new DocumentBuilder()
    .setTitle(packageConfig.name) // 标题
    .setDescription(packageConfig.description) // 描述
    .setVersion(packageConfig.version) // 版本
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('/api/swagger', app, document); // 第一个参数是接口文档地址
};
