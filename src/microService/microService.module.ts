import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'DIMENSION_SERVICE',
        transport: Transport.TCP,
        options: {
          port: 8888,
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'LOG_SERVICE',
        transport: Transport.TCP,
        options: {
          port: 9999,
        },
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class MicroServiceModule {}
