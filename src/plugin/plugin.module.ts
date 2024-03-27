import { Global, Module } from '@nestjs/common';
import { LoggerService } from './logger/logger.service';
import { ToolsService } from './tools/tools.service';
// import { RedisService } from './redis/redis.service';

@Global()
@Module({
  providers: [LoggerService, ToolsService],
  exports: [LoggerService, ToolsService],
  imports: [],
})
export class PluginModule {}
